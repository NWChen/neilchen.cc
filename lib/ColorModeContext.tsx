import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

type ColorMode = "light" | "dark";

const ColorModeContext = createContext({
  mode: "light" as ColorMode,
  toggleColorMode: () => {},
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ColorMode>("light");

  // On mount, read saved preference or system preference
  useEffect(() => {
    const saved = localStorage.getItem("color-mode") as ColorMode | null;
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("color-mode", next);
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#8ab4f8" : "#1a0dab",
          },
          ...(mode === "dark"
            ? {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
              }
            : {}),
        },
        typography: {
          fontFamily: "'EB Garamond', 'Garamond', 'Cormorant Garamond', serif",
        },
        components: {
          MuiLink: {
            styleOverrides: {
              root: {
                color: mode === "dark" ? "#8ab4f8" : "#1a0dab",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
