import React from "react";
import {
  Button,
  Container,
  Box,
  Divider, IconButton, Typography
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useColorMode } from "../lib/ColorModeContext";
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
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Container maxWidth="md" sx={{ mt: 1, position: "relative" }}>
      <Box sx={{ position: "absolute", top: 0, right: 16 }}>
        <IconButton onClick={toggleColorMode} aria-label="Toggle dark mode">
          {mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Box>
      <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <img
          src="/profile.png"
          style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
        />
        <Typography variant="h1" sx={{ fontSize: "1.35rem !important" }}>
          Neil Chen
        </Typography>
      </Box>
      <Box sx={{ ml: -1, mt: 0.5 }}>
        <Button size="small" variant="text" color="primary" href="/blog">
          Blog
        </Button>
        <Button size="small" variant="text" color="primary" href="mailto:neilwchen@gmail.com">
          Contact
        </Button>
        <Button size="small" variant="text" color="primary" href="https://github.com/nwchen">
          GitHub
        </Button>
        <Button size="small" variant="text" color="primary" href="https://www.linkedin.com/in/neilwchen/">
          LinkedIn
        </Button>
        <Button size="small" variant="text" color="primary" href="https://www.strava.com/athletes/66448483">
          Strava
        </Button>
      </Box>
      <Typography
        component="div"
        variant="body2"
        sx={{
          fontSize: "0.95rem !important",
          "& p": { my: 0.5 },
          "& p, & li": { lineHeight: 1.35 },
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: marked(blurb) }} />
      </Typography>
      <Divider sx={{ my: 1.5 }} />
      <Box>
        <Typography variant="h2" sx={{ fontSize: "1.5rem !important", mb: 0.5 }}>Projects</Typography>
        <Posts posts={posts.filter((post) => post.metadata?.tag == Tag.Project)} />
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Box>
        <Typography variant="h2" sx={{ fontSize: "1.5rem !important", mb: 0.5 }}>Notes</Typography>
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
