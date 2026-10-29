# HabFly article evidence — private

Read-only review on October 15, 2026. This ledger supports `notebook/habfly-experiment-and-results.md`. No training, inference, replay, graph rebuild, or browser experiment was run. Python was used only to read saved JSON, select fields, and calculate descriptive counts. Source paths are relative to `/Users/kjsegovi/Projects/habfly`.

## Scope and voice

Kevin requested a research-style article with personality: methods, metrics, outcomes, and limitations, with a short motivation rather than a life story. During his master's he built regression networks, DANN networks, and classifiers. Record DANN as supplied; do not expand the abbreviation or infer specific expertise without confirmation. The article does not need that biography to explain the experiment.

The full 30-star project and best attainable data quality are his intended outcome, not a completed result. Existing milestones are retrospective checkpoints, not new validation or permission to run experiments.

## Claim ledger

| Claim in draft | Primary local source | Interpretation / limits |
| --- | --- | --- |
| 2,000 nodes, 132,365 directed edges | `data/processed/graphs-v2/graph-2000/graph_manifest.json`: `num_nodes`, `num_edges` | Validation records 128,416 active nonzero signed edges. Graph nodes represent selected neuron records, not the whole brain. |
| Fixed wiring and learned model components | `README.md`, `docs/architecture.md`, `src/habfly/model/policy.py` | Artificial recurrent model; do not call it a biological brain simulation. |
| Early local run 0/100; all at 128 actions | `experiments/stellar-local-eval-smoke-001/report.json`: `episodes[].completed`, `episodes[].steps` | Read all 100 episode summaries. No new evaluation. |
| 3,926/3,972 = 98.84% applicable operation selections | Same smoke report: `calculation_correct`, `calculation_attempts`; `docs/stellar-local-verification.md` | Repeated selection counter, not calculation execution, task accuracy, or independent observations. |
| Zero binding, copying, or unit attempts; 0/462 correct numeric fields | Same smoke report: `input_attempts`, `copy_attempts`, `unit_attempts`, `numeric_fields_correct`, `required_fields` | Zero invalid actions and tool errors does not imply useful behavior. |
| Initial lifetime 5/8 train, 8/16 development | `experiments/lifetime-001/report.json`: `seen`, `development` | All development main-sequence cases failed. Radius-versus-lifetime diagnosis documented in `docs/lifetime-manual-test.md`, citing `option-diagnostic.json`. |
| Additional workflow training 4/8, 8/16 | `experiments/lifetime-002/report.json`: `seen`, `development` | 200 further updates; no final test opened for this failed branch. |
| Dropdown-only refinement 8/8, 16/16 | `experiments/lifetime-003/report.json`: `seen`, `development` | Returns to 001; does not descend from the failed 002 checkpoint. |
| Only two dropdown tensors changed | `experiments/lifetime-003/frozen-components.json` | `option_projection.weight` and `option_query.weight`; other listed components unchanged. This ledger read the saved comparison; it did not load checkpoints or rerun a tensor audit. |
| Final 100/100, split 50/25/25 | `experiments/lifetime-003/final/report.json`: `closed_loop.requested`, `completed`, `by_class` | 50 main-sequence six-calculation cases, 25 giant + 25 white-dwarf three-calculation cases. Supplied classifications and required fields. |
| Correct calculations, bindings, numbers and units; no invalid actions/tool errors | Same final report: `closed_loop.accuracy`, `invalid_actions`, `tool_errors`; `model_state_unchanged`, `optimizer_updates` | Conditional local workflow, not classification learning or a course score. |
| Eight training cases, separate final cases and four held-out templates; 60/31 actions | `docs/lifetime-manual-test.md`; `experiments/lifetime-003/manifest.json`; final episode summaries | Generated measurements independent of supplied stellar class. Not physically consistent H-R classification data. |
| 10/10 browser runs, ten names, nine measurement sets, 30 verified entries | `experiments/browser-reliability-002/report.json`: requested/attempted/passed runs, unique counts; sum of `len(runs[].verified_fields)` | Numeric transfer only; each run has 31 learned decisions and zero runtime errors. Checkpoint is the earlier three-field policy, not the six-calculation local final. |
| Scripted setup vs learned calculation sequence | `docs/browser-learned-tui.md` | Setup is not learned. Transport readback is not course grading or persistence. |
| Three verified browser workflows, no full completion | `experiments/browser-project-single-event-three-star/a90d83bc86aa4a84a0908ba6665e7a01/report.json`: progress collected=3, verified=3, unresolved=0, `phase=awaiting_assessment`, `target_workflows_verified=true` | `task_completed=false`, `project_completed=false`, `persistence_verified=false`, no assessment/score transfer/submission. |
| Browser workflow contains rule-based decisions | Same three-star report: `decision_source=local_reference_tools_not_learned`, `classification_source=automatic_visible_reference_heuristic`; `docs/full-project-checkpoint.md` first checkpoint | Do not call the entire run learned behavior. All three followed no-planet branches; no learned exoplanet detection demonstrated. |

## Scientific limits and comparisons

- The early 0/100 and later 100/100 are not matched before/after measurements. Training, representations and checkpoint lineage changed. No progress curve or single causal attribution.
- The lifetime comparison uses a tiny development set and one lineage. No claim that head-only refinement generally outperforms full training.
- Baseline smoke machinery exists (`README.md`, `docs/verification.md`); no superiority over random/dense/recurrent alternatives is claimed. A controlled topology comparison across seeds is proposed, not reported as completed or missing solely because a search found no file.
- The saved final local test has been consumed. Do not propose retuning on it and calling subsequent evaluation unseen.
- Counts are descriptive; no confidence interval, significance, biological cognition, general intelligence, independent star discovery, or teaching-effectiveness claim.
- Current public HabFly case-study copy is outside this prose revision. Later review should compare its older README-derived status with these later checkpoint records before publication.

## External attribution

- MaleCNS v1.0 downloads, read October 15: https://male-cns.janelia.org/download/ . Official source credits FlyEM/HHMI Janelia, Cambridge, MRC LMB and Google Research; data licensed CC-BY. Article links directly to this page.
- Google Research male-map announcement, checked during the earlier draft: https://research.google/blog/a-connectomics-milestone-mapping-the-complete-male-fruit-fly-brain/ . The exact article Kevin originally read remains unspecified; no date of his inspiration is claimed.

## Editorial review

The opening is now purpose and task first, with one short motivation paragraph. Technical outcomes are tied to named task scopes and denominators. The text contains no invented first-run reaction or struggle. The table compares the recorded lifetime branches, not personal recollections. Draft metadata, headings, summary, and prose were reviewed together. All paths, hashes, review notes, and raw reports remain private; only the explanatory article is a publication candidate after review.
