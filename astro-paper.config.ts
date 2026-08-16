import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://giuliolattanzio.pages.dev/",
    title: "Giulio Lattanzio",
    description: "Portfolio personale e knowledge hub tecnico di Giulio Lattanzio, Network, Wi-Fi & VoIP Specialist.",
    author: "Giulio Lattanzio",
    profile: "https://giuliolattanzio.pages.dev/",
    ogImage: "default-og.jpg",
    lang: "it",
    timezone: "Europe/Rome",
    dir: "ltr",
  },
  posts: {
    perPage: 6,
    perIndex: 6,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: false,
    dynamicOgImage: true,
    showArchives: false,
    showBackButton: false,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/giuliolattanzio" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "linkedin", url: "https://www.linkedin.com/shareArticle?mini=true&url=" },
    { name: "mail", url: "mailto:?subject=Guarda%20questo%20articolo&body=" },
  ],
});
