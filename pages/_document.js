import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Videojs script */}
        <link
          rel="stylesheet"
          href="//vjs.zencdn.net/7.10.2/video-js.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
