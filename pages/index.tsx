import { FC } from "react";
import React from "react";
import {
  Button,
  Container,
  Box,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import path, { join } from "path";
import fs from "fs";
import { CONTENT_DIR, ABOUT_FILE } from "../lib/constants";
import matter from "gray-matter";
import { marked } from "marked";
import { GetStaticProps } from "next/types";

export type Content = {
  content: string; 
}

export default function Home({ content }: Content) {
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
              <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
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
        {/* <List>
          <ListItem>
            <Typography variant="body1">
              Analyzing 1.5 years of diary entries
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              Finding the brachistochrone with JAX
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              Building a T-shirt shooting robot
            </Typography>
          </ListItem>
        </List> */}
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box>
        <Typography variant="h2">Notes</Typography>
      </Box>
    </Container>
  );
};

export const getStaticProps = (async () => {
  console.log("enter static props");
  const file = fs.readFileSync(path.join(CONTENT_DIR, ABOUT_FILE), "utf-8");
  const { content: markdownContent } = matter(file);
  const props = {
    props: { content: markdownContent }
  };
  return props;
}) satisfies GetStaticProps<Content>;
