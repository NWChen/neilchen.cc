import matter from "gray-matter";
import path from "path";
import { List, ListItem, Typography } from "@mui/material";
import React from "react";
import { CONTENT_DIR } from "../lib/constants";
import { GetStaticProps } from "next/types";
import fs from "fs";

export type Post = {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
};

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <List>
      {posts.map((post) => (
        <ListItem key={post.slug}>
          <Typography variant="body1">
            {post.frontmatter.title}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

// For Next.js to pre-render a page at build time using the props returned by `getStaticProps`
export const getStaticProps = (async () => {
  const files = fs.readdirSync(CONTENT_DIR);
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const content = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data: frontmatter } = matter(content);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: { posts: posts },
  };
}) satisfies GetStaticProps<{ posts: Post[] }>;
