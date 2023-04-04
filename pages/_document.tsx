import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Jua&family=Dongle&family=Noto+Sans+KR:wght@300&display=swap"
            rel="stylesheet"
          />
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          ></meta>
          <script
            src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
            async
          />{" "}
          <script
            type="text/javascript"
            defer
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=3ac433d8c7d59fc4a01d7669bd060a06&libraries=services&autoload=false`}
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

export default MyDocument;
