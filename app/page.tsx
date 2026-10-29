/* eslint-disable @next/next/no-img-element */
import { featuredProjects, highlightedProjects } from "@/lib/projects";
import { readArticles } from "@/lib/notebook.mjs";
import { notebookEnabled } from "@/lib/features.mjs";
import { pageMetadata, site } from "@/lib/site";
import { ProjectCard, ProjectHighlight, Arrow } from "@/components/project-card";
import { ArticleList } from "@/components/article-list";

export const metadata = pageMetadata(notebookEnabled ? "Projects & Notebook" : "Projects", site.description, "/");
export default function Home() {
  const recentArticles = notebookEnabled ? readArticles().slice(0, 3) : [];
  return <>
    <section className="hero"><div className="shell hero-shell">
      <div className="hero-copy"><p className="eyebrow">Software developer / Arizona</p>
        <h1>Kevin Segovia<span className="orange">.</span></h1>
        <p className="headline">Learning tools, experimental AI,<br className="desktop-break" /> and work at the bench.</p>
        <p className="hero-description">I’m an Application Developer II at Arizona State University. My work includes educational software, accessibility, AWS infrastructure, and database migrations. Outside work, I’m studying C and embedded electronics.</p>
        <div className="hero-actions"><a className="button" href="/projects/">See my projects <Arrow /></a><a className="text-link light-link" href="/about/">A little about me <span aria-hidden="true">→</span></a></div>
      </div>
      <figure className="portrait-frame"><img src="/kevin-segovia-portrait.png" alt="Kevin Segovia smiling in a white shirt." width={1122} height={1402} fetchPriority="high" /><figcaption>Kevin Segovia <span>Arizona</span></figcaption></figure>
    </div></section>
    <section className="shell section" aria-labelledby="selected-work"><div className="section-heading"><div><p className="eyebrow">Software & infrastructure</p><h2 id="selected-work">Selected work</h2></div><a className="text-link" href="/projects/">All projects <span aria-hidden="true">→</span></a></div>
      <div className="featured-grid">{featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      {highlightedProjects.map((project) => <ProjectHighlight key={project.slug} project={project} />)}
    </section>
    {recentArticles.length > 0 && <section className="shell section notebook-home" aria-labelledby="recent-notes"><div className="section-heading"><div><p className="eyebrow">From the notebook</p><h2 id="recent-notes">Recent notes</h2></div><a className="text-link" href="/notebook/">All entries <span aria-hidden="true">→</span></a></div><ArticleList articles={recentArticles} /></section>}
    <section className="about-strip"><div className="shell about-strip-grid"><p className="eyebrow">Away from the day job</p><div><h2>What I’m learning</h2><p>I’m learning embedded systems and electronics, working with 3D printing, and running a home lab.{notebookEnabled && " The notebook is where I’ll write about the builds and the questions that come up along the way."}</p><a className="text-link" href="/about/">More about me <span aria-hidden="true">→</span></a></div><div className="about-strip-contact"><p>Have a question about the work?</p><a className="text-link" href={`mailto:${site.email}`}>Send me an email <Arrow /></a></div></div></section>
  </>;
}
