import axios from "axios";

const BASE_PATH = "/api/news";

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

export async function NewsList() {
  return axios
    .get(`${BASE_PATH}`, {
      params: {
        query: "반려동물",
        sort: "sim",
        display: 4,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log("오류 발생", error.response.status);
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}
