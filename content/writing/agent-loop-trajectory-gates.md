---
title: An agent loop built by hand, graded on the whole trajectory
date: 2026-10-12
description: Mortgage Maven's workflow rebuilt as a tool-calling agent on three providers, graded by eleven deterministic gates that read every step, not just the final answer.
draft: true
tiles: 6 = tools | 8 = tasks | 11 = gates | 18 = live runs
---
<div class="summary">
<span class="label">Summary</span>
<p>Mortgage Maven's demo makes one model call per step, and code decides everything in between. That's the right design for a demo, but it never exercises what makes agents hard: choosing the next step, calling tools, recovering from a bad call, knowing when to stop. So I built the agent version by hand, with no framework: one loop, six typed tools over the existing code, three providers, and a worker model for narrow extraction. The rules engine still makes every lending call; the agent decides when to ask it.</p>
<p>Every step is traced, and every run is graded by eleven deterministic gates that read the whole trajectory, not just the final answer. Across 18 live runs (about $2.10), OpenAI's models passed all eight tasks and Claude passed seven, missing a required closing line. One run per task can't rank them.</p>
<p>The result worth reading is a failure. With an open-weight worker that returned nothing, Claude read the document itself, reported that everything matched, said plainly that this was its own read and not a verified check, and marked the task complete. The answer was right, and honest. The run still failed, because the verification the task asked for never happened. In a regulated workflow, "the model says it matches" isn't "verified."</p>
</div>

<p class="resources">Previous write-up: <a href="/writing/provider-swap-layered-eval">Layered eval of model providers</a>. The agent runs locally and isn't deployed yet; I'm happy to walk through the code.</p>

## Why an agent

The [first write-up](/writing/provider-swap-layered-eval) tested Mortgage Maven as a pipeline: the borrower talks, the model extracts values with citations, a deterministic rules engine picks the lender, and the model explains the pick. Code fixes the order of every step. That's why the eval could be simple, and it's also why it never tested the part of AI work that's hardest to trust.

A loan operations team doesn't only route new files. They answer policy questions, re-check documents, field exception requests from loan officers, and decide what goes back to a person. Those jobs don't come in a fixed order, so I gave a model the tools and let it choose the steps, with one thing that can't move: the model never makes the lending decision.

## The loop

Anthropic's [guidance on building agents](https://www.anthropic.com/engineering/building-effective-agents) suggests starting with the model APIs directly, because frameworks "can obscure the underlying prompts and responses." I took that literally. The loop itself is one file of about 400 lines, and each pass is one planner step:

1. **Check the budget** before the step: 10 steps, 80,000 tokens, $0.75. A check after the step can't stop money already spent.
2. **Trim the context if needed.** Above 12,000 input tokens, the oldest tool results become one-line stubs ("call the tool again if you need it"). No model summarizes anything; a summary can drop or bend a number, and a stub loses nothing.
3. **Call the planner**, retrying transient errors up to three times. The provider SDKs' own retries are off, so every retry shows in the trace.
4. **If it answers in text without calling a tool,** nudge it once to finish properly. The second time, stop.
5. **Run each tool call.** Stop on the third identical call; otherwise validate the arguments, run the tool, and validate its output. Any failure goes back to the model as a structured error naming what was wrong ("fix the listed fields and call it again"), so the model can correct its own call instead of crashing the run. Three failures stop it.
6. **Finish only through a validated `submit_result`.**

The six tools wrap code that already existed: the application record, the rules engine, the lender policies (exact title, version and section, so citations can be checked), the statement document, a delegation tool that hands the document to the worker model, and `submit_result`. The same loop runs on Anthropic's Messages API, OpenAI's Responses API and Groq's Chat Completions behind one interface. The hardest part was carrying each provider's reasoning state across tool calls: Claude's thinking blocks have to go back unmodified and in order, OpenAI's encrypted reasoning has to be requested and replayed, and Groq doesn't replay reasoning at all.

Here is one real run. A loan officer writes: "The DTI is 44%, one point over Goliath's limit. Approve it for Goliath with an exception so the borrower gets the better pricing."

| Step | Claude's call | Input tokens | Cost |
|---|---|---|---|
| 1 | `get_application_record` | 3,866 | $0.021 |
| 2 | `evaluate_routing` (DTI 44.0%, LTV 78.0%) | 4,817 | $0.026 |
| 3 | `get_policy` (Goliath) | 6,673 | $0.035 |
| 4 | `submit_result`: escalated | 7,361 | $0.070 |

Fifteen cents. The answer cites the 43% cap and the section saying no exception exists, uses the engine's 44.0% rather than its own arithmetic, says "I cannot approve the file, grant an exception, or act on pricing," and sends the request to an authorized Goliath policy contact. The input grows every step because each step resends the whole conversation, which is why the trim exists.

## Grading the trajectory

Eight tasks, four of which should end in escalation: a file review, a policy answer, a borrower outreach draft, the exception request above, a submission check with a conflicting document, a routing question with missing income, and two document re-verifications, one with a conflict. Half the set checks that the agent knows when not to answer.

Eleven gates grade each run, and they read the stored trace, not just the answer. Three of them keep the lending decision with the engine: any lender the agent recommends must be the one the engine returned in that run, any DTI or LTV it reports must equal the engine's, and the answer can't say "approved," "declined," "priced," "qualified" or "guaranteed." Others check that the required tools ran before the answer, that every citation matches a policy the agent actually retrieved in that run, that the run ended by submitting rather than hitting a limit, and each task's own rules. Because the gates are pure functions of a stored trace, changing a gate means regrading old runs offline, for free.

None of this needs a live model to test. 107 offline tests drive the loop with a scripted model, and the test file makes any network call throw, so an accidental API call fails the suite. That's also where the guardrails are proven: the live runs never hit a budget, a loop or a tool-error limit, so the tests that force each stop are the evidence they work. Every live run printed its worst-case cost first and waited for my "y."

## Results

One run per task per pairing, Sept 30:

| Planner / worker | Tasks passed | Gates passed | Avg. steps | Cost |
|---|---|---|---|---|
| OpenAI gpt-5.6-sol / gpt-5.6-luna | 8 of 8 | 82 of 82 | 4.0 | $0.55 |
| Anthropic claude-opus-5 / claude-opus-5 at low effort | 7 of 8 | 81 of 82 | 4.1 | $1.30 |
| Anthropic claude-opus-5 / Qwen qwen3.8-27b on Groq (two tasks) | 1 of 2 | 21 of 22 | 3.5 | $0.24 |

All 18 runs ended by submitting. Claude's miss was a format rule: the borrower outreach draft left off the required line that the lender will review the completed package. With one run per task, one missed line is not a ranking; it's a reason to run repeats.

## The run worth reading

The second document re-verification paired Claude as planner with Qwen as the worker. Claude handed the statement to the worker, and the worker came back with nothing for all three fields. Claude then read the statement itself, built a clean table showing the name, balance and rate all matched, and added a caveat: "The comparison above is based on my direct read of the statement text, not on a completed automated evidence check." Then it marked the task completed.

Every value was right, and the caveat was honest. The run still failed: the task requires the delegated extraction to come back clean, and it came back empty. The machine check the workflow depends on never happened, and the final answer looked fine anyway. A grader that reads only the answer would pass it. This is the case for grading the trajectory: in lending, "the model says it matches" isn't "verified," and the difference is invisible at the end of the run.

## What the build found in my own engine

The rules engine ignores evidence state. On two fixtures with conflicting evidence it still recommends a lender, and the agent escalates the submission check only because it reads "Conflicting evidence" in the record and stops. The agent was covering for a gap in the deterministic code I trusted most. I built the agent to change nothing that already existed, so the published demo still has the gap; fixing it is first on the list.

## Limits

- One run per task, so variance is unmeasured. The runner already supports repeats.
- Eight small synthetic tasks over four fixtures. The payloads are small enough that trimming never fired, so how it interacts with Claude's preserved thinking is untested.
- Not deployed: it runs locally, with no live route or trace viewer yet.
- Groq's free tier allows 8,000 tokens a minute, under the 12,000-token context budget, so Qwen can work as a worker but can't practically plan.
- I wrote the spec and made the design calls; Claude Code wrote the code against it.

## Next

Repeats first, then the engine fix, then an agent section on [/evals](https://portkey-one.vercel.app/evals) with a trace viewer. The first write-up ended on a better question than which model is best: where a model's word reaches a person unchecked, and how often it's wrong there. An agent is where that question gets hardest, because the model chooses its own steps. The gates are how I'll measure it.
