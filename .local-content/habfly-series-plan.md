# HabFly article — private outline

Status: writing paused at Kevin's request, October 15, 2026. Nothing approved for publication. HabFly is one continuous article on the website. Kevin clarified that "multi-page" refers to its length if exported to a Word document, not separate HTML pages or separate Notebook entries. Keep one Markdown source, one URL, and one listing. Navigation should jump to sections in the same article. Any future model, training, browser, and 30-star results material belongs in this article. Do not resume writing until requested.

The existing project page is an overview. The article should explain methods, measurements, outcomes, and limitations, with enough personality to sound like Kevin. His direction explicitly rejects a life-story structure. Keep motivation short and use saved project records for technical detail. Ask about personal judgments only when they add to the explanation; do not require a chronological recollection to proceed. The numbered topics below describe potential sections of this one article, not separate publications.

## 1. The experiment and early results

Reader's question: What was tested, how was it measured, and what actually worked?

- State the 30-star goal and give a short account of the model, tools, and evaluation setup.
- Keep Kevin's origin story to one short paragraph.
- Explain the 98.84% operation-selection / 0-of-100 completion result and the limits of that metric.
- Use the lifetime refinement comparison to show a concrete debugging and training decision.
- Report the 100-case local final with class distribution and supplied-class boundary.
- Distinguish three-field browser transport from the later hybrid three-star workflow.
- Describe the remaining 30-star, assessment, and controlled-topology questions.

Confirmed in Kevin's first interview:
- Reading that Google had released a full fruit fly connectome made him think it would be a fun project to try. He initially needed an idea for what to do with it.
- He chose to try teaching it to find an exoplanet, using HabWorlds, a project from ETX, as the environment.
- The goal was completing the full 30-star project and getting the best data quality it could, without requiring full marks. This is an ambition, not a completed result.
- He referred back to this explanation when asked why HabWorlds. Do not invent additional pedagogical reasons or a particular personal role in developing HabWorlds.

The research-style draft replaces the original opening and is saved at `notebook/habfly-experiment-and-results.md`. Exact report paths, fields, and limits are in `habfly-evidence.md`. No publication date or published state has been set.

Kevin also confirmed that during his master's he built regression networks, DANN networks, and classifiers. Do not expand DANN without confirming what he means. The article does not need this background paragraph; its purpose is to explain the experiment. First-run recollection is no longer an outstanding requirement.

Do not infer motivations from code, speculate about a memorable moment, or invent a reaction to a result.

## 2. Building the model from fly connections

Reader's question: What part of the system comes from the connection data, and what learns?

- Explain the selected connection graph, the fixed wiring, and the trainable components.
- Follow one observation through the model to an action choice.
- Explain graph selection and the practical compromises, checking implementation before drafting.
- Describe the artificial model precisely; do not imply biological brain emulation or establish biological properties from its diagnostics.

Visual candidate: an annotated diagram separating the fixed graph from the learned input/output components. An illustrative diagram must be labeled as such; any actual graph rendering must come from existing artifacts. No new graph builds or experiments for the article.

Use implementation records for how the structure works. Ask Kevin about a design preference or contribution only if it is needed for a first-person claim. Do not invent a reason for the graph choice or claim its superiority without a controlled comparison.

## 3. Learning the astronomy workflow

Reader's question: How does choosing the next step differ from doing the arithmetic?

- Work through one recorded calculation sequence, including inputs, tool choice, result reuse, units, and destination.
- Explain the local practice tasks and how training was broken into smaller pieces.
- Go deeper into failed source selection, the training/inference mismatch, and representation changes. The existing draft already summarizes the lifetime comparison; avoid simply repeating it.
- Keep scripted demonstrations, learned local results, and supplied classifications explicit.

Visual candidate: a short annotated action trace tied to a real recorded example. Do not fabricate a trace or turn evaluation scores into a learning curve without matching data.

Verify numerical claims against specific saved evaluations before publication. Explain the measured behavior and the implementation change without requiring invented personal reactions or recollections.

## 4. Taking HabFly into the browser

Reader's question: What changes when the system has to operate the actual activity?

- Explain visible observations, model decisions, browser actions, and readback using one recorded workflow.
- Distinguish learned decisions from scripted setup, arithmetic tools, and runtime checks.
- Show how the terminal interface makes a run inspectable through events, pause/step controls, and replay.
- Discuss a documented integration failure and the limit of the strongest recorded browser result.
- End with the next unresolved question Kevin wants to investigate, rather than a generic project conclusion.

Visual candidates: an existing, reviewed terminal screenshot and a compact observation → decision → action → readback diagram. Review screenshots for login information, student information, private URLs, and unrelated content before public use. Do not open a live HabWorlds run just to obtain images.

The primary question is how learned calculations, scripted setup, rule-based reference decisions, and transport checks work together. Use existing traces and reports. Confirm a personal interpretation or future intention only if the article needs it.

## Evidence checked for this outline

Read-only review of the local HabFly repository:

- `../habfly/README.md`: project scope, graph and model descriptions, local training progression, calculation tools, and early browser evidence.
- `../habfly/docs/architecture.md`: component responsibilities and demonstration modes. Its acceptance table is older than the later browser records and must not be treated as the latest status.
- `../habfly/docs/full-project-checkpoint.md`: September 28 record of three verified browser workflows ending at `awaiting_assessment`; no live assessment, score update, submission, or persistence proof. The document says the first 30-star attempt remains unlaunched. Recheck the relevant records when drafting the results section; do not generalize this checkpoint into full-project completion.

Prior project summaries helped locate these files; the local documents were read again for this outline. No training, inference, browser experiment, data rebuild, or live course interaction was started.

Before substantive technical writing, inspect the relevant code and saved reports for each entry. If discussing the source neuroscience dataset or outside research, consult and attribute the original sources. Do not treat project implementation notes as scientific evidence for biological claims.

### Opening-draft attribution check

Checked on October 15:
- Google Research, "A connectomics milestone: Mapping the complete male fruit fly brain," dated September 3, 2026: https://research.google/blog/a-connectomics-milestone-mapping-the-complete-male-fruit-fly-brain/ . It credits a collaboration led by HHMI Janelia with Google and other research groups. The draft avoids attributing the full map to Google alone.
- Official MaleCNS project page: https://male-cns.janelia.org/ . The repository README identifies MaleCNS v1.0 as HabFly's source data. This is not interchangeable with the separate FlyWire female-brain map.
- `../habfly/README.md`, `../habfly/docs/architecture.md`, and the current `../habfly/src/habfly/model/policy.py` were read again for the fixed-wiring and observation/action description.

Kevin has not identified the exact article or release he originally read. The draft describes his recollection generally and links the male-map announcement as technical attribution in a separate paragraph, not as a claim that this was his original reading. Do not assign a start date or say he began from FlyWire without confirmation.

## Publication and review

- Writing is paused. When resumed, expand this single article using its methods/results/limitations structure.
- Keep the article and draft visuals local until approved. Use draft metadata with no publication dates.
- Provide section links, Notebook navigation, and a project-overview link. Draft article references must not enter public project pages or the production export.
- Give each section a useful purpose and example. Avoid repeating the case study or padding the article to fill a length target.
- Keep unconfirmed details in these private notes, not in public placeholders.
- The circuit-measurements draft is parked outside the active notebook directory. It has not been approved, published, or deleted.
