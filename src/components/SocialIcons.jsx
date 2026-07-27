// lucide-react dropped brand/logo icons, so these small outline icons are
// hand-drawn to match the same stroke style used across the UI.

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function TelegramIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M21.5 3.5 2.7 10.8c-1 .4-1 1.8.1 2.1l4.6 1.5 1.8 5.4c.3 1 1.6 1.2 2.3.4l2.4-2.8 4.5 3.3c.8.6 2 .2 2.2-.8l3-16.1c.2-1.1-.9-2-1.9-1.5Z" />
      <path d="M8 14.5 18.5 6.5" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M7.5 10.2v6.3M7.5 7.6v.1M12 16.5v-3.7c0-1.3.9-2.4 2.3-2.4s2.2 1 2.2 2.4v3.7" />
    </svg>
  );
}

export function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.5 9.7v4.6l4-2.3-4-2.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
