const vectorContent = {
  commerce: (
    <>
      <g className="vector-shift-a">
        <rect className="vector-frame" x="14" y="37" width="62" height="86" rx="4" />
        <path className="vector-datum" d="M10 37h70L70 20H20Z" />
        <path className="vector-line" d="M22 37v14M36 37v14M50 37v14M64 37v14" />
        <rect className="vector-surface" x="25" y="64" width="18" height="18" rx="2" />
        <rect className="vector-surface" x="49" y="64" width="18" height="18" rx="2" />
        <path className="vector-line" d="M25 90h42M25 100h28M25 111h18" />
      </g>

      <rect className="vector-frame" x="96" y="19" width="88" height="76" rx="4" />
      <rect className="vector-surface vector-shift-b" x="106" y="30" width="28" height="28" rx="3" />
      <path className="vector-line" d="M143 32h29M143 43h23M143 54h18M107 70h65M107 81h43" />

      <path className="vector-motion" d="M85 107h18l6 18h51l8-24h-57" />
      <path className="vector-frame" d="M120 132h43" />
      <circle className="vector-datum" cx="121" cy="132" r="3" />
      <circle className="vector-datum" cx="159" cy="132" r="3" />
      <path className="vector-motion" d="m169 111 10 7-10 7" />
    </>
  ),
  landing: (
    <>
      <rect className="vector-frame" x="16" y="17" width="168" height="116" rx="4" />
      <path className="vector-datum" d="M16 34h168" />
      <path className="vector-line" d="M31 49h57M31 59h42M31 75h63M31 84h52M31 100h49" />
      <rect className="vector-surface vector-shift-a" x="31" y="110" width="50" height="10" rx="2" />

      <rect className="vector-frame" x="111" y="48" width="54" height="68" rx="4" />
      <path className="vector-line" d="M121 61h34M121 72h34M121 84h22" />
      <path className="vector-frame" d="m121 96 8 6 8-6" />
      <rect className="vector-surface vector-shift-b" x="143" y="92" width="12" height="12" rx="2" />

      <path className="vector-motion" d="M82 115c14 0 15-21 28-21h17" />
      <path className="vector-motion" d="m122 89 7 5-7 5" />
    </>
  ),
  portfolio: (
    <>
      <rect className="vector-frame" x="16" y="18" width="168" height="114" rx="4" />
      <path className="vector-datum" d="M16 34h168" />

      <rect className="vector-frame" x="29" y="47" width="52" height="68" rx="4" />
      <circle className="vector-surface vector-shift-a" cx="55" cy="65" r="10" />
      <path className="vector-line" d="M39 84h32M39 94h26M43 106h24" />

      <rect className="vector-frame vector-shift-b" x="99" y="46" width="67" height="28" rx="3" />
      <rect className="vector-surface" x="107" y="54" width="18" height="12" rx="2" />
      <path className="vector-line" d="M132 56h25M132 65h18" />
      <rect className="vector-frame" x="99" y="86" width="67" height="29" rx="3" />
      <rect className="vector-surface" x="107" y="94" width="18" height="13" rx="2" />
      <path className="vector-line" d="M132 96h25M132 105h20" />
      <path className="vector-motion" d="M91 47v68" />
    </>
  ),
  corporate: (
    <>
      <rect className="vector-frame" x="15" y="17" width="170" height="116" rx="4" />
      <path className="vector-datum" d="M15 37h170" />
      <rect className="vector-surface" x="27" y="25" width="17" height="5" rx="2" />
      <path className="vector-line" d="M115 27h14M138 27h14M161 27h12" />

      <rect className="vector-frame vector-shift-a" x="28" y="49" width="144" height="28" rx="3" />
      <path className="vector-line" d="M39 59h55M39 68h38M142 59h19M142 68h13" />

      <rect className="vector-surface" x="28" y="88" width="39" height="24" rx="3" />
      <rect className="vector-surface" x="80" y="88" width="39" height="24" rx="3" />
      <rect className="vector-surface" x="132" y="88" width="39" height="24" rx="3" />
      <path className="vector-line" d="M28 121h91M132 121h39" />
      <path className="vector-motion" d="M22 45v71" />
    </>
  ),
  tools: (
    <>
      <rect className="vector-frame" x="14" y="22" width="102" height="116" rx="5" />
      <path className="vector-datum" d="M14 47h102" />
      <path className="vector-line" d="M30 64h70M30 78h57M30 93h70M30 107h46" />
      <rect className="vector-surface vector-shift-a" x="29" y="120" width="70" height="9" rx="2" />

      <rect className="vector-frame" x="149" y="22" width="102" height="116" rx="5" />
      <path className="vector-datum" d="M149 47h102" />
      <path className="vector-line" d="M171 67h62M171 93h62M171 119h62" />
      <path className="vector-datum" d="m158 67 4 4 7-10M158 93l4 4 7-10" />
      <rect className="vector-surface vector-shift-b" x="157" y="111" width="11" height="11" rx="2" />

      <rect className="vector-frame" x="284" y="22" width="102" height="116" rx="5" />
      <path className="vector-datum" d="M284 47h102" />
      <circle className="vector-surface" cx="305" cy="69" r="9" />
      <circle className="vector-surface" cx="305" cy="96" r="9" />
      <circle className="vector-surface" cx="305" cy="123" r="9" />
      <path className="vector-line" d="M321 66h48M321 73h35M321 93h48M321 100h30M321 120h48M321 127h38" />

      <path className="vector-motion" d="M118 80h29M253 80h29" />
      <path className="vector-motion" d="m138 73 9 7-9 7M273 73l9 7-9 7" />
    </>
  ),
}

const labels = {
  commerce: 'Commerce storefront, product detail, cart, and order route illustration',
  landing: 'Campaign content moving toward a contact action illustration',
  portfolio: 'Professional profile and selected work presentation illustration',
  corporate: 'Structured corporate website content illustration',
  tools: 'Request, workflow status, and team overview illustration',
}

export function ServiceVector({ type, label = labels[type] }) {
  const wide = type === 'tools'

  return (
    <svg className={`service-vector ${wide ? 'service-vector--tools' : ''}`} viewBox={wide ? '0 0 400 160' : '0 0 200 150'} role="img" aria-label={label}>
      {vectorContent[type]}
    </svg>
  )
}
