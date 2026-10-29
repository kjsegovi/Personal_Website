import { readArticles } from "@/lib/notebook.mjs";
import { NotebookArticle, notebookPageMetadata } from "@/components/notebook-article";

export function generateStaticParams() { return readArticles().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return notebookPageMetadata(slug);
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NotebookArticle slug={slug} />;
}
