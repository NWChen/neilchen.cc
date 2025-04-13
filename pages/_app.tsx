import type { AppProps } from 'next/app'
import React from 'react';
import './styles.css';
import Script from 'next/script';

function App({ Component, pageProps }: AppProps) {
  return <>
    {/* Google tag (gtag.js) */}
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TN3LFVWBMK"></Script>
    <Script>
      {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TN3LFVWBMK');`}
    </Script>
    <Component {...pageProps} />
  </>
}

export default App;
