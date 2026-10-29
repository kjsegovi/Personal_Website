import type { Project } from "@/lib/projects";
import { ProjectThumbnail } from "./project-visual";

export function Arrow() { return <span aria-hidden="true">↗</span>; }
export function ProjectHighlight({ project }: { project: Project }) {
  if (!project.highlight) return null;
  return <article className="project-highlight">
    <div className="highlight-result"><span>{project.highlight.value}</span><p>{project.highlight.label}</p></div>
    <div className="highlight-copy"><p className="eyebrow">{project.category}</p><h3><a href={`/projects/${project.slug}/`}>{project.name} <Arrow /></a></h3><p>{project.summary}</p>
      <ul className="tag-list" aria-label={`${project.name} technologies`}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
    </div>
  </article>;
}
export function ProjectCard({ project, index, compact = false }: { project: Project; index: number; compact?: boolean }) {
  return <article className={`project-card ${compact ? "project-card-small" : ""}`}>
    {!compact && <a href={`/projects/${project.slug}/`} className="visual-link" tabIndex={-1} aria-hidden="true"><ProjectThumbnail project={project} /></a>}
    <div className="card-copy"><p className="card-category"><span aria-hidden="true">{String(index + 1).padStart(2, "0")} / </span>{project.category}</p>
      <h3><a href={`/projects/${project.slug}/`}>{project.name}<Arrow /></a></h3>
      <p>{project.summary}</p>
      <ul className="tag-list" aria-label={`${project.name} technologies`}>{project.technologies.slice(0, compact ? 3 : 4).map((technology) => <li key={technology}>{technology}</li>)}</ul>
    </div>
  </article>;
}
