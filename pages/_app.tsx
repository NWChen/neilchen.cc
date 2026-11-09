import type { AppProps } from 'next/app'
import React from 'react';
import './styles.css';
import 'highlight.js/styles/github.css';
import { Analytics } from "@vercel/analytics/react"
import { ColorModeProvider } from '../lib/ColorModeContext';

function App({ Component, pageProps }: AppProps) {
  return <>
    <Analytics />
    <ColorModeProvider>
      <Component {...pageProps} />
    </ColorModeProvider>
  </>
}

export default App;
