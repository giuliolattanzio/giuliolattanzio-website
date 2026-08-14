import { defineConfig } from "./src/types/config";

export default defineConfig({
  site: {
    website: "https://giuliolattanzio.pages.dev/",
    author: "Giulio Lattanzio",
    profile: "https://giuliolattanzio.pages.dev/",
    desc: "Sito Vetrina e Interactive CV di Giulio Lattanzio | Network & Security Specialist (Wi-Fi, VoIP, Fortinet, AudioCodes).",
    title: "Giulio Lattanzio | Network & Security Specialist",
    ogImage: "astropaper-og.jpg",
    lightAndDarkMode: true,
    postPerIndex: 4,
    postPerPage: 4,
    scheduledPostMargin: 15 * 60 * 1000,
    showArchives: true,
    editPost: {
      enabled: false,
    },
  },
  socials: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/tuo-profilo-linkedin", // Inserisci qui il tuo link LinkedIn reale
      linkTitle: "Giulio Lattanzio su LinkedIn",
      active: true,
    },
    {
      name: "Mail",
      href: "mailto:giulio.lattanzio@gmail.com",
      linkTitle: "Invia una mail a Giulio",
      active: true,
    },
  ],
});
