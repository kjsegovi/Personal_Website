import type { Project } from "@/lib/projects";

const diagrams: Partial<Record<Project["visual"], { label: string; stages: string[][]; caption: string }>> = {
  courses: { label: "Course Studio workflow", stages: [["Source", "Book / document"], ["Course model", "Reading + activities"], ["Author review", "Approve a revision"], ["Export", "Torus / Canvas"]], caption: "Course Studio: source material passes through the course model and author review before export." },
  habfly: { label: "HabFly action loop", stages: [["Observe", "Visible task state"], ["Decide", "Recurrent graph"], ["Act", "Tool / browser"], ["Check", "Read back the result"]], caption: "HabFly: each checked action returns a new observation. The terminal UI can inspect or replay the steps." },
  embedded: { label: "Embedded Learning progression", stages: [["Learn", "Lesson + practice"], ["Try", "Code + explanation"], ["Check", "Independent evidence"], ["Review", "2 / 7 / 21 days"]], caption: "Embedded Learning: assisted practice and independent evidence are recorded separately." },
  tourit: { label: "Tour It AWS release workflow", stages: [["Verify", "CodePipeline + CodeBuild"], ["Protect", "Pause commits + backups"], ["Deploy", "Pinned source on Amplify"], ["Check", "Live release + tour checks"]], caption: "CodePipeline and CodeBuild verify the source. Step Functions coordinates the backup checkpoint, deployment, and live checks." },
  infiniscope: { label: "Moving existing members", stages: [["Legacy sources", "Cognito + Strapi"], ["Review", "Identity + membership"], ["Link", "New login + member record"], ["Return", "Reset when required + sign in"]], caption: "A returning member needs both a Cognito login and its DynamoDB membership link. Website hosting and DNS moved separately to Amplify and Route 53." },
};

export function ProjectDiagram({ kind }: { kind: Project["visual"] }) {
  const diagram = diagrams[kind];
  if (!diagram) return null;
  return <figure className={`flow-figure flow-${kind}`}>
    <p className="eyebrow">{diagram.label}</p>
    <ol className="flow-stages">{diagram.stages.map(([title, detail], index) => <li key={title}>
      <span className="flow-number" aria-hidden="true">0{index + 1}</span><strong>{title}</strong><span>{detail}</span>
    </li>)}</ol>
    <figcaption>{diagram.caption}</figcaption>
  </figure>;
}

export function ProjectThumbnail({ project }: { project: Project }) {
  if (project.visual === "tourit") return <div className="card-visual tour-visual" aria-hidden="true">
    <svg viewBox="0 0 280 150" fill="none">
      <rect x="15" y="12" width="250" height="125" rx="3" fill="#faf9f3" stroke="#748878" />
      <path d="M15 105 73 51l47 45 40-29 48 39 35-40 22 22v49H15Z" fill="#c8d7c1" />
      <path d="M15 119c68-25 143-25 250 0" stroke="#748878" />
      <circle cx="218" cy="40" r="12" fill="#f0d29b" />
      <path d="m91 90 73-34h30" stroke="#9a5700" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="91" cy="90" r="10" fill="#14213d" />
      <path d="m88 85 5 5-5 5" stroke="#fca311" strokeWidth="2" />
      <rect x="169" y="42" width="66" height="24" fill="#14213d" />
      <path d="M179 51h32m-32 6h22" stroke="#d8e5e0" strokeWidth="2" />
    </svg>
    <span className="visual-label">panoramas / connected scenes</span>
  </div>;
  if (project.visual === "courses") return <div className="card-visual courses-visual" aria-hidden="true">
    <div className="book-stack"><span /><span /><span><i /> <i /> <i /></span></div>
    <div className="visual-connector">→</div><div className="course-outline"><span>01 <i /></span><span>02 <i /></span><span>03 <i /></span></div>
  </div>;
  if (project.visual === "habfly") {
    const nodes = [[35, 68], [58, 28], [60, 108], [101, 45], [105, 91], [146, 23], [148, 113], [181, 68], [217, 40], [221, 99]];
    return <div className="card-visual graph-visual" aria-hidden="true"><svg viewBox="0 0 260 140" fill="none">
      {nodes.map(([x,y], index) => nodes.slice(index + 1, index + 4).map(([x2, y2], j) => <path key={`${index}-${j}`} d={`M${x} ${y}L${x2} ${y2}`} />))}
      {nodes.map(([cx,cy], i) => <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 6 : 4} />)}
    </svg><span className="visual-label">observe → decide → act</span></div>;
  }
  return <div className="card-visual learning-visual" aria-hidden="true"><div className="learning-window">
    <span className="window-label">C / FOUNDATIONS</span><strong>What runs?</strong><div className="code-lines"><i /><i /><i /></div>
    <span className="learning-check">Practice → Independent check</span>
  </div></div>;
}
