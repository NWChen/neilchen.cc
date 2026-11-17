import { Box, Typography, Link } from "@mui/material";
import React from "react";
import { PostProps } from "../lib/post";

export default function Posts({
  posts,
}) {
  const publicPosts: PostProps[] = posts.filter((post) => !post.metadata.hidden);
  return (
    <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
      {publicPosts.map((post) => (
        <Box
          component="li"
          key={post.metadata.slug}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "4.5rem 1fr" },
            columnGap: 2,
            py: 0.5,
            alignItems: "baseline",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontVariantNumeric: "tabular-nums", lineHeight: 1.4 }}
          >
            {post.metadata.date}
          </Typography>
          <Box>
            <Link href={`/blog/${post.metadata.slug ?? ""}`} sx={{ fontSize: "1.125rem" }}>
              {post.metadata.title}
            </Link>
            {post.metadata.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.95rem !important", lineHeight: 1.35 }}
              >
                {post.metadata.description}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
