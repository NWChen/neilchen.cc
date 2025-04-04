import type { AppProps } from 'next/app'
import React from 'react';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App;
