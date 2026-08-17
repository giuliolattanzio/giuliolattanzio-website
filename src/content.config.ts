import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts/giulio";

const articleCoverByTitle: Record<string, string> = {
  "Infrastruttura enterprise Alcatel-Lucent: integrazione tra OmniSwitch e OmniAccess Stellar":
    "/images/articles/alcatel-omniswitch-omniaccess-stellar-hero.webp",
};

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      // Pages CMS saves cover images in /public and stores a public URL string.
      // Validate strings first so Astro does not try to resolve /images/... as a source asset.
      ogImage: z.string().or(image()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }).transform(data => ({
      ...data,
      ogImage: data.ogImage ?? articleCoverByTitle[data.title],
    })),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, pages };
