import axios from "axios";
import { getCookie, setCookie } from "../common/utills";

const BOARD_PATH = "/board";
const COMMENT_PATH = "/comment";
const AUTH_PATH = "/auth";

// 커뮤니티 글 등록
export async function communityWrite(param: any) {
  return axios
    .post(
      `${BOARD_PATH}/community/write`,
      {
        ...param,
      },
      {
        headers: {
          Authorization: getCookie("userInfo").token,
        },
      }
    )
    .then((response) => {
      if (response.data) {
        alert("작성 완료");
        window.location.href = "/community";
      }
    })
    .catch((error) => {
      console.log("오류 발생", error.response.status);
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}

// 커뮤니트 게시글 목록 조회
export async function communityList(
  page: number,
  keyword: string,
  sort: string
) {
  return axios
    .get(`${BOARD_PATH}/community/list`, { params: { page, keyword, sort } })
    .then((response) => {
      const obj = { data: response.data.content, page };
      return obj;
    })
    .catch((error) => {
      console.log("오류 발생 : ", error.response.status);
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}

// 커뮤니티 게시글 내용 조회
export async function communityRead(id: string) {
  return axios
    .get(`${BOARD_PATH}/community/read/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log("오류 발생 : ", error.response.status);
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}

// 커뮤니티 댓글 조회
export async function communityComments(id: string) {
  return axios
    .get(`${COMMENT_PATH}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log("오류 발생 : ", error.response.status);
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}

// 커뮤니티 댓글 등록
export async function commentInsert(obj: any) {
  return axios
    .post(
      `${COMMENT_PATH}/${obj.type}`,
      {
        ...obj,
      },
      {
        headers: {
          Authorization: getCookie("userInfo").token,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //window.location.href = "/404";
      } else if (error.response.status === 403) {
        window.location.href = "/";
      }
    });
}

// 로그인
export async function login({ id, pw }: { id: string; pw: string }) {
  return axios
    .post(`${AUTH_PATH}/login`, {
      id,
      password: pw,
    })
    .then((response) => {
      setCookie("userInfo", response.data, {
        path: "/",
        sameSite: "strict",
      });
      window.location.href = "/";
    })
    .catch((error) => {
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}
