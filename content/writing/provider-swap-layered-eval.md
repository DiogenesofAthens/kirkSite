---
title: Layered eval of model providers against a mortgage lending use case
date: 2026-10-05
description: A mortgage intake demo; 3 providers and layers of evaluation, with the attendant strengths and blind spots.
draft: true
---
The "Mortgage Maven" demo is a quick prototype mimicking the operations of the eponymous fictional mortgage fintech.

The basic idea - Mortgage Maven's raison d'etre - is to address the endemic "mortgage lock-in" facing the country at the moment: a housing market somewhat frozen on both ends by buyers and sellers unable to port their existing low-interest notes onto a different, more suitable property. Mortgage Maven solves the collective action problem technologically - creating a network of lenders, patching together municipal, state and federal statutes, and the like.

The demo is focused on a simple workflow - an LLM-powered borrower intake conversation paired with a submitted monthly mortgage statement (synthetic data only). The model reads both, fills in the application with a source for every value, and explains which of three lenders the application goes to. The model doesn't pick the lender; a rules engine does. The model's job is to get the facts right and explain the decision.

I ran the same eight conversations through three providers: OpenAI, Anthropic, and Qwen, an open-weight model served on Groq. Two results surprised me. The biggest "provider difference" in the first run was two bugs in my own setup, and the harness is what found them. And the model judges mostly disagreed with my grades. Then both frontier models started passing everything, which forced a better question: what was the harness not seeing? Full tables are at [portkey-one.vercel.app/evals](https://portkey-one.vercel.app/evals).

## How I evaluated it

Three layers. Each catches what the one before it can't, and each costs more.

**Code.** Ten checks run on every output: the JSON matches the schema, every expected value is present and correct, each value cites its source, no number appears that wasn't in the input, the rules engine lands on the expected lender, and so on. A case passes only when every check that applies to it passes. Code is free and gives the same answer every time.

**A model judge.** Code can't tell you whether a reply reads well to a homeowner or whether a loan officer could follow the explanation. A judge model grades four dimensions (faithfulness, clarity, tone, and recommendation quality) on a locked 1–5 rubric, one dimension per call. The judge always comes from a different company than the model it grades, and side-by-side comparisons run in both orders, because judges favor whichever answer they read first.

**Me.** I graded every judged output on the same rubric: 74 grades, shuffled, provider names hidden. Then I measured each judge's agreement with me using weighted Cohen's kappa, where 1 is perfect agreement and 0 is chance. I didn't trust a judge until I had that number.

The eight cases share one synthetic statement (Jordan Ellis, a $520,000.00 balance at 6.875%), and each targets one failure. One puts debt-to-income exactly at a lender's 43% limit, so a single wrong digit flips the lender. In another, the borrower says $525,000 and the statement says $520,000.00. A third gives income monthly, so the model has to convert it and say so. A one-digit extraction error that changes the recommendation is the mistake that costs a lender money.

## The first run found two bugs in my setup

**OpenAI wasn't getting the same instructions.** In the first run, OpenAI came out clean on 3 of 8 cases. The five failures were exactly the five cases where its intake model returned `"30 days"` instead of `30` for the closing timeline. The app couldn't parse that, so the application never became ready for review and routing never ran. It looked like a model difference. It wasn't: the instruction to return plain numbers lived in a prompt section only the Anthropic and Groq versions sent, because the OpenAI module had been carried over from an earlier build. I gave all three identical instructions, changed no wording, and reran OpenAI: 8 of 8. A judge reading "30 days" sees a sensible answer. Only the code check saw a string where a number belonged.

**The judge couldn't see what the model saw.** The OpenAI judge gave Anthropic's intake replies 1.6 out of 5 on faithfulness, convinced Anthropic had invented the missing pay stub. It hadn't. The application record and the system prompt both say the pay stub is missing, but I'd shown the judge only the conversation and the statement. With the same context the model had, and nothing else changed, the same judge scored the same outputs 3.8, and the Qwen judge went from 3.4 to 5.0. I'd given them 5.0. A judge missing context doesn't say so. It just marks the answer down.

## Where the providers actually differ

| Provider | Models | Statement | Cases passed | Checks passed |
|---|---|---|---|---|
| Anthropic | `claude-opus-5` | PDF | 8 of 8 | 78 of 78 |
| OpenAI | `gpt-5.6-luna` (intake), `gpt-5.6-sol` (routing, judging) | PDF | 8 of 8 | 78 of 78 |
| Qwen on Groq | `qwen/qwen3.8-27b`, reasoning off | Text | 0 of 8 | 38 of 68 |

The routing decision never changed. Whenever a provider extracted the facts correctly, the rules engine picked the same lender, and no explanation could move it. That's the point of keeping the decision out of the model's hands.

Anthropic and OpenAI both pass every code check, so on this test set code can't separate them. The difference is in the writing. Anthropic's intake replies average about 62 words to OpenAI's 35, mostly because Anthropic reads the values back to the borrower. OpenAI's read like a status line: "the record is ready for review; no lender decision has been made." My own grades lean Anthropic, but don't read them as a ranking: the grading hid provider names, not style, and I could often tell which was which.

The one fair head-to-head is the side-by-side judged by Qwen, the only judge that saw both frontier models. It came out close to even. Qwen preferred Anthropic 72% of the time on faithfulness and 53–62% on the rest, but on three of four dimensions it picked a different winner in half the cases once the answers swapped places. It was also the least consistent judge, as the next section shows. I'd call Anthropic versus OpenAI no result.

Qwen returned valid JSON every time and filled it with placeholders like `#NUM#` and `${520000}`, repeated updates, and a misspelled loan purpose. One of eight cases was complete enough to route. Structured output guaranteed the shape and nothing about the content. Both frontier models beat it on faithfulness in all eight cases, in both orders.

## The judges mostly disagree with me

| Judge | Faithfulness | Tone | Clarity | Recommendation |
|---|---|---|---|---|
| Qwen (Groq) | 0.79 | 0.38 | 0.00 | 0.00 |
| OpenAI | 0.29 | 0.16 | 0.00 | −0.45 |
| Anthropic | 0.18 | 0.03 | −0.02 | 0.00 |

*Weighted kappa against my grades; 16 outputs per cell for faithfulness and tone, 7–12 for clarity and recommendation.*

Only one of twelve cells reaches 0.4: Qwen on faithfulness, mostly outputs we both gave a 5. Some of the zeros are a quirk of the statistic (one judge gave every routing explanation a 4 on recommendation, another gave every one a 5 on clarity, and a grader who never varies can't show agreement on kappa). Most of the gap is real, and it has a direction: every judge scored the routing explanations above me, by a third of a point to 1.3 points, and the intake replies below me, by up to a point.

Were they just noisy? I had each judge re-grade every output it had scored, with identical materials: 148 repeats. The Anthropic judge repeated its score 85% of the time and was never more than a point off; the OpenAI judge repeated 76% of the time. Their agreement with their own first pass ran 0.63 to 0.90 on every dimension but one (Anthropic on clarity, 0.30, over seven outputs), against −0.45 to 0.29 with me. Those two aren't guessing; they grade differently than I do. The Qwen judge repeated only 64% of the time, and six scores moved two points or more, including two faithfulness 5s we'd agreed on that it dropped to 2. Even the one cell that cleared 0.4 doesn't hold up.

The rubric is part of it. The line between a 3 ("the reader has to infer the driving fact") and a 4 ("every lender's outcome is tied to a specific fact") is a judgment call, and I drew it somewhere else. The routing explanations quite often failed to succinctly yet comprehensively explain how all 3 lenders varied on performance against the gates; details would've been helpful to the loan operations officers, and instead they typically only received summaries. The re-run caught the rubric problem in the act: grading the same Qwen output twice, the OpenAI judge flagged the same two issues (document values labeled "Verified from borrower", a rate written "$6.875%"), called them minor and gave a 4, then called them unsupported and gave a 2.

One caution on judge averages: because no judge grades its own company's outputs, each provider is graded by a different pair of judges with different habits. With that caveat, the judges put Qwen far below the other two on faithfulness, as I do, and the 0.1-point gap they show between Anthropic and OpenAI is inside their own re-run noise. A judge like this works as a rough faithfulness check. I wouldn't let it grade tone or clarity unsupervised.

## What else this can't tell you

- **How noisy the scores are.** Re-grading moved a judge's per-provider average by as much as 0.75 points (Qwen, on tone; about 0.4 for the frontier judges), so smaller gaps mean nothing. Each case was also generated only once, so the models' own run-to-run variance is unmeasured.
- **Whether the prompt fix generalizes.** I fixed it after seeing failures on these same eight cases. It was a fairness fix, not tuning, but nothing held out confirms it.
- **Whether my grades are typical.** Kappa compares the judges to me, not to a panel.
- **What Qwen can really do.** Reasoning off and a text statement, both forced by my Groq account tier.

## Stepping back: what the harness couldn't see

With both frontier models passing everything, I turned the checks on the harness itself, using Anthropic's [eval audit checklist](https://github.com/anthropics/skills/blob/main/skills/claude-api/shared/evals/eval-audit.md). The parts I'd worked hardest on held up: judges from a different company, run in both orders, re-run and read, and a parity fix that held everything but the model constant. Working through it, I found four problems.

**An empty answer scored well.** Under v1's counting, an answer that said nothing passed 43 of 64 checks, more than Qwen's 38 of 65. A check with nothing to inspect passed: no numbers, so no invented numbers. The same artifact showed up in real data, where Qwen's all-placeholder outputs had been passing the invented-numbers check in two cases. Now I count cases, not checks, and a check with nothing to inspect is marked n/a. An empty answer scores 0 of 8 cases; a perfect one, 8 of 8.

**A wrong number with a real quote passed.** I recorded the $520,000 balance as the property value, citing the borrower's "I estimate the home is worth $666,667". The app marked it verified. The rules engine saw a 100% loan-to-value and found no lender, and only the two checks that compare against expected answers caught it. In production there are no expected answers, so a swap like this reaches the reviewer looking verified. The app now refuses to verify a number that isn't in its own quote, and the harness checks for it. In fairness to v1, neither frontier model made this error (0 of 106 cited numbers). The gap was real; my cases were too easy to trigger it.

**Eight clean cases prove less than they look.** 8 of 8 is consistent with a true pass rate as low as 68%. With eight cases run once, gaps under about 35 points are noise.

**The cases don't look like real intake.** The conversations are scripted, and the model writes only the last turn. My borrowers talk like underwriters ("total qualifying monthly obligations"). There's one statement. The boundary cases test the rules engine well; for the model, they mostly test copying a number out of a sentence.

The checklist fixed how v1 measures. It can't tell you what to measure. That takes knowing what goes wrong in a mortgage file.

## What v2 tests instead

Which provider is better was the wrong question for this app. The design already takes the decision away from the model, so the model matters only where its output reaches a person unchecked. v2 tests those places:

1. **Silent errors.** A wrong value that reaches the reviewer looking verified, counted per 1,000 applications. Cases: self-corrections ("150, sorry, 165"), "about 150k", several numbers in one turn, debts listed in parts, monthly income without the word "month".
2. **What the assistant says.** Yes/no checks: does it imply approval, a rate, or eligibility? Does it discourage someone from applying? One failure fails the case.
3. **Same facts, same treatment.** Matched pairs that change only the borrower's name, dialect, or language. The record should come out identical, which code can check. A deliberately planted bias is the control, proving the test can catch one.
4. **The explanation matches the engine.** Every number and every pass/fail claim in the routing narrative, checked by code against the engine's evaluation.

The set will be 50–100 fixed cases: v1's failures, hard ones I write by hand, and generated variants I approve. Every should-pass case gets a should-fail twin, and each runs three to five times; compliance checks have to pass on every run. Judges get yes/no questions only, scored against my labels on catch rate and false-alarm rate, as [Husain and Shankar](https://hamel.dev/blog/posts/evals-faq/) recommend. The "$6.875%" re-grade is why I'm done with 1–5 scales.

Model choice then becomes an optimization, not a contest: the cheapest setup that holds zero silent errors on cases it was never tuned on. A second provider becomes a pass/fail check rather than a ranking. Scale is the catch. Claiming silent errors under 1% takes about 300 clean, independent trials, roughly $25 on the Anthropic model at v1's usage before any judging. That's why v2 needs both more cases and repeats.

Every live call in v1 was approved against a printed cost estimate, and the whole exercise cost about $10.50. v1 stays on [/evals](https://portkey-one.vercel.app/evals) as v1. v2 results next.
