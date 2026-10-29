# Private content review

This file is for Kevin and the site maintainer. It is ignored by Git and is not copied to the public export. The site source will be public; this file and the unpublished drafts stay local. Do not put review notes, draft images, learner data, or infrastructure configuration in `public/`.

## Project descriptions

The featured case studies were checked against the local project documentation on October 15, 2026. No imports, training, external model calls, or live project experiments were run for the portfolio.

| Project | Source of the description | Review before publication |
| --- | --- | --- |
| Course Authoring Systems | `../course-studio/README.md`, `../course-studio/docs/architecture.md`, `../course-studio/docs/acceptance.md`; `../oli-torus-advanced-author-ai/docs/codex-openstax-continuation.md` | Confirm the account of your role and the relationship between the two implementations. The importer continuation has newer evidence than the original hand-test-ready plan. The site deliberately avoids quoting old test totals. |
| HabFly | `../habfly/README.md`, current local learning and browser documentation | Confirm the current checkpoint summary before publishing. The README records 100 held-out local calculation tasks with supplied classifications and a ten-run numeric browser batch. Those do not establish real-project completion. The older architecture overview has stale acceptance entries; it is not the source for current scores. |
| Embedded Learning | `../EmbeddedLearning/README.md`, `../EmbeddedLearning/docs/architecture.md`, `../EmbeddedLearning/docs/verification.md` | Confirm role wording. Verification describes a recorded run, not a new acceptance test or evidence of teaching effectiveness. |
| Torus, Animal Cell, Support Analytics, MacChat | Existing portfolio content, plus established Torus accessibility context | Confirm present status and contribution wording. The support classifier scores are retained from the existing portfolio and have not been recomputed. MacChat remains described as in development. |

The existing Embedded Learning screenshots show a product-specific project in the navigation or dashboard. They have not been copied into this site. The current visuals are diagrams and illustrations, not product screenshots. A later clean screenshot can be added after review without exposing the deferred product.

## Notebook drafts and series planning

All entries in `.local-content/notebook/` have `state: draft`, `publishedAt: null`, and `updatedAt: null`. None is approved for publication. Local preview: `pnpm dev:drafts`, then open the Notebook page at the printed loopback URL. Never deploy a development server.

### Getting started with embedded systems

Scope correction from Kevin on October 15: this article is about his own learning of embedded systems, not the EmbeddedLearning software project. Do not write about the application, tutoring implementation, lesson design, lesson expansion, or assessment rules. Earlier questions and technical prose about the software were based on the assistant's misunderstanding and have been removed from this draft. The draft is now `notebook/getting-started-with-embedded-systems.md`, with a matching slug.

Confirmed by Kevin in the interview:
- Getting a 3D printer sparked his interest in embedded systems.
- He wanted to experiment with electronics and eventually make health-related tools/devices for his cats.
- He has a master's in computer science but has not studied electronics in much depth.
- He has built simple breadboard circuits, lit LEDs, and made a seven-segment display work with an Arduino.
- The ESP32 was new to him, as was work much beyond simple Arduino projects.
- He wanted a structured way to learn C and the ESP32 and expected a fun learning experience.

The private draft now covers the motivation, Arduino background, reasons for selecting ESP32, completed first program, and next weight-measurement goal. Kevin's subsequent answers explicitly supplied the cat-bed weight goal for this article. Keep the company name, detailed sensor architecture, part numbers, wiring, and broader product plans out. Do not invent a struggle, breakthrough, measured result, finished device, or health benefit.

The electronics automation and rollout records establish that lab instructions were delivered. Their "success" or "completed" labels do not establish that Kevin physically completed those particular circuits, took measurements, or passed the lab criteria. His confirmed basic Arduino work does not validate the separate generated lab records.

October 15 follow-up: Kevin chose ESP32 for extensibility, low cost, and accessible prototyping. He is preparing to set up the weight sensors and determine their mounting in the cat bed. His first milestone is displaying his cat's weight correctly. Refer to the sensors as load cells, supported by the project records. Do not present weight readings or mounting/calibration as completed.

Read the recent chat titled "Plan the next ESP32 lesson" (01a140b2-324a-75e0-a015-874ec6aee769), then checked `../PandoHealth/docs/progress.md` and `../hello/main/hello.c` directly. The progress log, dated October 14, records ESP-IDF setup on the Mac, a written message/delay loop, a successful hardware build/flash, and repeated serial output. The current source matches the loop. No build, flash, sensor experiment, or hardware validation was run for this notebook. The chat also confirms that Kevin wants electronics, ESP32, and firmware through prototype work, not beginner CS instruction. No claims about what he now understands have been inferred from assistant-written progress notes.

Kevin's comparison to Raspberry Pi is a useful indication of the desired affordability/features, but do not say an ESP32 is simply a Pi with less memory or attribute its price to memory alone. Official Espressif ESP32-S3 overview and Raspberry Pi computer/microcontroller documentation were checked: ESP32 is an MCU platform; Raspberry Pi includes both Linux-capable computers and Pico microcontrollers. The article keeps his personal selection reasons and omits an unsupported price comparison. Sources: https://www.espressif.com/en/products/socs/esp32-s3 ; https://www.raspberrypi.com/documentation/computers/getting-started.html ; https://www.raspberrypi.com/documentation/microcontrollers/ .

Final interview answers: Kevin said nothing felt unfamiliar and the first program was simple and straightforward. Do not turn the setup notes into a personal struggle or breakthrough. He plans to compare readings against another scale. That is a planned comparison, not a completed calibration or verification result. No accuracy target or measured agreement has been supplied. Kevin called this a good first draft and added that he has not soldered in a very long time and is excited to get back to it. The draft now includes that anticipation; no completed soldering work or specific length of time is claimed. The article remains unpublished.

### Reasoning through a circuit with a meter

Kevin chose to skip this article and replace it with a HabFly series on October 15. The original draft is preserved at `parked-notebook/circuit-measurements.md`, outside the directory scanned by local Notebook preview. It is not an active article or a publication candidate.

Source of the parked draft: prior low-voltage Ohm's law / LED and Kirchhoff fault-finding lab material. Its illustrative calculations are not measured results or evidence of a completed personal bench session.

### HabFly article

Latest direction: Kevin means one long, continuous website article. "Multi-page" means document length if exported to Word, not HTML pagination or a series of posts. Writing is paused. The navigation change adds section anchors and links between the Notebook, article, and project overview. The existing prose is unchanged; the title no longer says "part 1." All temporary page-break markers and numbered routes were removed.

See `habfly-series-plan.md` for the private working outline and `habfly-evidence.md` for the report-by-report evidence ledger. Kevin redirected the series toward a research article with personality: how it was done, metrics, outcomes, and limitations. The first article now covers the experiment and early results, followed by planned entries on model wiring, learning the calculation workflow, and browser integration. The revised article is `notebook/habfly-experiment-and-results.md`; it replaces the earlier origin-story opening and remains a draft with no publication dates. The existing project page remains unchanged. No live experiment was run.

Kevin confirmed that reading about Google's fruit fly connectome release sparked the project, that he chose finding an exoplanet through HabWorlds as the task, and that the goal was the full 30-star project with the best data quality it could achieve rather than requiring full marks. He also confirmed building regression networks, DANN networks, and classifiers during his master's. Do not expand DANN or invent reactions, struggles, or surprises. His first implementation recollection is not needed to write the technical account.

Saved JSON reports were inspected for graph counts, the failed smoke evaluation, the three lifetime refinement branches, the final local evaluation, ten-run browser transport, and the later three-star workflow. The first article reports specific denominators and separates these experiments. The 98.84% operation-selection figure counts repeated applicable choices, with zero input-binding attempts and zero completions. The final 100/100 local result includes supplied classifications and a 50/25/25 class split. The three-star run explicitly uses non-learned reference decisions and a classification heuristic alongside learned numeric steps; never describe the whole run as learned. Full 30-star completion, data-quality score, and persistence are not established by these records. The old architecture acceptance table and portions of the README are superseded by later browser records.

Primary sources checked the connectome attribution: Google Research's September 3, 2026 male-fly-map announcement credits HHMI Janelia, Google, and collaborators; the official MaleCNS page identifies the data used by the repository. The original article Kevin read is not yet identified. Keep the recollection general, distinguish the source map from HabFly's selected graph, and describe the model as an artificial neural network. The draft's fixed-wiring and observation/tool/browser description was checked against the current README, architecture, and policy source. Do not present the 30-star goal as a result or infer that every browser step is learned.

### My homelab and what runs on it

Kevin's October 15 interview supersedes the older Umbrel/ZimaOS storage plan. The draft at `notebook/structuring-a-home-lab.md` is now a short first draft based on his current setup. It remains local and unpublished, with no publication or update date.

Confirmed by Kevin:
- Motivations: owning his data, working on networking, and avoiding paid deployments. Do not turn this into measured savings or a claim that self-hosting is free.
- Dell OptiPlex running Proxmox, with TrueNAS handling the NAS, and Immich hosted on the same machine. The NAS holds backups for his MacBook, his fiancée's MacBook, and both phones; Immich stores both people's photos. He called these full backups, but the article uses "backups" because the precise client tools and scope remain unspecified. Do not infer Time Machine, whole-device images, scheduled jobs, or tested recovery. Earlier he mentioned launching test VMs; his latest explanation prioritizes keeping the OptiPlex dedicated to the NAS, so the article no longer presents it as an active experiment host.
- Kevin uses iCloud as part of his intended 3-2-1 setup and confirmed that the same data is kept on the original devices, TrueNAS, and iCloud. The article describes those locations directly. Exact coverage by iCloud Photos, iCloud Drive, and device backups, local-original retention, recovery history, and deletion/version behavior are unspecified. No formal 3-2-1 verification or successful restore is claimed.
- ThinkPad converted into a server by removing its display and battery; used for remote site hosting and CI/CD. Kevin confirmed that "Course Updater" means Course Studio. Its active local GitLab CI/CD pipeline runs tests, builds the app, and restarts it after a push. The article uses "app" because whether the restart operates on a service or container remains unspecified. No test suite, failure gate, rollout strategy, or exact pipeline configuration has been inspected. The app description and link follow the existing Course Authoring Systems case study.
- Framework running local AI and able to run games. Kevin now confirms Qwen3.8 27B at Q4, mostly for experimentation; he likes it as a self-hosted agentic model. The official Qwen model repository at https://huggingface.co/Qwen/Qwen3.8-27B and QwenLM release README confirm the model name. Do not change it to Qwen3.5, select a particular Q4 variant, or infer a runtime, GPU, speed, memory use, or completed agent task. Kevin described it as secure; the article expresses self-hosting/control without claiming that the deployment has been audited, is isolated, or never communicates externally.
- Two Raspberry Pis: one for monitoring service availability, machine health, and network traffic; another for Headscale. Kevin confirmed the name and monitoring scope, then explicitly requested present-tense article wording because he will make these additions. The private draft now follows that requested publication perspective in its introduction, summary, heading, and prose. Installation is not yet confirmed by his account; check that it matches the setup before publication. Do not infer a monitoring product, completed deployment checks, or network topology.

The naming, broad deployment sequence, storage software, and copy locations have now been confirmed. No further answers are required for this short draft. Headscale's official documentation at https://headscale.net/stable/ identifies it as a self-hosted implementation of the Tailscale control server; Kevin confirmed it is his intended choice. Apple documentation checked at https://support.apple.com/en-us/108782 explains that iCloud Photos synchronizes changes/deletions and is not duplicated in iCloud device backups. This is a source boundary for any later backup explanation, not evidence of Kevin's specific configuration or a reason to add a generic warning to the article.

Kevin declined the proposed VM/networking anecdote; do not keep asking for one or add a substitute story. Keep unanswered questions and old proposals out of the article body. No current disk sizes, mirror configuration, restore success, uptime, public exposure, runner isolation, or hosting savings have been established. Self-hosting Course Studio does not establish the full-course acceptance checks discussed on its project page; reconcile future hosted-status copy carefully without dropping those limitations.

No private network addresses, host credentials, admin URLs, or detailed network map are needed for the article. No machines, network services, or deployments were accessed or changed while preparing it.

October 15 editorial follow-up: Kevin found the short draft too much like a bullet list. He then explained the deliberate physical split: keep the OptiPlex focused on the NAS so problems with site hosting do not put household data in difficulty. He recognizes VM separation but prefers a physical separation too. This is a design choice, not proof of complete fault isolation or an account of an actual outage. The expanded draft now develops that reason, the Course Studio deployment process, local model experimentation, and the planned Pis in connected prose. Do not invent an outage, failed experiment, maintenance habit, or performance observation.

Latest structure requested by Kevin: introduce what the homelab has first, then explain what each machine runs and why it was chosen. The article now opens with the three current machines and the ThinkPad conversion, followed by sections for the OptiPlex, ThinkPad, Framework, and planned Pis. Retain the substantive explanations rather than reducing the article to an inventory. Confirmed reasons include data ownership, networking, avoiding paid deployments, physical separation of NAS and hosting, and experimenting with self-hosted AI. Reasons for choosing particular hardware models, Proxmox over another hypervisor, or TrueNAS/Immich over alternatives remain unspecified; do not invent comparisons, purchases, specifications, or room/rack placement.

Subsequent wording correction: Kevin asked to remove "next additions" and describe what the Pis run. They are now included in the opening inventory and have a present-tense section alongside the other machines. This supersedes the planned-Pi presentation described above; the article remains unpublished.

Read-only evidence checked for expansion: `../course-studio/README.md`, `docs/deployment.md`, `compose.yaml`, and `package.json`. These establish the application components, authoring workflow, queued worker, PostgreSQL state, and separate object storage. The draft now explains those components to give the deployment example substance. The local checkout contains no GitLab pipeline definition found by the targeted filename search; the push/test/build/restart account remains based on Kevin's confirmation. Do not substitute the supplied local Compose configuration for evidence of his running ThinkPad configuration or publish any host, port, auth, credential, or access details from it.

## Editorial pass

Read the copy as prose, not only as a list of prohibited words. Remove generic transitions, advertising claims, invented motivations, repetitive contrasts, and conclusions that merely restate the preceding section. Preserve technical caveats where they prevent a misleading claim. Review headings, captions, page descriptions, and sharing text too.

## Approving an article

After Kevin reviews an entry, move the entry into `content/notebook/`, set `state: published` and `publishedAt` to the actual publication date, quoted as `YYYY-MM-DD`. Leave `updatedAt` null until a later substantive edit. Build and inspect the public page, home listing, notebook listing, sitemap, and RSS feed before publication. A publication state is a content decision; all current articles remain unpublished.

## Infrastructure work added October 15, 2026

Kevin reported three completed areas: AWS infrastructure consolidation that reduced costs and improved delivery, launches of websites and web apps using AWS stacks, and full database migrations with minimal downtime. The homepage and About page now include that overview. No cost percentage, exact outage duration, AWS service, database engine, employer attribution, or project name has been inferred.

Before a separate case study, confirm the before/after infrastructure, shareable savings, application names and deployment services, migration source/destination and downtime, and Kevin's part in each effort. Earlier Infiniscope planning and cost discussions do not establish that those are the completed projects being described.

### Kevin's follow-up and the AWS case study

Kevin confirmed a 66% infrastructure cost reduction through consolidation of EC2 instance auto scaling, NAT gateway updates, and distribution based on high-density locations. He reported database migrations from multiple AWS accounts into one consolidated account, reductions in database size and throughput, and minimal downtime. He launched educational web applications with Amplify and Fargate intended to scale for tens of thousands of students. He led each effort and performed most AWS implementation himself, with others providing access information as needed.

Public attribution approved: AWS work for the ETX Center, SESE, Arizona State University. Do not identify the particular applications, databases, account IDs, endpoints, internal diagrams, student records, or health information. Do not claim PHI/FERPA compliance or identify a regulated dataset based on his explanation of confidentiality. The case study uses a diagram of areas of responsibility, not a map of production infrastructure.

The 66% figure and completed-work claims come from Kevin's account in this conversation. No billing exports, load tests, or migration logs were requested or examined. Avoid turning the figure into monthly savings or claiming it covers the whole center's bill. Intended reach is not observed adoption or concurrent capacity. No geographic region, routing service, database engine, downtime duration, or migration technique has been inferred.

Editorial follow-ups if needed: clarify what "distribution based on high-density locations" refers to; clarify whether reduced database size means provisioned storage, data volume, or instance size. "Throughput allocations" describes the reported reduction without naming an AWS database product. No additional technical specifics are needed to publish this general account after Kevin reviews it.

ASU's public ETX About page and SESE Science Education page were checked for organization names and are linked from the case study. Those pages do not substantiate Kevin's individual accomplishments.

Kevin subsequently confirmed that the database systems were DynamoDB and PostgreSQL, downtime was one hour, and geographic distribution was based on user density. Public copy now says "about one hour" in place of "minimal downtime" and includes those systems and the user-density basis. This supersedes the earlier pending engine, duration, and geographic details. No specific AWS region, migration technique, or individual application has been added.

## AWS case-study review changes

Kevin requested removal of the service-name diagram and organization links, one combined role/result sentence, more substantive explanations, and a desktop layout with multiple columns. The service-name diagram and its caption have been removed. The organizational attribution remains in prose; the Links section is gone. Role and outcomes are now one sentence.

The cost section now includes a relative-cost comparison derived from the user-confirmed 66% reduction: previous setup = 100, after consolidation = 34. This is a normalized index, not dollar amounts or a time series. It does not attribute portions of the reduction to particular services.

Follow-up questions sent: before/after Auto Scaling, NAT and geographic decisions; period/scope of the savings figure; tools and steps for each database migration; what took place during the outage and how data/application behavior were checked; the Amplify/Fargate split, releases, scaling, and hardest decision. Do not invent answers or add a detailed architecture or migration diagram until those details are confirmed.

The latest copy says exactly "one hour" of downtime, superseding the earlier note saying "about one hour."

## Detailed infrastructure account from Kevin

Kevin clarified that much of the savings came from consolidating duplicate PostgreSQL user/application databases. This reduced RDS overhead and the number of NAT gateways needed. Additional work removed stale EC2 instances and associated NAT gateways, chose data replication locations and availability zones based on user density, consolidated IAM access, and improved security groups. The earlier claim that cost savings were mainly a compute/network change has been corrected.

Two different migration paths are now described:
- PostgreSQL: a generated script rebuilt the database in RDS in the consolidated AWS account. The particular export/GUI tool or command has not been established. Do not call it a native PostgreSQL Migrate feature, pg_dump, DMS, replication, or snapshot sharing without evidence.
- Separate application: PostgreSQL on DigitalOcean moved to DynamoDB application records, Cognito accounts, and Amplify hosting. This was not a DynamoDB-to-DynamoDB migration across AWS accounts; the earlier simplified description has been corrected on the case study and About page.

Kevin confirmed a one-hour outage, maintenance notification, tests for migrated records, extensive Playwright checks, and manual QA by the team. Password hashes were not transferred and users reset passwords on first login. He has not heard of support issues; no blanket claim of zero defects or lossless migration is added. No test counts, row totals, exact checksum process, concurrency measurements, migration dates, or per-service savings breakdown have been invented.

Local read-only search for Fargate/ECS deployment definitions found none in the checked project source. An Amplify build file exists under the current candidate React implementation, but that does not establish the release process for the earlier deployments being described. Prior memory notes describe proposals and have not been treated as proof of these completed migrations. A follow-up asks whether the Fargate work was configured through the AWS console or a repository.

The savings comparison period and exact bill/service scope remain unspecified. Keep the 66% figure as the user's infrastructure reduction; no monthly-dollar chart or historical trend.

Kevin confirmed that Fargate was configured in the AWS console. The public deployment paragraph now includes that fact. Container images, resource settings, load balancers, health checks, scaling thresholds, and version-rollout steps remain open recall prompts; they are not yet claims about his setup.

Kevin then recalled changing Fargate CPU/memory settings, NAT/public URL and load balancing, and scaling thresholds in the console. Public copy describes those responsibilities as resource settings, networking/public access, load balancing, and scaling thresholds. Exact values, before/after policies, balancing algorithm, NAT topology, rollout method, container registry, and health-check configuration remain unspecified. No further recall question is needed for this level of detail.
