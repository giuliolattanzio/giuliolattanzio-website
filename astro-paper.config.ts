export const SITE = {
  website: "https://giuliolattanzio.pages.dev/",
  author: "Giulio Lattanzio",
  profile: "https://giuliolattanzio.pages.dev/",
  desc: "Sito Vetrina e Interactive CV di Giulio Lattanzio | Network & Security Specialist.",
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
};

export const LOCALE = {
  lang: "it",
  langTag: ["it-IT"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    linkTitle: "Giulio Lattanzio su LinkedIn",
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:giulio.lattanzio@gmail.com",
    linkTitle: "Invia una mail a Giulio",
    active: true,
  },
];
