import { notFound } from "next/navigation";
import { draftsEnabled, readArticles, renderArticle } from "@/lib/notebook.mjs";
import { getProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
import { notebookEnabled } from "@/lib/features.mjs";

function findArticle(slug: string) {
  return readArticles({ includeDrafts: draftsEnabled() }).find((article) => article.slug === slug);
}

export function notebookPageMetadata(slug: string) {
  const article = findArticle(slug);
  if (!article) return {};
  const metadata = pageMetadata(article.title, article.summary, `/notebook/${slug}/`);
  return { ...metadata,
    robots: !notebookEnabled || article.state === "draft" ? { index: false, follow: false } : undefined,
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: article.publishedAt ?? undefined, modifiedTime: article.updatedAt ?? undefined },
  };
}

export function NotebookArticle({ slug }: { slug: string }) {
  const article = findArticle(slug);
  if (!article) notFound();
  const { html, headings } = renderArticle(article.body);
  const hasContents = headings.length > 1;
  const project = article.project ? getProject(article.project) : undefined;
  return <article className={`shell page section notebook-article${hasContents ? " notebook-article-with-contents" : ""}`}>
    <div className="article-backlinks"><a href="/notebook/" className="back-link">← Notebook</a>{project && <a href={`/projects/${project.slug}/`}>Project overview: {project.name} <span aria-hidden="true">↗</span></a>}</div>
    {article.state === "draft" && <aside className="draft-banner"><strong>Unpublished draft · For Kevin’s review</strong><p>This article is available only in local draft preview.</p></aside>}
    <header className="article-heading" id="article-top" tabIndex={-1}><p className="eyebrow">{article.topics.join(" / ")}</p><h1>{article.title}</h1><p className="lead">{article.summary}</p>{article.publishedAt && <p className="article-date">Published <time dateTime={article.publishedAt}>{article.publishedAt}</time>{article.updatedAt && <> · Updated <time dateTime={article.updatedAt}>{article.updatedAt}</time></>}</p>}</header>
    <div className="article-layout">
      {hasContents && <nav className="article-contents" aria-label="In this article">
        <p className="eyebrow">In this article</p>
        <ol>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol>
      </nav>}
      <div className="article-reading">
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        <nav className="article-end" aria-label="Article navigation"><a className="text-link" href="/notebook/">← All notebook entries</a><a href="#article-top">Back to top ↑</a></nav>
      </div>
    </div>
  </article>;
}
