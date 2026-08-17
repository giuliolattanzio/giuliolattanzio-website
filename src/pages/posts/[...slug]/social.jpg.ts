import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getPostSlug } from "@/utils/getPostPaths";

export async function getStaticPaths() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return posts
    .filter(post => typeof post.data.ogImage === "string" && post.data.ogImage.length > 0)
    .map(post => ({
      params: { slug: getPostSlug(post.id, post.filePath) },
      props: { imagePath: post.data.ogImage as string },
    }));
}

export const GET: APIRoute = async ({ props }) => {
  const imagePath = String(props.imagePath).split("?")[0].replace(/^\//, "");
  const absolutePath = path.join(process.cwd(), "public", imagePath);
  const source = await readFile(absolutePath);

  const jpeg = await sharp(source)
    .resize(1200, 627, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
    })
    .jpeg({ quality: 90, progressive: true })
    .toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
