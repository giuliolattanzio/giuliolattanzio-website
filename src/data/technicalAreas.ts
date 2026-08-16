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
      "Survey Wi-Fi",
      "Analisi Wi-Fi",
    ],
    tags: ["wifi", "ekahau", "site-survey", "survey-wifi", "analisi-wifi"],
    archiveHref: "/tags/wifi/",
  },
  {
    slug: "networking",
    label: "Networking",
    eyebrow: "Infrastructure",
    title: "Networking",
    description:
      "Reti IP, segmentazione, VLAN, architetture, analisi del traffico e troubleshooting dell'infrastruttura.",
    summary:
      "Questa area raccoglie gli aspetti infrastrutturali che fanno da base ai servizi di rete e alle attività di analisi quotidiane.",
    topics: [
      "Reti IP",
      "VLAN",
      "Infrastrutture",
      "Analisi del traffico",
      "Troubleshooting",
    ],
    tags: ["networking"],
    archiveHref: "/tags/networking/",
  },
  {
    slug: "fortinet",
    label: "Fortinet",
    eyebrow: "Security",
    title: "Fortinet",
    description:
      "FortiGate, VPN, policy, segmentazione e sicurezza delle reti aziendali.",
    summary:
      "Uno spazio per raccogliere configurazioni, ragionamenti tecnici e approfondimenti legati alle tecnologie Fortinet che utilizzo nel mio lavoro.",
    topics: ["FortiGate", "Fortinet", "VPN", "Policy", "Security"],
    tags: ["fortinet", "fortigate", "security"],
    archiveHref: "/tags/fortinet/",
  },
  {
    slug: "voip",
    label: "VoIP",
    eyebrow: "Voice over IP",
    title: "VoIP & SIP",
    description:
      "Call flow, routing SIP, interoperabilità e analisi delle comunicazioni IP.",
    summary:
      "Questa sezione è dedicata ai sistemi VoIP e ai flussi SIP, con particolare attenzione all'analisi e all'interoperabilità tra piattaforme.",
    topics: ["VoIP", "SIP", "Call Flow", "Routing", "Microsoft Teams"],
    tags: ["voip", "sip", "microsoft-teams"],
    archiveHref: "/tags/voip/",
  },
  {
    slug: "audiocodes",
    label: "AudioCodes",
    eyebrow: "Unified Communications",
    title: "AudioCodes",
    description:
      "SBC, routing SIP, manipolazioni e integrazione con piattaforme di comunicazione.",
    summary:
      "Uno spazio dedicato agli SBC AudioCodes, al routing delle chiamate e alle attività di integrazione e troubleshooting delle comunicazioni IP.",
    topics: [
      "AudioCodes SBC",
      "SIP",
      "Routing",
      "Manipolazioni",
      "Interoperabilità",
    ],
    tags: ["audiocodes"],
    archiveHref: "/tags/audiocodes/",
  },
];
