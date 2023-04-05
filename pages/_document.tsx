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
          <meta name="og:site_name" content="간택당한 집사s" />
          <meta
            name="og:description"
            content="유기 동물 정보와 반려동물 관련 정보를 얻을 수 있는 커뮤니트 사이트입니다."
          />
          <meta
            name="keywords"
            content="유기동물, 반려동물, 입양, 보호, 반려동물 커뮤니티"
          />
          <meta
            name="og:image"
            content="https://source.unsplash.com/1600x900/?pet,care,issues"
          />
          <script
            src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
            async
          />
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
