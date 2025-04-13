import { List, ListItem, Box, Typography, Link } from "@mui/material";
import React from "react";

export default function Posts({
  posts,
}) {
  return (
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
  );
}
