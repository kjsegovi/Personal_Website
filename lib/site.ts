import type { Metadata } from "next";
import { notebookEnabled } from "@/lib/features.mjs";

export const site = {
  name: "Kevin Segovia",
  origin: "https://segkev.com",
  description: notebookEnabled ? "Kevin Segovia’s work in educational software and AWS infrastructure, with projects and notes on experimental AI, embedded systems, and home servers." : "Kevin Segovia’s work in educational software and AWS infrastructure, with projects in experimental AI, embedded systems, and home servers.",
  email: "kjsegovi@icloud.com",
  github: "https://github.com/kjsegovi",
  linkedin: "https://www.linkedin.com/in/kevin-segovia-/",
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: {
      title: `${title} | Kevin Segovia`, description, url: `${site.origin}${path}`,
      type: "website", siteName: site.name,
      images: [{ url: `${site.origin}/og.png`, width: 1200, height: 630, alt: "Kevin Segovia — Projects & experiments" }],
    },
    twitter: { card: "summary_large_image", title: `${title} | Kevin Segovia`, description, images: [`${site.origin}/og.png`] },
  };
}
