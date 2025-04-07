import { Container, Typography } from "@mui/material";
import { marked } from "marked";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";
import path from "path";
import React from "react";
import fs from "fs";
import { CONTENT_DIR } from "../../lib/constants";
import matter from "gray-matter";
import Header from "../../components/Header";
import { PostProps, PostMetadata } from "../../lib/post";

export default function Post({ metadata, content }: PostProps) {
  return (
    <>
      <Head>
        <title>{metadata.slug}</title>
      </Head>
      <Header/>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h1" gutterBottom>
          {metadata.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          {metadata.date}
        </Typography>
        {metadata.image_path && (
          <img
            src={metadata.image_path}
            alt={metadata.title}
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "2rem",
            }}
          />
        )}
        <Typography component="div" variant="body1">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        </Typography>
      </Container>
    </>
  );
}

// TODO clean this up
export const getStaticPaths = (async () => {
  return {
    paths: fs.readdirSync(CONTENT_DIR).map((filename) => ({
      params: {
        slug: filename.replace('.md', '')
      }
    })),
    fallback: false,
  }
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  if (!params) {
    console.log("Missing params.");
  }
  const file = fs.readFileSync(path.join(CONTENT_DIR, `${params?.slug}.md`), "utf-8");
  const { data: metadata, content } = matter(file);
  return {
    props: {
      metadata: metadata as PostMetadata,
      content
    }
  };
}) satisfies GetStaticProps<{ metadata: PostMetadata; content: string }>;
