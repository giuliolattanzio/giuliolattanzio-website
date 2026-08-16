export type Area = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  topics: string[];
  tags: string[];
  archiveHref: string;
};

export const TECHNICAL_AREAS: Area[] = [
  {
    slug: "wifi",
    label: "Wi-Fi",
    eyebrow: "Wireless Engineering",
    title: "Wi-Fi & RF",
    description:
      "Uno spazio dedicato al wireless enterprise, alla progettazione RF, alle site survey, alla validazione sul campo e al troubleshooting Wi-Fi.",
    summary:
      "Il Wi-Fi è il focus principale del mio percorso tecnico e rappresenta l'area su cui voglio concentrare maggiormente contenuti, appunti ed esperienze.",
    topics: [
      "Ekahau",
      "Enterprise Wi-Fi",
      "Site Survey",
      "RF",
      "Analisi Wi-Fi",
    ],
    tags: [
      "wifi",
      "ekahau",
      "site-survey",
      "survey-wifi",
      "analisi-wifi",
      "enterprise-wifi",
      "rf",
      "spectrum-analysis",
      "roaming",
    ],
    archiveHref: "/posts/",
  },
  {
    slug: "networking-security",
    label: "Networking & Security",
    eyebrow: "Infrastructure & Security",
    title: "Networking & Security",
    description:
      "Infrastrutture IP, switching, VLAN, routing, sicurezza Fortinet/FortiGate, Alcatel, VPN e troubleshooting di rete.",
    summary:
      "Questa area riunisce infrastruttura e sicurezza: networking IP, switching e segmentazione, tecnologie Alcatel e Fortinet/FortiGate, connettività sicura e analisi operativa.",
    topics: [
      "Networking",
      "Alcatel",
      "Fortinet / FortiGate",
      "VLAN & Routing",
      "VPN & IPsec",
    ],
    tags: [
      "networking",
      "security",
      "alcatel",
      "fortinet",
      "fortigate",
      "vlan",
      "routing",
      "vpn",
      "ipsec",
      "wireshark",
      "troubleshooting",
    ],
    archiveHref: "/posts/",
  },
  {
    slug: "voip",
    label: "VoIP & AudioCodes",
    eyebrow: "Unified Communications",
    title: "VoIP & AudioCodes",
    description:
      "SIP, call flow, routing, SBC AudioCodes, interoperabilità e integrazione con piattaforme di comunicazione.",
    summary:
      "Questa area riunisce VoIP e AudioCodes in un unico spazio, con particolare attenzione agli SBC, al routing SIP e all'interoperabilità.",
    topics: [
      "AudioCodes SBC",
      "SIP",
      "VoIP",
      "Call Flow",
      "Microsoft Teams",
    ],
    tags: [
      "voip",
      "sip",
      "audiocodes",
      "audiocodes-sbc",
      "microsoft-teams",
      "call-flow",
      "routing",
      "interoperabilita",
    ],
    archiveHref: "/posts/",
  },
];
