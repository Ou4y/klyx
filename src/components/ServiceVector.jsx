const vectorContent = {
  foundation: (
    <>
      <rect className="vector-frame" x="18" y="18" width="164" height="114" rx="4" />
      <path className="vector-datum" d="M48 18v114" />
      <rect className="vector-surface vector-shift-a" x="62" y="40" width="96" height="20" rx="2" />
      <rect className="vector-line" x="62" y="74" width="64" height="6" rx="3" />
      <rect className="vector-line" x="62" y="90" width="78" height="6" rx="3" />
      <path className="vector-motion" d="M62 112h75l17-17" />
    </>
  ),
  operations: (
    <>
      <rect className="vector-frame" x="24" y="18" width="152" height="114" rx="4" />
      <path className="vector-datum" d="M56 18v114" />
      <path className="vector-motion" d="m72 48 7 7 13-15" />
      <path className="vector-line" d="M104 48h48M104 72h48M104 96h34" />
      <rect className="vector-surface vector-shift-b" x="72" y="66" width="12" height="12" rx="2" />
      <rect className="vector-surface" x="72" y="90" width="12" height="12" rx="2" />
    </>
  ),
  managed: (
    <>
      <path className="vector-datum" d="M100 18v114" />
      <rect className="vector-frame vector-shift-a" x="18" y="30" width="64" height="52" rx="4" />
      <path className="vector-frame" d="M28 82v14l14-14" />
      <rect className="vector-frame vector-shift-b" x="118" y="56" width="64" height="52" rx="4" />
      <path className="vector-frame" d="M172 108v14l-14-14" />
      <path className="vector-motion" d="M84 56h32" />
      <path className="vector-line" d="M32 48h36M132 74h36M132 90h25" />
    </>
  ),
  growth: (
    <>
      <path className="vector-datum" d="M42 18v114" />
      <path className="vector-frame" d="M64 112V74h32v38M108 112V52h32v60M152 112V30h24v82" />
      <path className="vector-frame" d="M58 112h124" />
      <path className="vector-motion" d="m66 60 30-18 24 2 48-28" />
      <path className="vector-motion" d="m156 16h12v12" />
      <circle className="vector-surface vector-shift-a" cx="96" cy="42" r="5" />
    </>
  ),
}

const labels = {
  foundation: 'Structured commerce foundation illustration',
  operations: 'Store operations checklist illustration',
  managed: 'Managed customer workflow illustration',
  growth: 'Coordinated growth and retail illustration',
}

export function ServiceVector({ type, label = labels[type] }) {
  return (
    <svg className="service-vector" viewBox="0 0 200 150" role="img" aria-label={label}>
      {vectorContent[type]}
    </svg>
  )
}
