import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { CONTENT_DIR, PREVIEW_LIMIT_WORDS } from './constants';
import { PostProps, PostMetadata } from './post';


export async function getMarkdownPosts({
  preview = false,
}: {
  preview: boolean;
}): Promise<PostProps[]> {
  const files = fs.readdirSync(CONTENT_DIR);
  const posts = files
    .filter((filename) => filename.endsWith('md'))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const file = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data: rawMetadata, content: content } = matter(file);
      const description = preview ? content.split(" ").slice(0, PREVIEW_LIMIT_WORDS).join(" ") + '...' : rawMetadata?.description
      const metadata: PostMetadata = {
        title: rawMetadata?.title ?? null,
        date: rawMetadata?.date ?? null,
        description: description ?? null,
        tag: rawMetadata?.tag ?? null,
        slug,
      };

      return {
        metadata,
        content
      };
    });

  return posts.filter((post) => post && post.metadata);
}
