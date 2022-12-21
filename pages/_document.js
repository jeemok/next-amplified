import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          {/* Videojs script */}
          <link
            rel="stylesheet"
            href="//vjs.zencdn.net/7.10.2/video-js.min.css"
          />
          <link
            href="https://d2qfs6i220e922.cloudfront.net/Video JS/VideoJS/video-js-v1.css"
            rel="stylesheet"
          />
          <link
            href="https://d2qfs6i220e922.cloudfront.net/Video JS/Transcript/videojs-transcript-v1.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
