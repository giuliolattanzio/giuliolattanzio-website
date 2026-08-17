import type { APIRoute } from "astro";

const images = ["radio-frequency", "wifi-design", "site-survey", "ekahau", "roaming", "troubleshooting"] as const;

export function getStaticPaths() {
  return images.map((image) => ({ params: { image } }));
}

const labels: Record<string, string> = {
  "radio-frequency": "RF / Spectrum",
  "wifi-design": "Wi-Fi Design",
  "site-survey": "Site Survey",
  ekahau: "Ekahau / Survey",
  roaming: "Roaming",
  troubleshooting: "Troubleshooting",
};

const visualBySlug: Record<string, string> = {
  "radio-frequency": `
    <g opacity=".9"><path d="M90 450 C220 270 330 620 460 430 S710 260 840 450 1090 610 1310 360" fill="none" stroke="#2563eb" stroke-width="5"/><path d="M90 520 C240 370 330 560 480 510 S740 340 870 520 1110 570 1310 430" fill="none" stroke="#60a5fa" stroke-width="2" opacity=".65"/></g>
    <g transform="translate(160 90)"><rect width="310" height="118" rx="28" fill="#f8fafc"/><rect x="130" y="54" width="48" height="8" rx="4" fill="#2563eb"/><circle cx="155" cy="60" r="95" fill="none" stroke="#2563eb" opacity=".18"/><circle cx="155" cy="60" r="140" fill="none" stroke="#2563eb" opacity=".11"/></g>
    <g transform="translate(870 180)"><rect width="360" height="300" rx="24" fill="#111827" stroke="#334155"/><path d="M40 210 L80 190 110 220 150 140 190 205 230 90 270 195 320 150" fill="none" stroke="#60a5fa" stroke-width="4"/><path d="M40 250 H320 M40 200 H320 M40 150 H320 M40 100 H320" stroke="#334155"/></g>`,
  "wifi-design": `
    <g transform="translate(120 120)"><rect width="760" height="470" rx="26" fill="#111827" stroke="#334155"/><path d="M70 70 H690 V400 H70 Z M220 70 V260 H430 V70 M70 260 H320 V400 M520 70 V210 H690 M430 210 H690" fill="none" stroke="#64748b" stroke-width="4"/><g fill="#2563eb"><circle cx="170" cy="170" r="18"/><circle cx="390" cy="150" r="18"/><circle cx="590" cy="150" r="18"/><circle cx="250" cy="330" r="18"/><circle cx="540" cy="320" r="18"/></g><g fill="none" stroke="#2563eb" opacity=".25"><circle cx="170" cy="170" r="90"/><circle cx="390" cy="150" r="105"/><circle cx="590" cy="150" r="90"/><circle cx="250" cy="330" r="95"/><circle cx="540" cy="320" r="110"/></g></g><g transform="translate(980 200)"><rect width="250" height="150" rx="25" fill="#f8fafc"/><rect x="105" y="70" width="40" height="8" rx="4" fill="#2563eb"/></g>`,
  "site-survey": `
    <g transform="translate(120 120)"><rect width="760" height="470" rx="26" fill="#111827" stroke="#334155"/><path d="M70 70 H690 V400 H70 Z M230 70 V240 H450 V70 M70 240 H310 V400 M520 70 V210 H690" fill="none" stroke="#64748b" stroke-width="4"/><defs><radialGradient id="h1"><stop stop-color="#22c55e" stop-opacity=".9"/><stop offset=".5" stop-color="#2563eb" stop-opacity=".45"/><stop offset="1" stop-color="#2563eb" stop-opacity="0"/></radialGradient></defs><circle cx="180" cy="170" r="150" fill="url(#h1)"/><circle cx="480" cy="300" r="180" fill="url(#h1)"/><path d="M110 335 C220 270 330 360 440 280 S620 220 670 310" fill="none" stroke="#f8fafc" stroke-width="4" stroke-dasharray="10 10"/></g><g transform="translate(1010 170)"><rect width="230" height="150" rx="24" fill="#f8fafc"/><rect x="98" y="70" width="34" height="8" rx="4" fill="#2563eb"/></g>`,
  ekahau: `
    <g transform="translate(120 120)"><rect width="820" height="470" rx="26" fill="#111827" stroke="#334155"/><path d="M70 70 H750 V400 H70 Z M260 70 V250 H480 V70 M70 250 H330 V400 M560 70 V220 H750" fill="none" stroke="#64748b" stroke-width="4"/><g fill="#2563eb" opacity=".7"><circle cx="190" cy="170" r="105"/><circle cx="450" cy="170" r="120"/><circle cx="630" cy="300" r="115"/></g><path d="M110 350 C230 250 330 390 450 280 S630 260 720 330" fill="none" stroke="#f8fafc" stroke-width="4" stroke-dasharray="9 11"/></g><g transform="translate(1020 225)"><rect width="210" height="135" rx="24" fill="#e2e8f0"/><circle cx="105" cy="67" r="16" fill="#2563eb"/></g>`,
  roaming: `
    <g fill="#f8fafc"><rect x="100" y="150" width="230" height="135" rx="24"/><rect x="585" y="130" width="230" height="135" rx="24"/><rect x="1070" y="170" width="230" height="135" rx="24"/></g><g fill="#2563eb"><rect x="200" y="212" width="30" height="8" rx="4"/><rect x="685" y="192" width="30" height="8" rx="4"/><rect x="1170" y="232" width="30" height="8" rx="4"/></g><path d="M210 390 C400 250 530 250 700 390 S1000 520 1190 390" fill="none" stroke="#2563eb" stroke-width="5" stroke-dasharray="12 12"/><g fill="none" stroke="#2563eb" opacity=".18"><circle cx="215" cy="220" r="180"/><circle cx="700" cy="200" r="190"/><circle cx="1185" cy="240" r="180"/></g><rect x="615" y="490" width="170" height="95" rx="16" fill="#111827" stroke="#334155"/><circle cx="700" cy="538" r="11" fill="#60a5fa"/>`,
  troubleshooting: `
    <g transform="translate(100 100)"><rect width="860" height="500" rx="28" fill="#111827" stroke="#334155"/><rect x="45" y="45" width="360" height="190" rx="18" fill="#0b1220" stroke="#334155"/><path d="M80 180 L120 160 160 188 210 100 260 170 310 85 360 145" fill="none" stroke="#60a5fa" stroke-width="4"/><rect x="440" y="45" width="370" height="190" rx="18" fill="#0b1220" stroke="#334155"/><g fill="#2563eb"><rect x="480" y="155" width="24" height="45"/><rect x="525" y="120" width="24" height="80"/><rect x="570" y="85" width="24" height="115"/><rect x="615" y="140" width="24" height="60"/><rect x="660" y="100" width="24" height="100"/></g><rect x="45" y="270" width="765" height="180" rx="18" fill="#0b1220" stroke="#334155"/><path d="M80 370 C160 300 230 430 310 350 S470 290 550 370 690 420 775 320" fill="none" stroke="#2563eb" stroke-width="4"/></g><g transform="translate(1050 220)"><rect width="230" height="145" rx="24" fill="#e2e8f0"/><circle cx="115" cy="72" r="15" fill="#2563eb"/></g>`,
};

export const GET: APIRoute = ({ params }) => {
  const slug = params.image ?? "radio-frequency";
  const art = visualBySlug[slug] ?? visualBySlug["radio-frequency"];
  const label = labels[slug] ?? "Wi-Fi";
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="788" viewBox="0 0 1400 788" role="img" aria-label="${label}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#07101f"/><stop offset="1" stop-color="#0b1220"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="#2563eb" stop-opacity=".24"/><stop offset="1" stop-color="#2563eb" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1400" height="788" fill="url(#bg)"/>
    <circle cx="1120" cy="120" r="430" fill="url(#glow)"/>
    <circle cx="240" cy="700" r="440" fill="url(#glow)" opacity=".45"/>
    <path d="M0 660 H1400 M0 590 H1400 M0 520 H1400" stroke="#1e293b" opacity=".45"/>
    ${art}
  </svg>`;
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "public, max-age=31536000, immutable" } });
};
