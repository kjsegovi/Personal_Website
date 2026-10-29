import type { Metadata, Viewport } from "next";
import { Navigation } from "@/components/navigation";
import { site } from "@/lib/site";
import { notebookEnabled } from "@/lib/features.mjs";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: { default: notebookEnabled ? "Kevin Segovia | Projects & Notebook" : "Kevin Segovia | Projects", template: "%s | Kevin Segovia" },
  description: site.description,
  authors: [{ name: site.name }], creator: site.name,
  icons: { icon: "/favicon.svg" },
  ...(notebookEnabled ? { alternates: { types: { "application/rss+xml": "/feed.xml" } } } : {}),
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#14213d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="site-header"><div className="shell nav-shell">
      <a className="monogram" href="/" aria-label="Kevin Segovia, home">KS<span>.</span></a>
      <Navigation />
    </div></header>
    <main id="main-content" tabIndex={-1}>{children}</main>
    <footer className="site-footer"><div className="shell footer-shell">
      <a href="/" className="footer-name">Kevin Segovia<span> / Arizona</span></a>
      <div><a href={site.github}>GitHub</a><a href={site.linkedin}>LinkedIn</a><a href={`mailto:${site.email}`}>Email</a>{notebookEnabled && <a href="/feed.xml">RSS</a>}</div>
      <p>© {new Date().getFullYear()} Kevin Segovia</p>
    </div></footer>
  </body></html>;
}
