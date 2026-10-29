export type ProjectSection = { id: string; title: string; paragraphs: string[]; points?: string[] };
export type Project = {
  slug: string; name: string; category: string; summary: string; intro: string;
  role: string; status: string; statusNote: string; technologies: string[];
  overviewNote?: string;
  featured: boolean; visual: "courses" | "habfly" | "embedded" | "aws" | "torus" | "tourit" | "analytics" | "infiniscope";
  highlight?: { value: string; label: string };
  sections: ProjectSection[]; links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "aws-infrastructure", name: "AWS Infrastructure", category: "ETX Center / ASU",
    summary: "I led AWS consolidation, web app deployments, and database migrations at Arizona State University’s ETX Center.",
    intro: "My AWS work for the ETX Center, in Arizona State University’s School of Earth and Space Exploration, covered infrastructure consolidation, educational web application deployments, and database migrations.",
    role: "I led each effort and handled most of the AWS implementation myself.",
    status: "Delivered",
    statusNote: "Lower infrastructure costs, web application launches, and database migrations with one hour of downtime.",
    overviewNote: "I led these efforts and handled most of the AWS implementation myself, reducing infrastructure costs by 66%, launching web applications, and migrating databases with one hour of downtime.",
    technologies: ["Amazon RDS", "PostgreSQL", "DynamoDB", "Amazon Cognito", "EC2 Auto Scaling", "NAT gateways", "AWS Amplify", "AWS Fargate"],
    featured: false, visual: "aws", highlight: { value: "66%", label: "lower infrastructure costs" },
    links: [],
    sections: [
      { id: "costs", title: "Where the savings came from", paragraphs: [
        "A large part of the savings came from consolidating duplicate PostgreSQL databases holding user and application data. That reduced RDS overhead and the need for multiple NAT gateways.",
        "I also removed stale EC2 instances and their associated NAT gateways, and consolidated Auto Scaling groups. I reviewed where data was replicated and which availability zones we used, choosing locations based on user density.",
        "Together, the infrastructure changes reduced costs by 66%. The cleanup also included consolidating IAM access and revising security group rules."
      ] },
      { id: "databases", title: "Rebuilding PostgreSQL in RDS", paragraphs: [
        "For the PostgreSQL move, I used a generated SQL script to rebuild the database in Amazon RDS in the consolidated AWS account.",
        "This brought databases from separate accounts into the consolidated setup. It reduced the duplicate database infrastructure and allowed us to use fewer NAT gateways."
      ] },
      { id: "dynamodb", title: "Moving a DigitalOcean application to AWS", paragraphs: [
        "A separate application used a simple PostgreSQL database on DigitalOcean. I moved its application records to DynamoDB, used Cognito for user accounts, and moved the site to Amplify.",
        "DynamoDB and Cognito covered the application’s data and account needs at a much lower running cost.",
        "We did not carry over password hashes. Users needed to reset their passwords on their first login after the move."
      ] },
      { id: "verification", title: "Checking the migration", paragraphs: [
        "We notified users about the maintenance work. The cutover involved one hour of downtime.",
        "We wrote tests for the migrated records, and the team ran Playwright tests and manual QA to check application behavior. I handled most of the AWS implementation, with the team contributing to verification."
      ] },
      { id: "deployments", title: "Deploying educational web applications", paragraphs: [
        "I also deployed educational web applications using AWS Amplify and Fargate, with a target audience of tens of thousands of students.",
        "I configured the Fargate deployments in the AWS console. My work included adjusting CPU and memory settings, networking and public access, load balancing, and scaling thresholds."
      ] }
    ]
  },
  {
    slug: "course-authoring-systems", name: "Course Authoring Systems", category: "Educational software",
    summary: "Turning source material into editable courses, from an OpenStax importer inside Torus to a standalone authoring service.",
    intro: "I’ve worked on two ways to turn source material into editable courses. An OpenStax importer creates drafts inside OLI Torus. A separate service, Course Studio, prepares courses for export to Torus or Canvas. The work covers source preservation, generated activities, author review, and recovery when an operation fails.",
    role: "I developed the importer workflow and the standalone Course Studio implementation. Torus itself is a larger open-source platform to which I contribute.",
    status: "In development",
    statusNote: "Both implementations have local verification records. Complete-book acceptance and hosted Course Studio use remain separate checks.",
    technologies: ["Elixir / Phoenix", "Rust", "TypeScript", "React", "PostgreSQL", "MCP"], featured: true, visual: "courses", links: [],
    sections: [
      { id: "two-implementations", title: "Two implementations", paragraphs: [
        "The OpenStax importer works inside Torus. It preserves selected textbook material in editable, unpublished lessons and manages generated questions and simulation additions alongside that material. A book draft can exist even when an addition still needs attention.",
        "Course Studio takes the authoring workflow outside the LMS. It accepts source material, gives a connected assistant bounded authoring tasks, and lets the author review the outline and course before downloading a Torus or Canvas package. It has its own Rust and TypeScript codebase. It does not reuse the importer implementation or create simulations."
      ] },
      { id: "architecture", title: "Source, review, export", paragraphs: [
        "In Course Studio, a Rust API owns projects, source snapshots, revisions, task state, and approvals. PostgreSQL stores the workflow. A thin TypeScript MCP service connects an assistant to the same API used by the review website.",
        "The course model sits between source ingestion and export. OpenStax, Pressbooks, DOCX, Markdown, and HTML enter through source adapters. Torus and Canvas exporters then translate the approved course into the formats each platform supports."
      ], points: ["Source snapshots retain reading order, attribution, and media references.", "An assistant works on a claimed task with a specific revision; stale submissions cannot replace newer work.", "Approvals refer to an exact course revision. Editing the course invalidates the approval for a new export."] },
      { id: "decisions", title: "Keeping the source intact", paragraphs: [
        "Asking a model to reproduce an entire textbook page creates an unnecessary opportunity to change it. Course Studio can instead hydrate a lesson from an immutable source section. Generated material is checked separately from the reading it accompanies.",
        "The importer has a related recovery problem: an unsuccessful addition should not erase an otherwise useful draft. Failed additions retain their diagnostics and can be retried or explicitly removed. Revision checks prevent recovery from overwriting later author edits.",
        "A missing chapter also has to stay visible as a failure. Course Studio rejects incomplete book ingestion rather than calling a shorter snapshot a complete import."
      ] },
      { id: "example", title: "What happens to a branching lesson?", paragraphs: [
        "One course model does not make two LMSs interchangeable. A supported Advanced lesson can keep its branching structure in the Torus export. The Canvas export turns those branches into labeled, linear content and practice quizzes.",
        "Media has a similar difference. Canvas can carry bundled images. Torus’s digest importer needs durable media URLs, so a private uploaded image can block that export. Course Studio reports the limitation instead of quietly making the file public."
      ] },
      { id: "verification", title: "What has been checked", paragraphs: [
        "The importer records include focused backend and frontend tests, draft-recovery checks, and a manually verified single-simulation insertion. That narrower check does not establish a successful full-book workflow.",
        "Course Studio’s local checks cover source ingestion, ownership, task leases, stale revisions, approvals, package downloads, and checksums. A local HTTP MCP smoke test exercised the authoring transport. Package structure and schema checks do not establish that a real course imports and behaves correctly in both LMSs."
      ] },
      { id: "next", title: "Still to check", paragraphs: [
        "The importer still needs complete-book acceptance under the intended workflow. Course Studio needs production sign-in checks, connections with the intended assistant clients, and actual Torus and Canvas imports. Full-book performance and backup recovery also need testing before hosted use."
      ] }
    ]
  },
  {
    slug: "habfly", name: "HabFly", category: "Machine learning experiment",
    summary: "An experiment in learning astronomy workflows with a network based on fly-neuron connections. In progress; article coming soon.",
    intro: "HabFly is a learning experiment built around a map of connections between fly neurons. I’m exploring how it can learn sequences of decisions in astronomy tasks, from choosing a calculation to reusing a result and entering an answer.",
    role: "I developed the learning engine, task environments, browser adapter, and Rust terminal interface.",
    status: "Research in progress",
    statusNote: "Testing is ongoing. A longer article about the design, experiments, and results is coming soon.",
    technologies: ["Python", "PyTorch", "Rust", "Playwright"], featured: true, visual: "habfly", links: [],
    sections: [
      { id: "approach", title: "What I’m exploring", paragraphs: [
        "The learning engine uses Python and PyTorch, with a recurrent graph whose wiring is based on connections between fly neurons. The policy chooses actions, while astronomy tools handle calculations and return results that can be reused in later steps.",
        "A browser adapter connects those decisions to an astronomy activity. A Rust terminal interface lets me inspect decisions and network activity, step through a run, and replay recorded events."
      ] },
      { id: "progress", title: "Where it stands", paragraphs: [
        "I’m testing the learning system in local task environments and bounded browser trials. Full learned completion of the real HabWorlds project has not been established.",
        "The forthcoming article will cover the architecture, what the experiments show, and the limitations that remain."
      ] }
    ]
  },
  {
    slug: "tour-it", name: "Tour It", category: "Virtual tour authoring / AWS",
    summary: "A virtual tour editor with AWS storage, isolated account access, and a release pipeline that backs up saved work before deployment.",
    intro: "I’m rebuilding Tour It’s browser-based authoring workflow and its AWS infrastructure. Authors can turn panorama scenes into connected virtual tours. My work includes the editor, persistent storage, account access, collaboration services, and a release process that protects saved tours while the application changes.",
    role: "I developed the editor and application services, built the AWS infrastructure with CDK, and implemented the deployment and recovery tooling.",
    status: "In development",
    statusNote: "Staging deployment and release checks have passed. Collaboration testing and recovery rehearsals remain in progress; production promotion is disabled.",
    technologies: ["AWS CDK", "AWS Amplify", "DynamoDB", "Amazon S3", "Amazon Cognito", "API Gateway", "Lambda", "Step Functions", "CodePipeline / CodeBuild", "TypeScript", "React", "Next.js"], featured: true, visual: "tourit", links: [],
    sections: [
      { id: "authoring", title: "Building the tour", paragraphs: [
        "The editor brings panorama scenes, starting views, descriptive text, and hotspots into one workflow. Hotspots can connect scenes or open information and external media. Authors can also describe individual regions of a scene.",
        "Keyboard controls, labeled dialogs, and focus management are part of the editor implementation. Manual assistive-technology assessment remains a separate step."
      ] },
      { id: "aws", title: "Building the AWS environment", paragraphs: [
        "I defined the infrastructure in TypeScript with AWS CDK, separating persistent data from application delivery and collaboration services. Amplify runs the Next.js application. DynamoDB stores project metadata, permissions, sessions, and release state; private S3 buckets hold panorama images, scene documents, and verified source archives.",
        "The data layer uses encryption, S3 object versioning, DynamoDB point-in-time recovery, and retention settings. Keeping those resources in a separate stack lets me change application delivery while preserving the tables, buckets, and keys that hold saved work."
      ] },
      { id: "storage", title: "Saving and serving panoramas", paragraphs: [
        "Panorama images upload directly to temporary S3 storage. The application then decodes and validates the image, rechecks the author’s current permissions, and conditionally commits a reference to the accepted object. Uploading bytes alone cannot change a saved scene.",
        "Scene documents and accepted images have immutable keys and retained S3 version IDs. A replacement changes the current reference while keeping the previous object available to backups. Version checks reject stale saves, and durable retry records let a repeated request return its original result.",
        "Media delivery also starts with an authorization check, then redirects to a short-lived signed S3 URL. This keeps large image responses out of the application server. Runtime permissions prevent permanent deletion of accepted media, and browser storage access is limited to the configured application origin."
      ] },
      { id: "accounts", title: "Identity and AWS permissions", paragraphs: [
        "Staging has its own Cognito pool. Signing in establishes an identity; an enrolled member record and project permissions determine what that person can open or change. The application can read membership approval records, while enrollment and approval remain operator actions.",
        "I separated application, build, and worker IAM roles. Client secrets stay in encrypted Systems Manager parameters. Hosted sessions use KMS to encrypt the Cognito token stored server-side, and the browser receives an opaque session cookie. Each role has permissions scoped to its environment and task, including restrictions on destructive storage operations."
      ] },
      { id: "releases", title: "Deploying without losing saved work", paragraphs: [
        "CodePipeline and CodeBuild verify an exact source revision, run application and infrastructure checks, and exercise the application against local storage services. The verified source is archived in S3 with a version ID, checksum, and release manifest. Amplify builds that archive, and the running application reports its release identity so the controller can check what actually deployed.",
        "I built a Step Functions controller with versioned Lambda workers to coordinate the release. It acquires a release lock and pauses commits for changes that could affect saved data. After a 90-second quiet checkpoint, it creates project and member backups and waits for them to become available before deployment can proceed.",
        "Application infrastructure changes go through reviewed CloudFormation change sets. The release policy rejects deletion or possible replacement of protected stateful resources. After deployment, a dedicated test account checks sign-in, project reads, panorama upload and finalization, and downloaded image bytes. Editing reopens after the checks pass.",
        "The recovery path can redeploy the previous approved application archive and configuration while preserving user saves. Database restoration is a separate operator procedure into new recovery tables. Failure, rollback, and recovery rehearsals still need to establish this behavior under the intended conditions."
      ] },
      { id: "collaboration", title: "Collaboration and background work", paragraphs: [
        "API Gateway WebSockets and Lambda carry presence and change notifications. A DynamoDB stream tells the notification service when a project changes. Larger documents and edits travel through authorized HTTPS and private S3 transfers. The browser verifies downloaded bytes before applying an update.",
        "SQS workers copy tour assets in bounded batches, with retry handling and a dead-letter queue. Unacknowledged edits remain in the browser for retry after a disconnect. CloudWatch logs and alerts cover failed releases and queued work, with release-failure notifications sent through SNS."
      ] },
      { id: "progress", title: "What has been checked", paragraphs: [
        "Hosted staging checks have exercised Cognito sign-in, encrypted sessions, project saves, stale-version rejection, and full-size panorama uploads and downloads with matching checksums. A staging collaboration release completed its backup, infrastructure, deployment, and smoke checks.",
        "Collaboration is enabled in staging. Full testing between two users, including simultaneous edits and reconnect behavior, remains in progress. Automatic builds, automatic releases, and production promotion remain disabled pending the remaining acceptance work. Public publishing and the rebuild’s integration with Infiniscope are also future work."
      ] }
    ]
  },
  {
    slug: "infiniscope-migration", name: "Infiniscope Migration", category: "Website & AWS migration",
    summary: "Moving Infiniscope to AWS, rebuilding the website, and linking imported logins to reviewed member records and access.",
    intro: "I rebuilt Infiniscope’s Angular website in React and Next.js and moved its hosting from DigitalOcean to AWS. The migration brought together the public resource catalog, Cognito sign-in, DynamoDB membership records, and a domain cutover. Returning members also needed a way to recover their accounts and keep access to existing tools.",
    role: "I implemented the website and AWS deployment, built the member-import and recovery tooling, and handled the DNS cutover.",
    status: "Released",
    statusNote: "The website and AWS cutover were released in October 2026. Legacy member-recovery tooling supports the transition.",
    technologies: ["AWS Amplify", "Amazon Cognito", "DynamoDB", "Route 53", "CloudFormation", "IAM", "AWS KMS", "Systems Manager", "React", "Next.js"], featured: false, visual: "infiniscope",
    links: [{ label: "Visit Infiniscope", href: "https://www.infiniscope.org" }],
    sections: [
      { id: "website", title: "Rebuilding the website", paragraphs: [
        "The replacement carries forward the resource catalog, search, detail pages, and public media. I moved the application from Angular to React and Next.js, with direct checks for routes, content, keyboard interactions, and mobile behavior.",
        "Build checks validate the published content and media hashes, check that Git LFS assets contain the actual files, and inspect the generated application for server-only configuration leaking into browser assets. This made the deployable output part of the migration review."
      ] },
      { id: "aws", title: "Hosting and account services on AWS", paragraphs: [
        "Amplify runs the Next.js application and serves its public assets. Cognito handles authentication, while DynamoDB stores member profiles, identity mappings, sessions, and migration records. I defined the retained member table, encryption key, and runtime permissions in CloudFormation templates.",
        "The member table uses on-demand capacity, point-in-time recovery, deletion protection, and retention settings. Member and identity changes use conditional transactions so the application can reject conflicts without partially linking an account.",
        "I separated the Amplify runtime role from build and operator access, with permissions scoped to the selected application branch and required resources. Client secrets stay in encrypted Systems Manager parameters. Session tokens are encrypted server-side using KMS, and the website session uses a Secure, HttpOnly cookie."
      ] },
      { id: "accounts", title: "Connecting logins to member records", paragraphs: [
        "The old system held authentication in Cognito and member profiles and approval status in Strapi. A login in the new Cognito pool needed a link to the correct member record in DynamoDB before the website could resolve that person’s access.",
        "For legacy recovery, matching uses the canonical username and original identity evidence. The member link is then bound to the new Cognito issuer and subject. Email alone is insufficient because more than one legacy identity can share an address; ambiguous matches stop for review.",
        "The initial reviewed batch created and independently verified 3,523 approved member records for logins already imported into the destination pool. Two source accounts remained held for review. Approval was an explicit decision for that cohort, and the import granted no administrator permissions. It retained available identity and name data; reconstructing full historical profiles was separate work."
      ] },
      { id: "migration", title: "Applying a reviewed import", paragraphs: [
        "I built an operator tool that checks the destination AWS account, Cognito pool, and member table against a reviewed plan. A preview identifies records ready to apply, records already present, and conflicts requiring attention. The approved plan is bound to a checksum before writes begin.",
        "Each member’s records are created together in a conditional DynamoDB transaction, including the identity mapping, membership-status record, audit entry, and migration receipt. Existing records cannot be silently overwritten. After an interruption, the tool verifies completed records before continuing, and separate read-only checks establish what was actually applied.",
        "Later recovery preserves the source member’s approval and restrictions. A pending or blocked legacy account does not become an approved member merely because its login can be imported. Existing destination profiles and newer membership decisions take precedence over the archive."
      ] },
      { id: "passwords", title: "Returning users to their accounts", paragraphs: [
        "Passwords were not copied into the new system. Imported users who require a reset receive guidance after attempting sign-in, request a recovery code, set a new password, and then sign in normally. Resetting the password does not itself create a session or change membership approval.",
        "Hosted testing before the public-domain cutover included a real member completing that journey, launching the existing Tour It application, and opening their saved tours. The website’s tool handoff checks current approved-member access. The separate Tour It rebuild has its own integration work ahead."
      ] },
      { id: "dns", title: "Moving the domain to AWS", paragraphs: [
        "I prepared Route 53 with the website destinations and preserved the existing mail, verification, and unrelated service records. Amplify’s custom-domain association and certificate validation were checked before changing the registrar’s nameserver delegation.",
        "The cutover changed the application’s configured origin to the final public hostname and rebuilt the reviewed source. Verification checked actual registry delegation and DNS answers, HTTPS, public pages and assets, protected API responses, and the root-to-www redirect with its path and query intact.",
        "Legacy-service retirement was kept separate from the DNS switch so remaining consumers and recovery data could be reviewed before shutdown. The new hosting arrangement handles the website and redirect on AWS."
      ] },
      { id: "recovery", title: "Supporting users beyond the first batch", paragraphs: [
        "I also built a member-recovery archive and support tool for legacy users missing from the new system. The archive preserves full Strapi profiles, original Cognito identity evidence, referenced profile-picture files, and checksums. Staff can use it without restarting the old Strapi service.",
        "The workflow checks the archive’s integrity and the current destination records, previews the proposed changes, and records unfinished operations for reconciliation. Its purpose is member recovery; a full CMS/database backup and restore remains separate. Preserved preferences and media can also require adaptation where the new website differs from the old one."
      ] },
      { id: "verification", title: "What the release established", paragraphs: [
        "The migration has local server, component, content, and desktop/mobile browser verification, plus the recorded live member-recovery journey and AWS hostname checks. The website deployment and public DNS cutover completed in October 2026.",
        "Those checks cover specific accounts and workflows. The cutover record leaves final-domain account and form-delivery acceptance, and legacy-service retirement, as separate follow-up work. The initial member batch and the recovery archive do not establish that every legacy user has signed in successfully."
      ] }
    ]
  },
  {
    slug: "oli-torus", name: "OLI Torus", category: "Open-source contributions",
    summary: "Authoring features, responsive components, and accessibility fixes in an online learning platform.",
    intro: "I contribute to OLI Torus, an open-source learning platform. My work includes authoring tools and the behavior of interactive content: what happens when a screen gets smaller, an embedded activity receives focus, or a screen reader encounters a popup.",
    role: "Contributor to the existing Torus codebase, working across React and Phoenix components.",
    status: "Ongoing contributions", statusNote: "Individual fixes have their own review and verification history.",
    technologies: ["TypeScript", "React", "Elixir", "Phoenix", "Accessibility"], featured: false, visual: "torus",
    links: [{ label: "Torus repository", href: "https://github.com/Simon-Initiative/oli-torus" }, { label: "My contributions", href: "https://github.com/Simon-Initiative/oli-torus/commits?author=kjsegovi" }],
    sections: [
      { id: "work", title: "Authoring and interaction", paragraphs: ["My contributions include Simple Author flashcard capabilities, responsive authoring behavior, adaptive iframe accessibility, and media semantics. The work often spans both the author’s editing experience and the learner’s interaction with the finished activity.", "I have also worked on a Google Slides automation workflow that maps structured slides into adaptive screens, components, rules, and media. The separate course-import work is described in Course Authoring Systems."] },
      { id: "accessibility", title: "Checking the actual interaction", paragraphs: ["A useful accessibility fix has to preserve the interaction around it: keyboard flow, the first focused element, focus on return, and controls inside a component. A correct-looking accessibility tree is one piece of evidence. Actual screen-reader speech needs its own check.", "For that reason, I describe automated checks and manual assistive-technology results separately. A popup reading change, for example, needs to be assessed by what the user hears as well as its ARIA attributes."] }
    ]
  },
  {
    slug: "embedded-learning", name: "Embedded Learning", category: "Learning software / C & ESP32",
    summary: "A local learning app for C and ESP32 work, with a skill map, guided practice, independent checks, and scheduled review.",
    intro: "Embedded Learning is the application I built around my C and ESP32 study. It keeps lessons, practice, submitted work, and review history in one place. The first unit runs on a Mac without hardware, so the learner can work on C before adding a board and toolchain.",
    role: "I developed the application, its initial curriculum, the progression rules, and the tutor integration.",
    status: "Local application",
    statusNote: "Unit 1 is implemented. Later units are a roadmap; hardware integration and educational effectiveness still need evaluation.",
    technologies: ["React", "TypeScript", "Express", "SQLite", "C"], featured: false, visual: "embedded", links: [],
    sections: [
      { id: "architecture", title: "The learning record", paragraphs: [
        "A React interface talks to a local Express service. SQLite stores drafts, submissions, assistance, feedback, and assessment events. Progress is derived from those records, which makes it possible to inspect how a skill received its current status.",
        "The learner writes and runs C in an external editor and terminal. The app accepts code, output, and an explanation as submitted evidence. It does not execute learner code or install the ESP32 toolchain."
      ] },
      { id: "progression", title: "When a skill counts", paragraphs: [
        "Skills have prerequisites. The learner begins with a diagnostic and then moves through guided work, independent practice, transfer problems, and review. Opening a solution or using a hint records assistance.",
        "Independent mastery requires two distinct unassisted checks, including a transfer task. Repeating a problem after seeing its answer cannot supply that evidence. When the reasoning is unclear, the assessment can request an explanation rather than award a pass.",
        "Reviews return after 2, 7, and 21 days. A failed review adds targeted practice while retaining the earlier evidence. Two conceptual failures lead to a different explanation and smaller practice. These are explicit teaching rules, not a statistically calibrated model of learning."
      ] },
      { id: "tutor", title: "The tutor’s job", paragraphs: [
        "The tutor connects through the local Codex app-server process using subscription authentication. It can explain material, generate practice, and assess responses against a rubric. The application’s rules decide whether the resulting evidence meets a progression requirement.",
        "Tutor feedback streams into the interface. A cancelled request can be followed by another session, and saved work remains available when tutoring is disconnected. The tutor has no shell or browser tools in this application."
      ] },
      { id: "example", title: "From a hint to a fresh check", paragraphs: [
        "Suppose a learner needs help with a C condition. They can ask for a hint and finish the problem, but that attempt stays marked as assisted. To demonstrate the skill independently, they need a fresh problem. A later transfer check asks them to use the same idea in a different situation.",
        "The history keeps both attempts. Help remains useful without making the mastery record misleading."
      ] },
      { id: "verification", title: "What the checks cover", paragraphs: [
        "The local verification record covers progression rules, persistence, cancellation, streaming feedback, browser workflows, and compiled C reference programs. The tested screens had no reported automated WCAG A/AA violations in the recorded run.",
        "Those checks establish application behavior in the tested cases. They do not establish teaching effectiveness, consistently correct model feedback, or manual screen-reader acceptance."
      ] },
      { id: "next", title: "Taking it to the bench", paragraphs: [
        "The first unit uses host C programs and synthetic inputs. Board flashing, serial collection, and physical hardware lessons are later work. The immediate questions are whether the explanations help, whether the independent checks are well judged, and how the workload feels during actual study."
      ] }
    ]
  },
  {
    slug: "support-analytics", name: "Support Ticket Analytics", category: "Data pipelines & evaluation",
    summary: "A repeatable support-data pipeline with source reconciliation, resumable processing, and an evaluated classifier that was held back.",
    intro: "This project extracts and organizes support-ticket data for analysis. It preserves the link between a result and its source, handles interrupted processing, and separates data preparation from the question of whether a classifier is good enough to use.",
    role: "Pipeline development and model evaluation.", status: "Private project", statusNote: "The classifier did not meet its acceptance criteria and was not promoted.",
    technologies: ["Python", "Typer", "httpx", "Pydantic", "SQLite"], featured: false, visual: "analytics", links: [],
    sections: [
      { id: "pipeline", title: "Keeping track of the source", paragraphs: ["Extraction is read-only, with isolated local stores and resumable processing. Source reconciliation checks whether the local population matches the intended ticket set. Message-direction resolution is a separate data preparation step.", "Versioned outputs and source references make a result inspectable later. These checks matter before trying to infer patterns from the tickets."] },
      { id: "evaluation", title: "A classifier I held back", paragraphs: ["The recorded classifier evaluation reported 0.460 accuracy and 0.436 macro F1. Those results did not meet the project’s acceptance criteria, so the classifier was not promoted.", "The extraction and reconciliation work was still useful. Its completion did not make the model’s predictions dependable enough to publish as conclusions."] }
    ]
  }
];
export const featuredProjects = projects.filter((project) => project.featured);
export const highlightedProjects = projects.filter((project) => project.highlight);
export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
