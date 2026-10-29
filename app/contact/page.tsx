import { pageMetadata, site } from "@/lib/site";
export const metadata = pageMetadata("Contact", "Contact Kevin Segovia by email, or find his work on GitHub and LinkedIn.", "/contact/");
export default function Contact() {
  return <div className="shell page section contact-page"><header className="page-heading"><p className="eyebrow">Contact</p><h1>Get in touch.</h1><p>If you have a question about a project or want to talk about working together, email is the easiest way to reach me.</p></header>
    <div className="contact-list"><a href={`mailto:${site.email}`}><span className="eyebrow">Email</span><strong>{site.email}</strong><span aria-hidden="true">↗</span></a><a href={site.github}><span className="eyebrow">Code</span><strong>GitHub</strong><span aria-hidden="true">↗</span></a><a href={site.linkedin}><span className="eyebrow">Background</span><strong>LinkedIn</strong><span aria-hidden="true">↗</span></a></div><p className="location-note">Based in Arizona.</p>
  </div>;
}
