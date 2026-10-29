---
title: "HabFly: The experiment and early results"
summary: "How a model built around fruit fly connections learned a local astronomy workflow, where it failed, and what the browser tests established."
slug: habfly-experiment-and-results
topics: [HabFly, Machine learning, Astronomy]
project: habfly
state: draft
publishedAt: null
updatedAt: null
---
HabFly is an experiment in using fruit fly connection data to structure a neural network that learns parts of an astronomy workflow. The goal is to complete the HabWorlds project: work through all 30 stars and get the best data quality it can. It doesn't need full marks.

The idea started when I read about Google and its collaborators mapping a fruit fly's brain. I wanted to try building something with it, and settled on teaching it to find an exoplanet. HabWorlds, a project from ASU's ETX Center, gave me a place to try that.

This article covers selected development checkpoints recorded through September 28, 2026. They include a failed local training run, a later successful calculation workflow, and browser tests with narrower completion criteria than the full project.

## What the model does

HabFly uses a selected graph from the [MaleCNS v1.0 dataset](https://male-cns.janelia.org/download/), produced by HHMI Janelia, Google Research, and collaborators. The graph used for these checkpoints contains 2,000 nodes and 132,365 directed edges. It is a small portion of the source connectome.

Those connections define fixed wiring inside a recurrent neural network. Learned components encode the observations, update the network's state, and choose actions, controls, and dropdown options. The connection map constrains an artificial model; these experiments do not simulate a complete biological fly.

The model has access to calculation tools. For example, to calculate a main-sequence star's lifetime, it needs to select the operation, bind the previously calculated mass, run the calculation, copy the result into the lifetime field, and select years as the unit. The tool does the arithmetic. Choosing the wrong source or destination still produces a failed workflow.

Training uses demonstrations of those steps. During evaluation, the model chooses its own actions and receives the resulting observations. A mistake can therefore affect every decision that follows.

## A promising percentage with zero completed tasks

An early smoke run trained on four demonstrations for two epochs, then evaluated the saved model on 100 unseen local tasks. It completed none of them. Every attempt reached the 128-action limit.

One metric looked much better: 3,926 of 3,972 operation selections were applicable to the task, or **98.84%**. But that counter included repeated selections. The model made no input-binding attempts, copied no results, and selected no units. It got **0 of 462 required numeric fields** correct.

The calculator had not failed, and the model had not made an invalid interface action. It was repeatedly making permitted choices without progressing through the work. The 98.84% figure described one type of selection; task completion was still 0/100.

That is why the results below report complete rollouts as well as individual decision scores.

## Building up the calculation sequence

Later experiments started with distance and added luminosity, temperature, mass, radius, and lifetime. The lifetime checkpoint gives a useful example of how a specific selection error affected the whole sequence.

Its first version completed 5/8 training tasks and 8/16 development tasks. All giant and white-dwarf development cases passed. Every main-sequence development case failed: after calculating radius, the model selected radius again instead of moving to lifetime.

Two follow-ups used the same eight training cases:

| Lifetime experiment | Training tasks completed | Development tasks completed |
| --- | ---: | ---: |
| Initial checkpoint | 5/8 | 8/16 |
| 200 additional workflow updates | 4/8 | 8/16 |
| Return to the initial checkpoint; 200 dropdown-only updates | 8/8 | 16/16 |

The second attempt also disrupted earlier decisions on the main-sequence path. The third returned to the initial checkpoint and trained only the two components that score dropdown options. The recurrent core, action and control heads, language encoder, and measurement recognition stayed frozen. A saved parameter comparison confirms that only the two dropdown weight tensors changed.

This is a comparison within one checkpoint lineage, using a small development set. It shows a successful targeted repair here; it does not establish that freezing most of a model is generally the better training strategy.

## What 100/100 means here

After the repaired checkpoint passed development, a separate final evaluation completed **100/100 new local tasks**. The test contained 50 supplied main-sequence cases, 25 supplied white dwarfs, and 25 supplied giants, with four held-out instruction templates.

The main-sequence cases required all six calculations and completed in 60 actions. White dwarfs and giants required distance, luminosity, and temperature, completing in 31 actions. The model selected the appropriate shorter path from the supplied class and required fields.

Calculation selection, input binding, numeric answers, and units were all correct in this set. There were no recorded invalid actions or tool errors. The model weights stayed unchanged during evaluation.

These tasks test a controlled calculation workflow. Stellar classification was supplied, and the generated measurements were randomized independently of that class. They therefore do not test whether the model can infer a physically consistent stellar class from observations. They also use deterministic arithmetic tools, so the result does not show that the network learned to calculate the answers internally.

The earlier 0/100 and this 100/100 are different experiments with changes to training and representation between them. They are not two points on a controlled learning curve.

## Moving from local tasks to the browser

A separate browser batch tested distance, luminosity, and temperature using an earlier three-calculation checkpoint. All **10/10 runs** passed their numeric checks, covering ten star names but nine distinct measurement sets. Each run made 31 learned decisions and verified three entered values: **30 verified entries** in total.

Login and initial navigation were scripted. The learned policy selected the calculation steps, while the browser adapter entered values and checked the displayed results. Passing this batch established that those numeric steps worked through the interface. It did not establish grading or persistence after reopening a session.

A later three-star run combined learned stellar calculations with rule-based classification and reference tools for other decisions. It verified all three targeted workflows and stopped before assessment. All three followed the no-planet branch. The recorded flags for full-project completion and persistence remained false.

These runs have not demonstrated learned exoplanet detection or completion of the 30-star project.

## Questions the results leave open

The 30-star goal remains untested in these records, as does the final data-quality score. Planet-present cases and the additional work they require need browser evidence of their own. A successful local task or a fixture test cannot supply that evidence.

There is also a separate question about the wiring. The results reported here do not isolate what the fly-derived graph contributes. A useful comparison would hold the task, training budget, and surrounding model fixed while changing the connection structure, then evaluate across multiple seeds. These checkpoints establish a working local calculation policy and specific browser behavior; they do not establish an advantage over another network architecture.
