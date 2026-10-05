---
title: Layered eval of model providers against a mortgage lending use case
date: 2026-10-05
description: A mortgage intake demo; 3 providers and layers of evaluation, with the attendant strengths and blind spots.
draft: true
---
The "Mortgage Maven" demo is a quick prototype mimicking the operations of the eponymous fictional mortgage fintech.

The basic idea - Mortgage Maven's raison d'etre - is to address the endemic "mortgage lock-in" facing the country at the moment: a housing market somewhat frozen on both ends by buyers and sellers unable to port their existing low-interest notes onto a different, more suitable property. Mortgage Maven solves the collective action problem technologically - creating a network of lenders, patching together municipal, state and federal statutes, and the like.

The demo is focused on a simple workflow - an LLM-powered borrower intake conversation paired with a submitted monthly mortgage statement (synthetic data only). The model reads both, fills in the application with a source for every value, and explains which of three lenders the file goes to. It doesn't choose the lender; a rules engine does. Its job is to get the facts right and explain the decision.

I ran the same eight conversations through OpenAI, Anthropic, and Qwen, an open-weight model served on Groq. Three things came out of it. The biggest "provider difference" in the first run was two bugs in my own setup, which the harness found. The model judges mostly disagreed with my grades, and one disagreed with itself. And once both frontier models passed everything, the better question was what the harness wasn't seeing. Full tables are on [/evals](https://portkey-one.vercel.app/evals).

## How I evaluated it

Three layers. Each catches what the one before it can't, and each costs more.

**Code.** Ten checks on every output: schema, every expected value present and correct, a source for each value, no number that wasn't in the input, the rules engine landing on the expected lender, and five more on /evals. A case passes only when every check that applies to it passes. Code is free and gives the same answer every time.

**A model judge.** Code can't tell whether a reply reads well to a homeowner or whether a loan officer could follow the explanation. A judge model scores four dimensions (faithfulness, clarity, tone, recommendation quality) on a locked 1–5 rubric, one dimension per call, always from a different company than the model it grades. Side-by-side comparisons run in both orders, because judges favor whichever answer they read first.

**Me.** I scored every judged output on the same rubric, 74 grades, shuffled, names hidden, then measured each judge's agreement with me using weighted Cohen's kappa (1 is perfect agreement, 0 is chance). One grader, so kappa measures agreement with me, not a panel. I didn't trust a judge until I had the number.

The eight cases share one synthetic statement (Jordan Ellis, $520,000.00 at 6.875%) and each targets one failure, such as debt-to-income exactly at a lender's 43% limit. One wrong digit that flips the recommendation is the mistake that costs a lender money.

## The first run found two bugs in my setup

**OpenAI wasn't getting the same instructions.** OpenAI came out clean on 3 of 8 cases. The five failures were the five cases where its intake model returned `"30 days"` instead of `30` for the closing timeline; the app couldn't parse it, so the application never became ready for review and routing never ran. It looked like a model difference. It wasn't. The instruction to return plain numbers sat in a prompt section only the Anthropic and Groq versions sent; the OpenAI module was carried over from an earlier build. With identical instructions and no wording changed, OpenAI reran at 8 of 8. The fix came after seeing failures on these same cases, so nothing held out confirms it. A judge reading "30 days" sees a sensible answer. Only the code check saw a string where a number belonged.

**The judge couldn't see what the model saw.** The OpenAI judge scored Anthropic's intake replies 1.6 out of 5 on faithfulness, convinced Anthropic had invented the missing pay stub. It hadn't. The application record and system prompt both say the pay stub is missing; I had shown the judge only the conversation and the statement. Given the model's full context and nothing else, the OpenAI judge moved to 3.8 and the Qwen judge from 3.4 to 5.0. I had scored those replies 5.0. A judge missing context doesn't say so. It marks the answer down.

## Where the providers actually differ

| Provider | Models | Statement | Cases passed | Checks passed |
|---|---|---|---|---|
| Anthropic | `claude-opus-5` | PDF | 8 of 8 | 78 of 78 |
| OpenAI | `gpt-5.6-luna` (intake), `gpt-5.6-sol` (routing, judging) | PDF | 8 of 8 | 78 of 78 |
| Qwen on Groq | `qwen/qwen3.8-27b`, reasoning off | Text | 0 of 8 | 38 of 68 |

The routing decision never changed: whenever a provider extracted the facts correctly, the rules engine picked the same lender, and no explanation could move it. That is the point of keeping the decision out of the model's hands.

Anthropic and OpenAI both pass every code check, so code can't separate them here. The difference is in the writing: Anthropic's intake replies average about 62 words to OpenAI's 35, mostly because Anthropic reads the values back to the borrower, while OpenAI's read like a status line ("the record is ready for review; no lender decision has been made"). My grades lean Anthropic, but they aren't a ranking: the grading hid provider names, not style, and I could often tell which was which.

The one fair head-to-head is the side-by-side judged by Qwen, the only judge that saw both frontier models, and it came out close to even. Qwen preferred Anthropic 72% of the time on faithfulness and 53–62% on the rest, but on three of four dimensions the winner flipped in half the cases once the answers swapped places. Qwen was also the least consistent judge. Anthropic versus OpenAI is no result.

Qwen returned valid JSON every time, filled with placeholders like `#NUM#` and `${520000}`; one case in eight was complete enough to route. Structured output guaranteed the shape and nothing about the content. Both frontier models beat it on faithfulness in all eight cases, in both orders, though reasoning off and a text statement, both forced by my Groq tier, make this an unfair test of the model.

## The judges mostly disagree with me

| Judge | Faithfulness | Tone | Clarity | Recommendation |
|---|---|---|---|---|
| Qwen (Groq) | 0.79 | 0.38 | 0.00 | 0.00 |
| OpenAI | 0.29 | 0.16 | 0.00 | −0.45 |
| Anthropic | 0.18 | 0.03 | −0.02 | 0.00 |

*Weighted kappa against my grades. 16 outputs per cell for faithfulness and tone, 7–12 for clarity and recommendation.*

One of twelve cells reaches 0.4: Qwen on faithfulness, mostly outputs we both scored 5. Two of the zeros are the statistic (a judge that gives one score to everything can't show agreement on kappa). The rest is a real gap with a direction: every judge scored the routing explanations above me, by a third of a point to 1.3 points, and the intake replies below me, by up to a point.

Noisy, or different? I had each judge re-grade every output it had scored: 148 repeats. The Anthropic judge repeated its score 85% of the time and was never more than a point off; the OpenAI judge, 76%. Their agreement with their own first pass ran 0.63 to 0.90 on every computable dimension but one (Anthropic on clarity, 0.30), against −0.45 to 0.29 with me. They aren't guessing; they grade differently than I do. The Qwen judge repeated only 64% of the time, six scores moved two points or more, and two faithfulness 5s we had agreed on became 2s. The one cell that cleared 0.4 doesn't hold either.

Part of the gap is the rubric, and where I draw the line between a 3 and a 4. The routing explanations quite often failed to succinctly yet comprehensively explain how all 3 lenders varied on performance against the gates; details would've been helpful to the loan operations officers, and instead they typically only received summaries. The re-run caught the rubric in the act: scoring the same Qwen output twice, the OpenAI judge flagged the same two issues both times ("Verified from borrower" on document values, a rate written "$6.875%"), called them minor and gave a 4, then called them unsupported and gave a 2.

Judge averages carry a caveat: no judge scores its own company's outputs, so each provider is graded by a different pair of judges with different habits. Still, they put Qwen far below the other two on faithfulness, as I do, and the 0.1-point gap they show between Anthropic and OpenAI is inside their re-run noise, which moved a per-provider average by up to 0.75 points (Qwen, on tone) and about 0.4 for the frontier judges. A judge like this is a rough faithfulness check, not an unsupervised grader of tone or clarity.

## Stepping back: what the harness couldn't see

With both frontier models passing everything, I turned the checks on the harness itself, using Anthropic's [eval audit checklist](https://github.com/anthropics/skills/blob/main/skills/claude-api/shared/evals/eval-audit.md). What I had worked hardest on held: cross-company judges, both orders, re-run and read; a parity fix that held everything but the model constant. I found four problems.

**An empty answer scored well.** Under v1's counting, an answer that said nothing passed 43 of 64 checks, more than Qwen's 38 of 65, because a check with nothing to inspect passed: no numbers, so no invented numbers. Qwen's all-placeholder outputs had been passing that check the same way in two cases. Now I count cases, not checks, and a check with nothing to inspect is n/a. An empty answer scores 0 of 8 cases; a perfect one, 8 of 8.

**A wrong number with a real quote passed.** I recorded the $520,000 balance as the property value, citing the borrower's "I estimate the home is worth $666,667". The app marked it verified; the rules engine saw a 100% loan-to-value and found no lender; only the two checks that compare against expected answers caught it. In production there are no expected answers, so a swap like this reaches the reviewer looking verified. The app now refuses to verify a number that isn't in its own quote, and the harness checks for it. Neither frontier model made this error in v1, 0 of 106 cited numbers; my cases were too easy to trigger it.

**Eight clean cases prove less than they look.** 8 of 8 is consistent with a true pass rate as low as 68%, and with eight cases run once, gaps under about 35 points are noise. Each case was also generated once, so the models' own variance is unmeasured.

**The cases don't look like real intake.** The conversations are scripted, the model writes only the last turn, my borrowers talk like underwriters ("total qualifying monthly obligations"), and there is one statement. The boundary cases test the rules engine well; for the model, they mostly test copying a number out of a sentence.

The checklist fixed how v1 measures. It can't say what to measure. That takes knowing what goes wrong in a mortgage file.

## What v2 tests instead

Which provider is better was the wrong question for this app. The design already takes the decision away from the model, so the model matters only where its output reaches a person unchecked. v2 tests those places.

1. **Silent errors.** A wrong value that reaches the reviewer looking verified, counted per 1,000 applications. Cases: self-corrections ("150, sorry, 165"), "about 150k", debts listed in parts, monthly income without the word "month".
2. **What the assistant says.** Yes/no checks: does it imply approval, a rate, or eligibility? Does it discourage someone from applying? One failure fails the case.
3. **Same facts, same treatment.** Matched pairs that change only the borrower's name, dialect, or language; the record should come out identical, which code can check. A planted bias is the control: the test has to catch one before I trust it to catch any.
4. **The explanation matches the engine.** Every number and pass/fail claim in the routing narrative, checked by code against the engine.

The set: 50–100 fixed cases from v1's failures, hand-written hard ones, and generated variants I approve; every should-pass case gets a should-fail twin; each runs three to five times, and compliance checks must pass every run. Judges get yes/no questions only, scored against my labels on catch rate and false-alarm rate, as [Husain and Shankar](https://hamel.dev/blog/posts/evals-faq/) recommend. The "$6.875%" re-grade is why I'm done with 1–5 scales.

Model choice becomes an optimization, not a contest: the cheapest setup that holds zero silent errors on cases it was never tuned on, with a second provider as a pass/fail check. The catch is scale: claiming silent errors under 1% takes about 300 clean, independent trials, roughly $25 on the Anthropic model at v1's usage before judging. That is why v2 needs both more cases and repeats.

Every live call in v1 was approved against a printed cost estimate; the whole exercise cost about $10.50. v1 stays on [/evals](https://portkey-one.vercel.app/evals) as v1. v2 results next.
