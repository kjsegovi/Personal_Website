import { notFound } from "next/navigation";
import { Fragment } from "react";
import { projects, getProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
import { ProjectDiagram } from "@/components/project-visual";
import { AwsConsolidationDiagram, AwsMigrationDiagram } from "@/components/aws-diagrams";
import { readArticles, draftsEnabled } from "@/lib/notebook.mjs";
import { ArticleList } from "@/components/article-list";
import { notebookEnabled } from "@/lib/features.mjs";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? pageMetadata(project.name, project.summary, `/projects/${slug}/`) : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const preview = draftsEnabled();
  const articles = notebookEnabled || preview ? readArticles({ includeDrafts: preview }).filter((article) => article.project === slug) : [];
  return <article className={`shell page case-study section${project.visual === "aws" ? " case-study-aws" : ""}`}>
    <a className="back-link" href="/projects/">← All projects</a>
    <header className="case-heading"><p className="eyebrow">{project.category}</p><h1>{project.name}</h1><p className="lead">{project.intro}</p>
      <ul className="tag-list" aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
    </header>
    {project.overviewNote ? <p className="case-overview-note">{project.overviewNote}</p> : <dl className="project-facts"><div><dt>My part</dt><dd>{project.role}</dd></div><div><dt>{project.status}</dt><dd>{project.statusNote}</dd></div></dl>}
    <ProjectDiagram kind={project.visual} />
    <div className="case-layout">
      <nav className="case-contents" aria-label="On this page"><p className="eyebrow">On this page</p><ol>{project.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
      <div className="prose">{project.sections.map((section) => <Fragment key={section.id}>
        {project.visual === "aws" && section.id === "databases" && <AwsMigrationDiagram />}
        <section id={section.id} className={section.id === "costs" && project.visual === "aws" ? "cost-section" : undefined} aria-labelledby={`heading-${section.id}`}><div><h2 id={`heading-${section.id}`}>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}</div>{section.id === "costs" && project.visual === "aws" && <AwsConsolidationDiagram />}</section>
      </Fragment>)}
        {project.links.length > 0 && <section aria-labelledby="project-links"><h2 id="project-links">Links</h2><ul className="project-links">{project.links.map((link) => <li key={link.href}><a href={link.href}>{link.label} <span aria-hidden="true">↗</span></a></li>)}</ul></section>}
        {project.slug === "oli-torus" && <p className="related-link">Related: <a href="/projects/course-authoring-systems/">Course Authoring Systems</a></p>}
      </div>
    </div>
    {articles.length > 0 && <section className="project-notebook" aria-labelledby="project-notebook"><p className="eyebrow" id="project-notebook">From the notebook</p><ArticleList articles={articles} /></section>}
    <div className="case-end"><a className="text-link" href="/projects/">← Back to projects</a><a className="text-link" href="/contact/">Get in touch <span aria-hidden="true">↗</span></a></div>
  </article>;
}
