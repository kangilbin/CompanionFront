import Head from "next/head";
interface IProps {
  title: string;
  description: string;
  url: string;
}

export default function Seo({ title, description, url }: IProps) {
  return (
    <Head>
      <title>{`${title}`}</title>
      <meta name="og:site_name" content="간택당한 집사s" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || "간택당한 집사s"} />
      <meta
        name="og:description"
        content={
          description ||
          "유기 동물 정보와 반려동물 관련 정보를 얻을 수 있는 커뮤니트 사이트입니다."
        }
      />
      <meta
        name="keywords"
        content="유기동물, 반려동물, 입양, 보호, 반려동물 커뮤니티"
      />
      <meta property="og:url" content={url || "https://www.meowbow.shop"} />

      <meta
        name="og:image"
        content="https://source.unsplash.com/1600x900/?pet,care,issues"
      />
    </Head>
  );
}
