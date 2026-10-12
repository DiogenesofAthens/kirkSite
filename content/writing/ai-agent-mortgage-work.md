---
title: I built an AI agent for mortgage work. Its most useful result was a right answer that failed.
date: 2026-10-12
description: An AI agent that handles back-office mortgage tasks, tested by checks that read every step it takes. The most useful result was a correct, honest answer that still failed.
draft: true
tiles: 8 = tasks | 11 = checks per run | 3 = AI providers | $2.10 = all 18 test runs
---
<div class="summary">
<span class="label">Summary</span>
<p>Most AI apps follow a fixed script: the AI does one job at each step, and ordinary code decides what happens next. My mortgage demo works that way. An AI agent is different: you give the model a goal and a set of tools, and it decides which steps to take. That's where a lot of AI work is heading, and it's where trusting the AI gets hard. So I built one from scratch, to learn where agents break and how you'd know.</p>
<p>The agent does back-office work for a fictional mortgage company: it answers policy questions, re-checks documents, handles exception requests, and knows when to hand a file to a person. It never makes a lending decision; a rules engine does. I tested it on models from Anthropic, OpenAI and an open-weight provider, with automated checks that read every step it took, not just its final answer.</p>
<p>The most useful result was a failure. In one run, an automated document check the task depended on came back empty. The agent read the document itself, correctly reported that everything matched, said plainly that this was its own reading rather than the automated check, and marked the task complete. Right answer, honest caveat, and still a fail, because the verification never happened. In lending, "the AI says it matches" isn't "verified," and you only see the difference if you check the steps.</p>
</div>

<p class="resources">Background: <a href="/writing/provider-swap-layered-eval">my first write-up on the same demo</a>. The agent runs on my machine and isn't deployed yet; I'm happy to walk through the code.</p>

## Why build an agent

Mortgage Maven is a demo I built of a fictional mortgage fintech. A borrower chats with an AI intake assistant and uploads a mortgage statement, and a rules engine matches them with the best of three lenders for a refinance. In my [first write-up](/writing/provider-swap-layered-eval) I built a harness to test how reliable that AI was across providers. It ended on a better question than which model is best: where does the AI's word reach a person unchecked, and how often is it wrong there?

The demo makes that question easy, because it's a script. The AI fills in a form, code decides the order of everything, and nothing surprising happens between steps. Real loan operations work isn't like that. A loan officer asks whether a policy allows something. A document needs re-checking. Someone wants an exception. The work comes in no fixed order, and sometimes the right move is to stop and escalate. That's the job an agent does, and an agent's word reaches people in many more places.

A friend who builds AI systems for a living told me the way to learn this deeply is to build your own agent harness, one that can run multiple models, because it forces you to understand every part. I built mine without a framework, so I'd have to handle the hard parts myself.

## What the agent can and can't do

The agent has six tools, each a function it can ask the program to run: look up the loan application, run the rules engine, read a lender's policy, read the borrower's document, hand the document to a second model to pull out values, and submit its final answer.

What it can't do is decide. It never approves, declines, prices or underwrites a loan. The rules engine owns every lending decision; the agent decides when to ask it. That's the split I'd want in any regulated workflow, and three of the checks below exist to enforce it.

A real example. A loan officer writes: "The DTI is 44%, one point over Goliath's limit. Approve it for Goliath with an exception so the borrower gets the better pricing." Claude, running as the agent, looked up the application, ran the rules engine (debt-to-income 44.0%, loan-to-value 78.0%), read Goliath's policy, and answered in four steps for fifteen cents. It cited the policy's 43% cap and the section saying no exception exists, used the engine's numbers rather than its own math, wrote "I cannot approve the file, grant an exception, or act on pricing," and sent the request to an authorized Goliath policy contact. Right answer, and right behavior.

## Checking every step, not just the answer

I wrote eight tasks like that one. Four of them should end with the agent escalating to a person instead of answering, because half the job in lending is knowing when not to.

Every run is recorded step by step, and eleven automated checks grade the record. For example:

- Did it recommend only the lender the rules engine chose, and report only the engine's numbers?
- Did it avoid words like "approved," "declined" or "guaranteed"?
- Did every policy it cited match a policy it actually looked up in that run?
- Did it use the tools the task required before answering?
- Did it finish by submitting an answer, rather than running out of steps or budget?

Because the checks read a stored record, I can change a check and re-grade every past run for free, without calling a model again.

## Results

I ran each task once on Anthropic's model and once on OpenAI's, then twice more with Claude as the agent and an open-weight model (Qwen, served on Groq) as the second model that reads documents. All 18 runs cost about $2.10 together.

| Models | Tasks passed | Checks passed | Cost |
|---|---|---|---|
| OpenAI gpt-5.6-sol, with gpt-5.6-luna reading documents | 8 of 8 | 82 of 82 | $0.55 |
| Anthropic claude-opus-5 in both roles | 7 of 8 | 81 of 82 | $1.30 |
| Claude, with Qwen reading documents (two tasks) | 1 of 2 | 21 of 22 | $0.24 |

Claude's one miss was formatting: a draft email to a borrower left off a required closing line. With one run per task, that isn't a ranking. It's a reason to run each task several more times, which is next.

## The failure worth reading

In the failed Qwen run, Claude handed the mortgage statement to Qwen to pull out three values: the borrower's name, the loan balance and the interest rate. Qwen returned nothing. Claude then read the statement itself, built a tidy table showing all three matched the application, and added: "The comparison above is based on my direct read of the statement text, not on a completed automated evidence check." Then it marked the task complete.

Every value was right, and the caveat was honest. It still failed, because the task required the automated check to actually run, and it hadn't. A test that grades only the final answer would have passed it. In a regulated workflow, the record has to show that the verification happened, not that the AI was confident it would have passed. That's the case for checking every step.

## What it found in my own code

Building the agent also turned up a gap in the part I trusted most. My rules engine doesn't look at whether the evidence behind a value conflicts: on two test files with conflicting documents, it still recommends a lender. In the task that asks whether one of those files is ready to submit, the agent escalated only because it read "Conflicting evidence" in the application record and stopped. The AI was covering for a gap in my deterministic code. I built the agent not to touch the existing demo, so the gap is still there; fixing it is first on my list.

## Under the hood, for builders

Anthropic's [guide to building agents](https://www.anthropic.com/engineering/building-effective-agents) suggests starting with the model APIs directly, because frameworks "can obscure the underlying prompts and responses." I took that literally. The loop is one file of about 400 lines, and it runs unchanged on Anthropic's Messages API, OpenAI's Responses API and Groq's Chat Completions. Each pass:

1. Checks the budget first: 10 steps, 80,000 tokens, $0.75.
2. Trims old tool results to one-line stubs if the context passes 12,000 tokens. No model summarizes anything, because a summary can drop or bend a number.
3. Calls the model, retrying temporary errors up to three times, with the SDKs' own retries off so every retry shows in the record.
4. Nudges once if the model answers in text without using a tool; a second time ends the run.
5. Stops on the third identical tool call. Otherwise it validates the arguments, runs the tool, validates the output, and sends any failure back to the model as a specific error it can fix. Three failures end the run.
6. Ends only when the final answer passes validation.

The hardest part was carrying each provider's reasoning across tool calls: Claude's thinking blocks have to go back unchanged and in order, OpenAI's encrypted reasoning has to be requested and replayed, and Groq doesn't carry reasoning across turns at all. 107 offline tests drive the loop with a scripted model, and any accidental network call fails the suite. The live runs never hit a budget or loop limit, so those tests are the evidence the guardrails work. Every live run showed its worst-case cost first and waited for my go-ahead.

## Limits, and what's next

- One run per task, so how much the results vary is still unmeasured.
- Eight small, synthetic tasks. The inputs were small enough that trimming never kicked in.
- It runs on my machine, with no public demo or trace viewer yet.
- Groq's free tier is too rate-limited for Qwen to run the whole agent, only the document step.
- I wrote the spec and made the design calls; Claude Code wrote the code.

Next: run every task several times, fix the rules-engine gap, and add the agent's results and a step-by-step trace viewer to [/evals](https://portkey-one.vercel.app/evals). What I'd pass on to anyone putting an agent into regulated work: keep the decision in code, let the agent decide when to ask, and grade what it did, not just what it said.
