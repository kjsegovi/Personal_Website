/* eslint-disable @next/next/no-img-element */

type ExternalLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type ProjectMetric = {
  value: string;
  label: string;
};

type Project = {
  slug: string;
  name: string;
  category: string;
  status?: string;
  summary: string;
  outcome: string;
  technologies: string[];
  highlights: string[];
  links: ExternalLink[];
  metrics?: ProjectMetric[];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
};

type Experience = {
  role: string;
  organization: string;
  period: string;
  focus: string;
};

type Credential = {
  name: string;
  issuer: string;
  date: string;
  kind: "Degree" | "Certification";
};

const projects: Project[] = [
  {
    slug: "oli-torus",
    name: "OLI Torus",
    category: "Accessible product engineering",
    summary:
      "Production open-source product work spanning authoring tools, accessibility, responsive interactive components, and content automation for an online learning platform.",
    outcome:
      "Shipped authoring and accessibility improvements across flashcards, adaptive content, embedded media, responsive layouts, and course-creation workflows.",
    technologies: [
      "TypeScript",
      "React",
      "Phoenix",
      "Elixir",
      "Accessibility",
      "Automation",
      "Open source",
    ],
    highlights: [
      "Built Simple Author flashcard capabilities and resilient authoring behavior.",
      "Improved adaptive iframe accessibility and media ARIA semantics.",
      "Improved responsive layouts, preserved editor state, and fixed authoring reliability issues.",
      "Developed an Advanced Author automation workflow that imports structured Google Slides into adaptive screens, components, rules, media, and validation warnings, combining deterministic parsing with a guarded AI fallback.",
    ],
    links: [
      {
        label: "View repository",
        href: "https://github.com/Simon-Initiative/oli-torus",
        ariaLabel: "View the OLI Torus repository on GitHub",
      },
      {
        label: "Contribution history",
        href: "https://github.com/Simon-Initiative/oli-torus/commits?author=kjsegovi",
        ariaLabel: "View Kevin Segovia's public OLI Torus contribution history",
      },
      {
        label: "Author automation",
        href: "https://github.com/kjsegovi/oli-torus-simple-author-ai/commit/8d174158f82c039e523c1906bbd2f79e104d8439",
        ariaLabel:
          "View Kevin Segovia's Advanced Author Google Slides automation work",
      },
    ],
  },
  {
    slug: "support-analytics",
    name: "Support Ticket Analytics",
    category: "Data systems & model evaluation",
    summary:
      "A Python pipeline for extracting, classifying, and evaluating support tickets while keeping each result traceable to its source.",
    outcome:
      "Reconciled the ticket IDs and identified message direction. The classifier fell short of the evaluation thresholds and was not put into use.",
    technologies: ["Python", "Typer", "httpx", "Pydantic", "SQLite"],
    highlights: [
      "Read-only extraction with PII-aware handling and isolated local data stores.",
      "Resumable processing, versioned results, explicit provenance, and human-label evaluation.",
      "Kept classifier results out of published analysis when evaluation scores were too low.",
    ],
    metrics: [
      { value: "5,962", label: "Source and local IDs reconciled" },
      { value: "5,878", label: "Eligible closed tickets" },
      { value: "100%", label: "Direction resolution across 16,573 messages" },
      { value: "0.460 / 0.436", label: "Accuracy / macro F1 — not promoted" },
    ],
    links: [],
  },
  {
    slug: "animal-cell",
    name: "Into the Animal Cell",
    category: "Interactive learning experience",
    summary:
      "An interactive biology experience migrated from Unity to a web-native React, TypeScript, and Three.js architecture.",
    outcome:
      "Made the educational simulation easier to access, extend, and deliver through the browser while preserving its exploratory 3D experience.",
    technologies: ["React", "TypeScript", "Three.js", "3D interaction"],
    highlights: [
      "Translated a Unity interaction model into reusable web components.",
      "Built navigable 3D cell structures and educational interaction patterns.",
      "Created a foundation for future accessibility and content expansion.",
    ],
    links: [
      {
        label: "View repository",
        href: "https://github.com/kjsegovi/into-the-animal-cell",
        ariaLabel: "View Into the Animal Cell on GitHub",
      },
    ],
  },
  {
    slug: "macchat",
    name: "MacChatLMBackend",
    category: "Local-first AI infrastructure",
    status: "In development",
    summary:
      "A C++ and Drogon service for routing conversations across local hardware and multiple language-model providers.",
    outcome:
      "Still in development: model routing and local inference, with conversation storage being built around PostgreSQL.",
    technologies: ["C++", "Drogon", "PostgreSQL", "LLM routing", "Local inference"],
    highlights: [
      "Multi-provider routing with automatic and manual model selection.",
      "Local hardware support for private, low-latency inference workflows.",
      "PostgreSQL-backed conversation and message architecture in development.",
    ],
    links: [
      {
        label: "View repository",
        href: "https://github.com/kjsegovi/MacChatLMBackend",
        ariaLabel: "View MacChatLMBackend on GitHub",
      },
    ],
  },
];

const experience: Experience[] = [
  {
    role: "Application Developer II",
    organization: "Arizona State University",
    period: "February 2024 — Present",
    focus:
      "Accessible authoring products, backend services, data pipelines, and applied AI infrastructure.",
  },
  {
    role: "Quality Assurance Engineer",
    organization: "Arizona State University",
    period: "October 2021 — February 2024",
    focus:
      "Product quality, test strategy, accessibility validation, and reliable release workflows.",
  },
  {
    role: "Technician I",
    organization: "Kyterion",
    period: "May 2020 — November 2020",
    focus:
      "Technical operations, systems troubleshooting, and dependable customer support.",
  },
];

const credentials: Credential[] = [
  {
    name: "Master of Computer Science",
    issuer: "Arizona State University",
    date: "December 2025",
    kind: "Degree",
  },
  {
    name: "Bachelor of Science in Computer Science",
    issuer: "Arizona State University",
    date: "December 2023",
    kind: "Degree",
  },
  {
    name: "AWS Educate Machine Learning Foundations",
    issuer: "Amazon Web Services",
    date: "July 2025",
    kind: "Certification",
  },
  {
    name: "Introducing Generative AI with AWS",
    issuer: "Udacity",
    date: "June 2025",
    kind: "Certification",
  },
  {
    name: "Introduction to Computer Vision and Image Processing",
    issuer: "IBM",
    date: "May 2024",
    kind: "Certification",
  },
  {
    name: "Introduction to Deep Learning & Neural Networks with Keras",
    issuer: "IBM",
    date: "March 2024",
    kind: "Certification",
  },
  {
    name: "Machine Learning with Python",
    issuer: "Coursera",
    date: "March 2024",
    kind: "Certification",
  },
  {
    name: "Tools for Data Science",
    issuer: "IBM",
    date: "March 2024",
    kind: "Certification",
  },
  {
    name: "Introduction to Neural Networks",
    issuer: "Coursera",
    date: "Date not publicly listed",
    kind: "Certification",
  },
  {
    name: "Full-Stack Development",
    issuer: "Codecademy",
    date: "Date not publicly listed",
    kind: "Certification",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="arrow-icon" viewBox="0 0 16 16" fill="none">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.imageSrc) {
    return (
      <div className="project-visual project-visual-image">
        <img
          src={project.imageSrc}
          alt={project.imageAlt ?? ""}
          style={{ objectPosition: project.imagePosition ?? "center" }}
        />
      </div>
    );
  }

  return null;
}

export default function Home() {
  const degrees = credentials.filter((credential) => credential.kind === "Degree");
  const certifications = credentials.filter(
    (credential) => credential.kind === "Certification",
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="shell nav-shell">
          <a className="monogram" href="#top" aria-label="Kevin Segovia, home">
            KS<span>.</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#credentials">Credentials</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="shell hero-shell">
            <div className="hero-copy">
              <p className="eyebrow">
                Application Developer II <span>•</span> Tempe, Arizona
              </p>
              <h1 id="hero-title">Kevin Segovia</h1>
              <p className="biography">
                I&apos;m an Application Developer II at Arizona State University.
                I build learning tools and work on the services behind them,
                with a focus on accessibility and authoring.
              </p>
              <p className="biography">
                My recent work includes contributions to OLI Torus, a browser-based
                biology simulation, and a support analytics pipeline. I also
                experiment with local language models and C++ backends.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  View my work
                  <ArrowIcon />
                </a>
                <a className="button button-ghost" href="mailto:kjsegovi@icloud.com">
                  Email me
                </a>
              </div>
            </div>

            <figure className="portrait-frame">
              <img
                src="/kevin-segovia-portrait.png"
                alt="Kevin Segovia smiling in a white shirt."
                width={1122}
                height={1402}
                fetchPriority="high"
              />
            </figure>
          </div>


        </section>

        <section className="work-section section" id="work" aria-labelledby="work-title">
          <div className="shell section-heading">
            <p className="section-kicker">Selected work</p>
            <div>
              <h2 id="work-title">Projects &amp; contributions</h2>
              <p>
                A selection of my work on learning platforms, data processing,
                and local AI tools. Each entry describes what I worked on and
                where the project stands.
              </p>
            </div>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project" key={project.slug}>
                <div className="project-rail">
                  <p>{project.category}</p>
                </div>
                <div className="project-body">
                  <div className="project-title-row">
                    <div>
                      {project.status && <span className="status">{project.status}</span>}
                      <h3>{project.name}</h3>
                    </div>
                    <p className="project-outcome">{project.outcome}</p>
                  </div>

                  <ProjectVisual project={project} />

                  <div className="project-details">
                    <p className="project-summary">{project.summary}</p>
                    <ul className="project-highlights">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  {project.metrics && (
                    <div className="metric-grid" aria-label={`${project.name} results`}>
                      {project.metrics.map((metric) => (
                        <div className="metric" key={metric.label}>
                          <strong>{metric.value}</strong>
                          <span>{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="project-footer">
                    <ul className="technology-list" aria-label="Technologies used">
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                    {project.links.length > 0 ? (
                      <div className="project-links">
                        {project.links.map((link) => (
                          <a
                            href={link.href}
                            key={link.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={link.ariaLabel}
                          >
                            {link.label}
                            <ArrowIcon />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="private-note">
                        Private codebase
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="experience-section section"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="shell two-column-heading">
            <div>
              <p className="section-kicker section-kicker-dark">
                Professional history
              </p>
              <h2 id="experience-title">Experience</h2>
            </div>
            <p>
              I moved from quality assurance into application development at
              ASU, working on educational software in both roles.
            </p>
          </div>
          <div className="shell timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={`${item.role}-${item.period}`}>
                <div>
                  <p className="timeline-period">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="timeline-organization">{item.organization}</p>
                </div>
                <p className="timeline-focus">{item.focus}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="credentials-section section"
          id="credentials"
          aria-labelledby="credentials-title"
        >
          <div className="shell section-heading">
            <p className="section-kicker">Education &amp; continued learning</p>
            <div>
              <h2 id="credentials-title">Credentials</h2>
              <p>
                Computer science degrees from ASU and coursework in
                machine learning, data science, and web development.
              </p>
            </div>
          </div>

          <div className="shell credential-layout">
            <div className="degree-list">
              <h3>Degrees</h3>
              {degrees.map((credential) => (
                <article key={credential.name}>
                  <span>{credential.date}</span>
                  <h4>{credential.name}</h4>
                  <p>{credential.issuer}</p>
                </article>
              ))}
            </div>
            <div className="certification-list">
              <h3>Certifications</h3>
              <div className="certification-grid">
                {certifications.map((credential) => (
                  <article key={`${credential.name}-${credential.issuer}`}>
                    <span>{credential.date}</span>
                    <h4>{credential.name}</h4>
                    <p>{credential.issuer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="shell contact-shell">
            <div>
              <p className="section-kicker section-kicker-dark">Get in touch</p>
              <h2 id="contact-title">
                Contact
              </h2>
            </div>
            <div className="contact-actions">
              <a className="contact-email" href="mailto:kjsegovi@icloud.com">
                <span>Email</span>
                kjsegovi@icloud.com
                <ArrowIcon />
              </a>
              <a
                className="profile-link"
                href="https://github.com/kjsegovi"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/github-avatar.png" alt="" width="44" height="44" />
                <span>
                  <small>Code &amp; open-source work</small>
                  GitHub
                </span>
                <ArrowIcon />
              </a>
              <a
                className="profile-link"
                href="https://www.linkedin.com/in/kevin-segovia-/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="profile-mark" aria-hidden="true">
                  in
                </span>
                <span>
                  <small>Experience &amp; credentials</small>
                  LinkedIn
                </span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell footer-shell">
          <p>© {new Date().getFullYear()} Kevin Segovia</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
