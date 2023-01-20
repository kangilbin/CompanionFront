import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY_YOUTUBE;
const BASE_PATH = "https://www.googleapis.com/youtube/v3";

export interface Iimg {
  url: string;
  width: number;
  height: number;
}
interface IThumbnail {
  default: Iimg;
  medium: Iimg;
  high: Iimg;
  standard: Iimg;
  maxres: Iimg;
}
interface ISnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: IThumbnail;
  channelTitle: string;
}

export interface IVideo {
  kind: string;
  etag: string;
  id: string;
  snippet: ISnippet;
}

interface IPage {
  totalResults: number;
  resultsPerPage: number;
}

export interface IGetListResult {
  kind: string;
  etag: string;
  items: IVideo[];
  nextPageToken?: string;
  pageInfo?: IPage;
}

export async function getPopularList() {
  return axios
    .get(`${BASE_PATH}/videos`, {
      params: {
        part: "snippet",
        chart: "mostPopular",
        regionCode: "kr",
        maxResults: 4,
        videoCategoryId: 15,
        key: API_KEY,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.status);
      // catch 부분은 추후 에러 페이지 추가 후 해당 페이지로 이동
      if (error.status === 403) {
        //window.location.href = "/404";
      }
    });
}

export async function getSearchList(token: string = "") {
  return axios
    .get(`${BASE_PATH}/videos`, {
      params: {
        part: "snippet",
        chart: "mostPopular",
        regionCode: "kr",
        maxResults: 16,
        videoCategoryId: 15,
        key: API_KEY,
        pageToken: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.status);
      // catch 부분은 추후 에러 페이지 추가 후 해당 페이지로 이동
      if (error.status === 403) {
        //window.location.href = "/404";
      }
    });
}
