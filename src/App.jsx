import { Button, Container, Typography, Box, Divider, List, ListItem } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Container maxWidth="md">
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
            <Button variant="text" color="primary">
              Blog
            </Button>
            <Button variant="text" color="primary">
              Contact
            </Button>
            <Button variant="text" color="primary">
              GitHub
            </Button>
            <Button variant="text" color="primary">
              LinkedIn
            </Button>
          </Box>
          <Box>
            <Typography variant="body1">
              Hello, I'm Neil! I'm currently a software engineer working on{" "}
              <a href="https://earth.google.com/web/">Earth</a> and{" "}
              <a href="https://sustainability.google/">
                tools for sustainability
              </a>{" "}
              at Google in NYC.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Previously, I worked in{" "}
              <a href="https://www.goldmansachs.com/what-we-do/ficc-and-equities/gset-equities">
                Goldman Sachs' Electronic Trading
              </a>{" "}
              division and its Structured Products spinout{" "}
              <a href="https://www.simonmarkets.com/simon/">SIMON</a>.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Before that, I studied computer science at Columbia University,
              where I also built robot hardware and software.
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
        <List>
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
        </List>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box>
        <Typography variant="h2">Notes</Typography>
      </Box>
    </Container>
  );
}

export default App;
