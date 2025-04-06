import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link href="/" passHref>
              <Button sx={{ textTransform: 'none', fontSize: 'inherit', color: 'black' }}>
                Neil Chen
              </Button>
            </Link>
          </Typography>
          <Box>
            <Link href="/" passHref>
              <Button>Home</Button>
            </Link>
            <Link href="/blog" passHref>
              <Button>Blog</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
