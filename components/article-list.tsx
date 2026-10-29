import type { readArticles } from "@/lib/notebook.mjs";
export function ArticleList({ articles }: { articles: ReturnType<typeof readArticles> }) {
  return <div className="article-list">{articles.map((article) => <article key={article.slug}>
    <p className="eyebrow">{article.state === "draft" ? "Private draft" : article.publishedAt} · {article.topics.join(" / ")}</p>
    <h2><a href={`/notebook/${article.slug}/`}>{article.title}<span aria-hidden="true"> ↗</span></a></h2><p>{article.summary}</p>
  </article>)}</div>;
}
