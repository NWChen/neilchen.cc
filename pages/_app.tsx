import type { AppProps } from 'next/app'
import React from 'react';
import './styles.css';
import { Analytics } from "@vercel/analytics/react"

function App({ Component, pageProps }: AppProps) {
  return <>
    <Analytics />
    <Component {...pageProps} />
  </>
}

export default App;
