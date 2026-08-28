# Logical Fallacies Catalog — 30+ Fallacies for Research Review

## Purpose
Reference catalog of logical fallacies commonly encountered in research. Used by the devils_advocate_agent.

## Formal Fallacies (Invalid Logical Structure)

### 1. Affirming the Consequent
**Structure**: If P then Q; Q is true; therefore P is true.
**Example**: "If a function is differentiable, it is continuous. This function is continuous. Therefore, it must be differentiable."
**Problem**: Q can have multiple causes.

### 2. Denying the Antecedent
**Structure**: If P then Q; not P; therefore not Q.
**Example**: "If a series converges absolutely, it converges. The series doesn't converge absolutely. Therefore, it doesn't converge."
**Problem**: Revenue can increase from other sources.

### 3. Undistributed Middle
**Structure**: All A are B; All C are B; therefore All A are C.
**Example**: "All successful programs use technology. Our program uses technology. Therefore, our program is successful."
**Problem**: B (technology use) is shared but doesn't link A and C.

### 4. False Dilemma / False Dichotomy
**Structure**: Either A or B; not A; therefore B.
**Example**: "Either we adopt online learning completely or maintain traditional methods."
**Problem**: Many hybrid options exist.

## Informal Fallacies

### Relevance Fallacies

### 5. Ad Hominem
**Description**: Attacking the person rather than the argument.
**Research Example**: "This proof is unreliable because the author works for an AI company."
**Correct Approach**: Evaluate the methodology and evidence, not the author's affiliation (though COI should be noted).

### 6. Appeal to Authority
**Description**: Accepting a claim solely because an authority figure endorses it.
**Research Example**: "Published in Nature, so the findings must be valid."
**Correct Approach**: Even prestigious journals publish flawed studies. Evaluate on merit.

### 7. Appeal to Tradition
**Description**: Arguing something is correct because it has always been done that way.
**Research Example**: "This metric has been used for 30 years, so it must be the best measure."
**Correct Approach**: Evaluate whether the metric is still valid in current context.

### 8. Appeal to Novelty
**Description**: Arguing something is better because it's new.
**Research Example**: "This new framework must be superior to the established one."
**Correct Approach**: Novelty doesn't equal improvement. Compare on evidence.

### 9. Appeal to Popularity (Bandwagon)
**Description**: Arguing something is true because many people believe it.
**Research Example**: "Most researchers in the field use this method, so it must be the best."
**Correct Approach**: Popularity doesn't validate methodology. Assess independently.

### 10. Red Herring
**Description**: Introducing an irrelevant topic to divert from the argument.
**Research Example**: Responding to criticism of methodology by discussing the importance of the topic.

### Evidence Fallacies

### 11. Cherry-Picking (Selection Bias)
**Description**: Selecting evidence that supports the conclusion while ignoring contradictory evidence.
**Research Example**: Citing 5 studies that support the hypothesis while omitting 12 that don't.
**Detection**: Compare cited sources against comprehensive search results.

### 12. Confirmation Bias
**Description**: Seeking, interpreting, and remembering information that confirms pre-existing beliefs.
**Research Example**: Designing search terms that are more likely to return supportive results.
**Detection**: Check if search strategy was neutral; look for actively sought disconfirming evidence.

### 13. Survivorship Bias
**Description**: Drawing conclusions only from "survivors" (successes), ignoring those that didn't survive.
**Research Example**: "All known counterexamples avoid assumption A" — ignoring counterexamples that satisfy A and still fail.
**Detection**: Ask "what about those that failed?"

### 14. Anecdotal Evidence
**Description**: Using individual stories as proof of a general claim.
**Research Example**: "One prime gap shrank after sieving, so sieving drives prime-gap shrinkage."
**Detection**: Is this a systematic finding or an isolated case?

### 15. Hasty Generalization
**Description**: Drawing broad conclusions from insufficient evidence.
**Research Example**: "Three low-dimension cases show X, therefore this applies to all dimensions."
**Detection**: Is the sample representative? Is the generalization proportionate to the evidence?

### Causal Fallacies

### 16. Post Hoc Ergo Propter Hoc
**Description**: Assuming that because B followed A, A caused B.
**Research Example**: "After implementing the new curriculum, graduation rates improved. Therefore the curriculum caused the improvement."
**Detection**: Were there confounders? Was there a control group?

### 17. Cum Hoc Ergo Propter Hoc (Correlation ≠ Causation)
**Description**: Assuming that correlation implies causation.
**Research Example**: "Rings with more units have larger automorphism groups, so units cause large automorphism groups."
**Detection**: Is there a plausible mechanism? Could both be caused by a third factor?

### 18. Reverse Causation
**Description**: Getting cause and effect backwards.
**Research Example**: "Good notation yields short proofs" when actually "short proofs get polished notation."
**Detection**: Consider temporal order and alternative causal directions.

### 19. Ecological Fallacy
**Description**: Inferring individual-level conclusions from group-level data.
**Research Example**: "Intervals with more primes have more twin primes, so primes cause twin primes."
**Detection**: Are individual-level and group-level relationships the same?

### 20. Simpson's Paradox
**Description**: A trend present in subgroups reverses when groups are combined.
**Research Example**: A and B are both bounded, but A+B is unbounded (due to sign oscillation).
**Detection**: Always check disaggregated data alongside aggregate.

### Reasoning Fallacies

### 21. Straw Man
**Description**: Misrepresenting an opponent's argument to make it easier to attack.
**Research Example**: Critic says "this method has limitations" → Author responds "my critic says the entire study is worthless."
**Detection**: Does the refutation address the actual criticism?

### 22. Moving the Goalposts
**Description**: Changing the criteria for success after seeing results.
**Research Example**: Defining "good basis" as orthonormal, then shifting to "spanning" when orthonormality fails.
**Detection**: Were success criteria pre-defined?

### 23. Slippery Slope
**Description**: Arguing that one action will inevitably lead to an extreme outcome.
**Research Example**: "If we allow flexible admission criteria, academic standards will collapse entirely."
**Detection**: Is each step in the chain actually probable?

### 24. Circular Reasoning (Begging the Question)
**Description**: The conclusion is assumed in the premise.
**Research Example**: "This ring is Noetherian because it is finitely generated, and finitely generated because it is Noetherian."
**Detection**: Does the argument depend on the truth of what it's trying to prove?

### 25. No True Scotsman
**Description**: Redefining a category to exclude counterexamples.
**Research Example**: "All quality assurance systems improve outcomes." "But system X didn't." "Well, X wasn't a true quality assurance system."
**Detection**: Is the definition being modified to fit the claim?

### 26. Equivocation
**Description**: Using a term in two different senses within the same argument.
**Research Example**: "Regular" used sometimes to mean "regular local ring" and sometimes to mean "regular function."
**Detection**: Is the key term defined consistently throughout?

### Statistical Fallacies

### 27. Base Rate Neglect
**Description**: Ignoring the base rate (overall probability) in favor of specific information.
**Research Example**: "This program has a 90% satisfaction rate" — but the base rate for all programs is 88%.
**Detection**: Always compare against relevant base rates.

### 28. Regression to the Mean
**Description**: Extreme performances naturally tend back toward average on subsequent measurements.
**Research Example**: "Our sieve improved counts for the hardest intervals" — they may have improved anyway.
**Detection**: Was there a control group? Were initial measurements extreme?

### 29. Texas Sharpshooter
**Description**: Finding a pattern in random data by focusing on clusters and ignoring misses.
**Research Example**: Running 20 statistical tests and reporting only the 1 that was significant.
**Detection**: Were hypotheses pre-registered? Was multiple testing corrected for?

### 30. Gambler's Fallacy
**Description**: Believing past random events influence future random events.
**Research Example**: "This institution has declined for 5 years, so it's due for improvement."
**Detection**: Is there a causal mechanism for reversal, or is this just pattern-seeking?

### 31. McNamara Fallacy (Quantitative Bias)
**Description**: Making decisions based solely on quantitative metrics while ignoring qualitative factors.
**Research Example**: Judging a proof only by its length, ignoring clarity and generality.
**Detection**: Are important but hard-to-measure factors being excluded?

### 32. Goodhart's Law
**Description**: "When a measure becomes a target, it ceases to be a good measure."
**Research Example**: Universities gaming rankings metrics instead of genuinely improving quality.
**Detection**: Has the metric become a target? Are there signs of metric manipulation?

## Quick Reference: Detection Questions

| Ask This | Detects |
|----------|---------|
| "Does B have other possible causes?" | Post hoc, false cause |
| "What about the failures?" | Survivorship bias |
| "Is this sample representative?" | Hasty generalization |
| "Were criteria defined before results?" | Moving goalposts, Texas sharpshooter |
| "Is the key term used consistently?" | Equivocation |
| "What's the base rate?" | Base rate neglect |
| "What evidence was left out?" | Cherry-picking, confirmation bias |
| "Is this the actual argument being made?" | Straw man |
| "Can we distinguish correlation from causation?" | Cum hoc, ecological fallacy |
| "Are individual and group levels being mixed?" | Ecological fallacy, Simpson's paradox |
