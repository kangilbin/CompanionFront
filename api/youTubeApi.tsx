import axios from "axios";

const API_KEY = "AIzaSyD_PGEEvCjbHMoEBRYtPTxBeXAasWHO6As";
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

export interface ISVideo {
  kind: string;
  etag: string;
  id: ISId;
  snippet: ISnippet;
}
interface ISId {
  kind: string;
  videoId: string;
}

export interface IGetSearchResult {
  kind: string;
  etag: string;
  items: ISVideo[];
  nextPageToken?: string;
}

export async function getPopularList(obj: any) {
  return axios
    .get(`${BASE_PATH}/videos`, {
      params: {
        part: "snippet",
        chart: "mostPopular",
        regionCode: "kr",
        key: API_KEY,
        ...obj,
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
export async function getSearchList(obj: any) {
  return axios
    .get(`${BASE_PATH}/search`, {
      params: {
        part: "snippet",
        regionCode: "kr",
        maxResults: 16,
        videoCategoryId: 15,
        key: API_KEY,
        videoSyndicated: true,
        type: "video",
        ...obj,
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
