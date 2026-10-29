"use client";
import { usePathname } from "next/navigation";
import { notebookEnabled } from "@/lib/features.mjs";

const items = [["/", "Home"], ["/projects/", "Projects"], ...(notebookEnabled ? [["/notebook/", "Notebook"]] : []), ["/about/", "About"], ["/contact/", "Contact"]];

export function Navigation() {
  const pathname = usePathname();
  return <nav aria-label="Primary navigation">{items.map(([href, label]) => {
    const active = href === "/" ? pathname === "/" : pathname?.startsWith(href.replace(/\/$/, ""));
    return <a href={href} key={href} aria-current={active ? "page" : undefined}>{label}</a>;
  })}</nav>;
}
