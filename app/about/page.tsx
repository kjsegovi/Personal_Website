/* eslint-disable @next/next/no-img-element */
import { pageMetadata } from "@/lib/site";
import { notebookEnabled } from "@/lib/features.mjs";
export const metadata = pageMetadata("About", "Kevin Segovia, application developer at Arizona State University. Work in educational software, AWS infrastructure, and database migrations, plus electronics, 3D printing, and home servers.", "/about/");
const experience = [
  { role: "Application Developer II", organization: "Arizona State University", period: "February 2024 – Present", detail: "Educational software, accessibility, AWS infrastructure and deployments, database migrations, and applied AI work." },
  { role: "Quality Assurance Engineer", organization: "Arizona State University", period: "October 2021 – February 2024", detail: "Product testing, accessibility validation, and release workflows." },
  { role: "Technician I", organization: "Kyterion", period: "May 2020 – November 2020", detail: "Technical operations, troubleshooting, and customer support." },
];
const certifications = [
  ["AWS Educate Machine Learning Foundations", "Amazon Web Services · July 2025"],
  ["Introducing Generative AI with AWS", "Udacity · June 2025"],
  ["Introduction to Computer Vision and Image Processing", "IBM · May 2024"],
  ["Introduction to Deep Learning & Neural Networks with Keras", "IBM · March 2024"],
  ["Machine Learning with Python", "Coursera · March 2024"],
  ["Tools for Data Science", "IBM · March 2024"],
  ["Introduction to Neural Networks", "Coursera"],
  ["Full-Stack Development", "Codecademy"],
];
export default function About() {
  return <div className="shell page section about-page">
    <header className="about-heading"><div><p className="eyebrow">About / Arizona</p><h1>Hi, I’m Kevin.</h1><p className="lead">I’m an Application Developer II at Arizona State University. I work on educational software and spend a lot of my time thinking about how people author, use, and learn from it.</p><p>I came to application development through quality assurance. That background shows up in the questions I ask: what happens when a request fails, what does a screen reader actually say, and can someone recover their work?</p></div><img className="about-portrait" src="/kevin-segovia-portrait.png" alt="Kevin Segovia smiling in a white shirt." width={1122} height={1402} /></header>
    <div className="about-body"><section aria-labelledby="infrastructure-work"><p className="eyebrow">AWS / ETX Center at ASU</p><h2 id="infrastructure-work">AWS deployments and database migrations</h2><p>I led infrastructure consolidation, application deployments, and database migrations for ASU’s ETX Center. Most of the AWS implementation was my own work.</p><ul className="experience-highlights"><li>Consolidated duplicate PostgreSQL databases and removed unused EC2 and networking resources, reducing infrastructure costs by 66%.</li><li>Launched web applications with Amplify and Fargate for courses intended to reach tens of thousands of students.</li><li>Migrated PostgreSQL databases across AWS accounts and moved a DigitalOcean application to DynamoDB, Cognito, and Amplify.</li></ul><a className="text-link" href="/projects/aws-infrastructure/">More about the AWS work <span aria-hidden="true">→</span></a></section>
    <section aria-labelledby="outside-work"><p className="eyebrow">Outside work</p><h2 id="outside-work">Electronics, prints, and servers.</h2><p>I’m learning C and embedded systems alongside hands-on electronics. I also work with 3D printing and run a home lab. Those projects bring a different set of questions from web development: wiring, measurements, physical parts, storage, and machines I have to maintain myself.</p><p>{notebookEnabled && <>The <a href="/notebook/">notebook</a> will cover individual builds and experiments. </>}The <a href="/projects/embedded-learning/">Embedded Learning project</a> describes the software I built around my C and ESP32 study.</p></section>
    <section aria-labelledby="experience"><p className="eyebrow">Experience</p><h2 id="experience">Where I’ve worked</h2><div className="timeline">{experience.map((job) => <article key={job.role}><p className="eyebrow">{job.period}</p><h3>{job.role}</h3><p className="organization">{job.organization}</p><p>{job.detail}</p></article>)}</div></section>
    <section aria-labelledby="education"><p className="eyebrow">Education</p><h2 id="education">Computer science at ASU</h2><div className="degree-grid"><article><p className="eyebrow">December 2025</p><h3>Master of Computer Science</h3><p>Arizona State University</p></article><article><p className="eyebrow">December 2023</p><h3>Bachelor of Science in Computer Science</h3><p>Arizona State University</p></article></div><h3 className="certification-heading">Certifications and short courses</h3><ul className="certification-list">{certifications.map(([name, issuer]) => <li key={name}><span>{name}</span><small>{issuer}</small></li>)}</ul></section></div>
  </div>;
}
