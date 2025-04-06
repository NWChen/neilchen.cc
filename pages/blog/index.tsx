import { Box, Container, Link, List, ListItem, Typography } from "@mui/material";
import { GetStaticProps } from "next/types";
import React from "react";
import { CONTENT_DIR } from "../../lib/constants";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import Header from "../../components/Header";

export default function Blog({ posts }: { posts: PostProps[] }) {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h1" gutterBottom>
          Latest Posts
        </Typography>
        <List>
          {posts.map((post) => (
            <ListItem key={post.metadata.slug}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {post.metadata.date && (
                  <Typography variant="caption" color="text.secondary">
                    {post.metadata.date}
                  </Typography>
                )}
                <Link href={`/blog/${post.metadata.slug ?? ""}`}>
                  <Typography variant="h3">
                    {post.metadata.title}
                  </Typography>
                </Link>
                {post.metadata.description && (
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {post.metadata.description}
                  </Typography>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

// For Next.js to pre-render a page at build time using the props returned by `getStaticProps`
export const getStaticProps = (async () => {
  const files = fs.readdirSync(CONTENT_DIR);
  const posts = files
    .filter((filename) => filename.endsWith('md'))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const content = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
      const { data: rawMetadata } = matter(content);
      const metadata: PostMetadata = {
        title: rawMetadata?.title ?? null,
        date: rawMetadata?.date ?? null,
        description: rawMetadata?.description ?? null,
        slug,
      };
      return {
        metadata,
        content,
      };
    });

  return {
    props: { posts: posts.filter((post) => post && post.metadata) },
  };
}) satisfies GetStaticProps<{ posts: PostProps[] }>;
