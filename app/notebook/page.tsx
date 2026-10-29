import { readArticles, draftsEnabled } from "@/lib/notebook.mjs";
import { pageMetadata } from "@/lib/site";
import { ArticleList } from "@/components/article-list";
import { notebookEnabled } from "@/lib/features.mjs";
export const metadata = {
  ...pageMetadata("Notebook", "Experiments with machine learning, embedded electronics, and home servers.", "/notebook/"),
  ...(!notebookEnabled ? { robots: { index: false, follow: false } } : {}),
};
export default function Notebook() {
  const preview = draftsEnabled();
  const articles = readArticles({ includeDrafts: preview });
  return <div className="shell page section notebook-page">
    <header className="page-heading"><p className="eyebrow">Notebook</p><h1>Notebook</h1><p>Experiments with machine learning, embedded electronics, and home servers. How I built things, what I measured, and what still needs work.</p></header>
    {preview && <aside className="draft-banner"><strong>Local draft review</strong><p>These entries are unpublished. Production builds exclude drafts.</p></aside>}
    {articles.length ? <ArticleList articles={articles} /> : <div className="notebook-intro"><h2>What belongs here</h2><p>Methods, results, and notes from individual builds. You can read about the work so far in <a href="/projects/">Projects</a>.</p></div>}
  </div>;
}
