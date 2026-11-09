import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
import { useColorMode } from "../lib/ColorModeContext";

export default function Header() {
  const { mode, toggleColorMode } = useColorMode();

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
              <Button sx={{ textTransform: 'none', fontSize: 'inherit', color: 'text.primary' }}>
                Neil Chen
              </Button>
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" passHref>
              <Button>Home</Button>
            </Link>
            <Link href="/blog" passHref>
              <Button>Blog</Button>
            </Link>
            <IconButton onClick={toggleColorMode} sx={{ ml: 1 }} aria-label="Toggle dark mode">
              {mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
