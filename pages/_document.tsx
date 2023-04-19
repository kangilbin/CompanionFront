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
          <meta
            name="naver-site-verification"
            content="a46aad79ff18796e502e2aafda992b17462d2d9c"
          />
          <meta
            name="google-site-verification"
            content="gW9YjrTjvGhDD5OE7l9st-7oN2N2yHrNFFj8O97V_u4"
          />
          <script
            type="text/javascript"
            defer
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services&autoload=false`}
          />
          <script
            src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
            async
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
