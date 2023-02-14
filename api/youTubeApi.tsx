import axios from "axios";

const BASE_PATH = "/api/youtube";

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
    .post(`${BASE_PATH}/videos`, {
      part: "snippet",
      chart: "mostPopular",
      regionCode: "kr",
      ...obj,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.status);
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}
export async function getSearchList(obj: any) {
  return axios
    .post(`${BASE_PATH}/search`, {
      part: "snippet",
      regionCode: "kr",
      maxResults: 16,
      videoCategoryId: 15,
      videoSyndicated: true,
      type: "video",
      ...obj,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.status);
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}
