import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://giuliolattanzio.pages.dev/",
    title: "Giulio Lattanzio",
    description: "Sito Vetrina e Interactive CV di Giulio Lattanzio | Network & Security Specialist (Wi-Fi, VoIP, Fortinet, AudioCodes).",
    author: "Giulio Lattanzio",
    profile: "https://giuliolattanzio.pages.dev/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Europe/Rome",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/giuliolattanzio" },
    { name: "linkedin", url: "https://www.linkedin.com/in/tuo-profilo-linkedin/" },
    { name: "mail",     url: "mailto:giulio.lattanzio@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "linkedin", url: "https://www.linkedin.com/shareArticle?mini=true&url=" },
    { name: "mail",     url: "mailto:?subject=Guarda%20questo%20articolo&body=" },
  ],
});
