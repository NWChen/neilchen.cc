import { Container, Typography } from "@mui/material";
import Posts from "../Posts";
import { GetStaticProps } from "next/types";
import type { Post } from "../Posts";
import React from "react";

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h1" gutterBottom>
        Blog
      </Typography>
      <Posts posts={posts} />
    </Container>
  );
}

export { getStaticProps } from "../Posts";
