import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { CONTENT_DIR } from './constants';
import { PostProps, PostMetadata } from './post';

export async function getMarkdownPosts(): Promise<PostProps[]> {
  const files = fs.readdirSync(CONTENT_DIR);
  const posts = files
    .filter((filename) => filename.endsWith('md'))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const file = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data: rawMetadata, content: content } = matter(file);
      const description = rawMetadata?.description;
      const metadata: PostMetadata = {
        title: rawMetadata?.title ?? null,
        date: rawMetadata?.date ?? null,
        description: description ?? null,
        tag: rawMetadata?.tag ?? null,
        hidden: rawMetadata?.hidden ?? false,
        redirect_uri: rawMetadata?.redirectUri ?? null,
        slug,
      };

      return {
        metadata,
        content
      };
    });

  return posts
    .filter((post) => post && post.metadata)
    .sort((post1, post2) =>
      new Date(post2.metadata?.date ?? "").getTime()
      - new Date(post1.metadata?.date ?? "").getTime());
}
