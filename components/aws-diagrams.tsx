function DatabaseShape({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M0 12v48c0 7 15 12 34 12s34-5 34-12V12" />
    <ellipse cx="34" cy="12" rx="34" ry="12" />
    <path d="M0 28c0 7 15 12 34 12s34-5 34-12M0 44c0 7 15 12 34 12s34-5 34-12" />
  </g>;
}

function ServiceIcon({ kind }: { kind: "database" | "account" | "site" }) {
  return <svg className="aws-service-icon" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
    {kind === "database" && <DatabaseShape x={6} y={4} />}
    {kind === "account" && <><circle cx="40" cy="24" r="12" /><path d="M16 66v-8a24 24 0 0 1 48 0v8M26 66h28" /></>}
    {kind === "site" && <><rect x="6" y="12" width="68" height="56" rx="3" /><path d="M6 27h68M15 20h3m5 0h3m5 0h3M28 39l-9 9 9 9m24-18 9 9-9 9M44 35l-8 26" /></>}
  </svg>;
}

export function AwsConsolidationDiagram() {
  return <figure className="aws-consolidation" aria-labelledby="consolidation-title" aria-describedby="consolidation-caption">
    <p className="eyebrow" id="consolidation-title">Reducing duplicate infrastructure</p>
    <div className="consolidation-labels"><span>Separate accounts</span><span>Consolidated account</span></div>
    <svg className="consolidation-drawing" viewBox="0 0 480 220" fill="none" aria-hidden="true" focusable="false">
      <rect className="account-boundary" x="12" y="12" width="178" height="196" rx="5" />
      <rect className="account-boundary account-boundary-after" x="292" y="12" width="176" height="196" rx="5" />
      <g className="database-before"><DatabaseShape x={40} y={33} /><DatabaseShape x={95} y={119} /></g>
      <g className="consolidation-lines"><path d="M108 69h35l73 41h97M163 155h17l36-45" /><path d="m305 102 8 8-8 8" /></g>
      <g className="database-after"><DatabaseShape x={346} y={74} /></g>
    </svg>
    <div className="consolidation-labels consolidation-details"><span>Duplicate user and application databases</span><span>PostgreSQL databases with less RDS overhead</span></div>
    <div className="consolidation-retired"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" /></svg><span>Stale EC2 instances and NAT gateways removed</span></div>
    <figcaption id="consolidation-caption">PostgreSQL databases across accounts were brought into one AWS account. Symbols represent groups of databases.</figcaption>
  </figure>;
}

function MigrationArrow({ label }: { label: string }) {
  return <div className="migration-connection"><span>{label}</span><svg viewBox="0 0 120 20" fill="none" aria-hidden="true" focusable="false"><path d="M0 10h116m-8-8 8 8-8 8" /></svg></div>;
}

export function AwsMigrationDiagram() {
  return <figure className="aws-migrations" aria-labelledby="migration-title" aria-describedby="migration-caption">
    <div className="migration-heading"><p className="eyebrow">Database migrations</p><h2 id="migration-title">What moved where</h2></div>
    <div className="migration-route">
      <div className="migration-source"><ServiceIcon kind="database" /><div><span className="migration-location">Separate AWS accounts</span><strong>PostgreSQL</strong></div></div>
      <MigrationArrow label="SQL rebuild script" />
      <div className="migration-rds"><ServiceIcon kind="database" /><div><span className="migration-location">Consolidated AWS account</span><strong>PostgreSQL on RDS</strong></div></div>
    </div>
    <div className="migration-route">
      <div className="migration-source"><ServiceIcon kind="site" /><div><span className="migration-location">DigitalOcean</span><strong>Application + PostgreSQL</strong></div></div>
      <MigrationArrow label="Application move" />
      <dl className="migration-targets">
        <div><ServiceIcon kind="database" /><dt>Records</dt><dd>DynamoDB</dd></div>
        <div><ServiceIcon kind="account" /><dt>Accounts</dt><dd>Cognito</dd></div>
        <div><ServiceIcon kind="site" /><dt>Hosting</dt><dd>Amplify</dd></div>
      </dl>
    </div>
    <figcaption id="migration-caption">The first move kept PostgreSQL. The second changed the database, sign-in, and hosting.</figcaption>
  </figure>;
}
