import React from "react";
import {
  Button,
  Container,
  Box,
  Divider, Typography
} from "@mui/material";
import path from "path";
import fs from "fs";
import { CONTENT_DIR, ABOUT_FILE } from "../lib/constants";
import matter from "gray-matter";
import { marked } from "marked";
import { GetStaticProps } from "next/types";
import Posts from "../components/Posts";
import { PostMetadata, PostProps, Tag } from "../lib/post";
import { getMarkdownPosts } from '../lib/getMarkdownPosts';

export default function Home({ posts, blurb }: { posts: PostProps[], blurb: string }) {
  // TODO: support non-blog-posts in projects

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h1" sx={{ alignSelf: "flex-start" }}>
            Neil Chen
          </Typography>
          <Box>
            <Button variant="text" color="primary" href="/blog">
              Blog
            </Button>
            <Button variant="text" color="primary" href="mailto:neilwchen@gmail.com">
              Contact
            </Button>
            <Button variant="text" color="primary" href="https://github.com/nwchen">
              GitHub
            </Button>
            <Button variant="text" color="primary" href="https://www.linkedin.com/in/neilwchen/">
              LinkedIn
            </Button>
          </Box>
          <Box>
            <Typography component="span" variant="body1">
              <div dangerouslySetInnerHTML={{ __html: marked(blurb) }} />
            </Typography>
          </Box>
        </Box>
        <Box sx={{ order: { xs: -1, sm: 0 } }}>
          <img
            src="/profile.png"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box>
        <Typography variant="h2">Projects</Typography>
        <Posts posts={posts.filter((post) => post.metadata?.tag == Tag.Project)} />
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box>
        <Typography variant="h2">Notes</Typography>
        <Posts posts={posts.filter((post) => post.metadata?.tag == Tag.Note)} />
      </Box>
    </Container>
  );
};
export const getStaticProps = (async () => {
  const posts = await getMarkdownPosts();

  // Fetch markdown content for "About" section from filesystem.
  const file = fs.readFileSync(path.join(CONTENT_DIR, ABOUT_FILE), "utf-8");
  const { content: blurb } = matter(file);

  return {
    props: {
      blurb: blurb,
      posts: posts.filter((post) => post && post.metadata)
    },
  };
}) satisfies GetStaticProps<{ blurb: string, posts: PostProps[] }>;
