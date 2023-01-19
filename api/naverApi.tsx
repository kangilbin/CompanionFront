import axios from "axios";

const CLINET_ID = process.env.NEXT_PUBLIC_API_KEY_NAVER_ID;
const CLINET_PW = process.env.NEXT_PUBLIC_API_KEY_NAVER_PW;
const BASE_PATH = "/v1/search/news.json?";

interface INews {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
}

export interface IGetNewsListResult {
  items: INews[];
}

/*
    네이버의 경우 클라이언트단에서 API호출을 허용하지 않고있다. 프록시를 써서 CORS 오류를 해결하였지만, 
    추후 백엔드를 개발하면 변경 예정
*/
export async function NewsList() {
  return axios
    .get(`${BASE_PATH}`, {
      params: {
        query: "반려동물",
        sort: "sim",
        display: 4,
      },
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-Naver-Client-Id": CLINET_ID,
        "X-Naver-Client-Secret": CLINET_PW,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log("오류 발생", error.status);
      // catch 부분은 추후 에러 페이지 추가 후 해당 페이지로 이동
      if (error.status === 403) {
        //window.location.href = "/404";
      }
    });
}
