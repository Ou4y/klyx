export function Icon({ name, size = 20, className = '', decorative = true }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': decorative ? 'true' : undefined,
  }

  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m7 10 5 5 5-5" />,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    menu: <><path d="M4 8h16" /><path d="M4 16h16" /></>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 19.8l1.3-4A8 8 0 1 1 20 11.5Z" /><path d="M9 8.5c.5 2.2 2.3 4 4.5 4.5" /></>,
    phone: <><path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-4-1-1.2 2c-3.4-1.5-6.1-4.2-7.6-7.6l2-1.4-1-4Z" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    external: <><path d="M14 5h5v5" /><path d="m19 5-8 8" /><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></>,
    foundation: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 9v11" /></>,
    operations: <><path d="M4 7h11M4 12h16M4 17h9" /><circle cx="17" cy="7" r="2" /><circle cx="15" cy="17" r="2" /></>,
    managed: <><path d="M12 21a9 9 0 1 0-9-9" /><path d="M3 16v5h5" /><path d="M8 12h8M12 8v8" /></>,
    growth: <><path d="m4 18 5-6 4 3 7-9" /><path d="M15 6h5v5" /></>,
    sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></>,
    moon: <path d="M20 15.4A8.5 8.5 0 0 1 8.6 4a8.5 8.5 0 1 0 11.4 11.4Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    tiktok: <><path d="M14 4v10.2a4.2 4.2 0 1 1-3.4-4.1" /><path d="M14 4c.8 2.2 2.3 3.5 5 3.8" /></>,
    commerce: <><path d="M3 5h2l2 11h10l2-8H6" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /><path d="M10 8v5M14 8v5" /></>,
    landing: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18M7 13h5M7 16h9" /><path d="m16 11 2 2-2 2" /></>,
    portfolio: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M9 5V3h6v2M4 11h16" /><path d="M10 11v2h4v-2" /></>,
    corporate: <><path d="M4 21V7l8-4 8 4v14M8 10h1M15 10h1M8 14h1M15 14h1M10 21v-4h4v4" /></>,
    tools: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 4v16M8 9h13M12 13h5M12 16h3" /></>,
    domain: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></>,
    care: <><path d="M12 21s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.7-7 10-7 10Z" /><path d="M8.5 13h2l1-2 1.5 4 1-2h1.5" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
  }

  return <svg {...common}>{paths[name]}</svg>
}
