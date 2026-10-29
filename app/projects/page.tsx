import { projects, featuredProjects, highlightedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
import { ProjectCard, ProjectHighlight } from "@/components/project-card";
export const metadata = pageMetadata("Projects", "Course authoring, HabFly, Embedded Learning, Tour It, the Infiniscope migration, and AWS infrastructure work by Kevin Segovia.", "/projects/");
export default function Projects() {
  return <div className="shell page section">
    <header className="page-heading"><p className="eyebrow">Projects</p><h1>Projects</h1><p>My work includes course authoring tools, AWS infrastructure, and contributions to educational software. I also build learning applications and run experiments with machine learning.</p></header>
    <section aria-labelledby="featured-heading"><h2 id="featured-heading" className="group-heading">Featured projects</h2><div className="featured-grid">{featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></section>
    <section className="professional-work" aria-labelledby="aws-work-heading"><h2 id="aws-work-heading" className="group-heading">AWS work</h2>{highlightedProjects.map((project) => <ProjectHighlight key={project.slug} project={project} />)}</section>
    <section className="other-projects" aria-labelledby="other-heading"><h2 id="other-heading" className="group-heading">More work</h2><div className="secondary-grid">{projects.filter((project) => !project.featured && !project.highlight).map((project, index) => <ProjectCard key={project.slug} project={project} index={index + featuredProjects.length} compact />)}</div></section>
  </div>;
}
