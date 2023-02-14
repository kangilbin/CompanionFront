import axios from "axios";

const BASE_PATH = "/api/animal";

export interface IGetAbandonedList {
  response: IResponse;
}
interface IResponse {
  header: IHeader;
  body: IBody;
}
interface IHeader {
  reqNo: number;
  resultCode: string;
  resultMsg: string;
}
interface IBody {
  items: IItems;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}
interface IItems {
  item: IItem[];
}

export interface ISItems {
  item: ISItem[];
}

export interface ISItem {
  orgCd: string;
  orgdownNm: string;
}

export interface IDItems {
  item: IDItem[];
}

interface IDItem extends ISItem {
  uprCd: string;
}

export interface IItem {
  desertionNo: string;
  filename: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  colorCd: string;
  age: string;
  weight: string;
  noticeNo: string;
  noticeSdt: string;
  noticeEdt: string;
  popfile: string;
  processState: string;
  sexCd: string;
  neuterYn: string;
  specialMark: string;
  careNm: string;
  careTel: string;
  careAddr: string;
  orgNm: string;
  chargeNm: string;
  officetel: string;
}

export async function animalList(obj: any) {
  return axios
    .post(`${BASE_PATH}/abandonmentPublic`, {
      numOfRows: 16,
      _type: "json",
      ...obj,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("오류 발생", error.status);
    });
}

export async function getSidoList() {
  return axios
    .get(`${BASE_PATH}/sido`, {
      params: {
        numOfRows: 100,
        _type: "json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log("오류 발생", error.status);
    });
}

export async function getSigunguList(code: string) {
  return axios
    .get(`${BASE_PATH}/sigungu`, {
      params: {
        upr_cd: code,
        _type: "json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log("오류 발생", error.status);
    });
}
