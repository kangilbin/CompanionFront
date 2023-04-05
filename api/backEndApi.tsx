import axios from "axios";
import { getCookie, setCookie } from "../common/utills";
import moment from "moment";

const BOARD_PATH = "/board";
const COMMENT_PATH = "/comment";
const LOSE_PATH = "/lose";
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
          Authorization: `Bearer ${getCookie("token")}`,
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
export async function likesIncrease(id: string) {
  // return axios
  //   .get(`${BOARD_PATH}/community/read/${id}`)
  //   .then((response) => response.data)
  //   .catch((error) => {
  //     console.log("오류 발생 : ", error.response.status);
  //     if (error.response.status === 404) {
  //       //window.location.href = "/404";
  //     }
  //   });
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
          Authorization: `Bearer ${getCookie("token")}`,
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

// 댓글 삭제
export async function commentDelete({
  board_id,
  parent_comment_id,
  comment_id,
}: {
  board_id: string;
  parent_comment_id?: number;
  comment_id?: number;
}) {
  return axios
    .put(
      `${COMMENT_PATH}/del`,
      {
        board_id,
        parent_comment_id,
        comment_id,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 404) {
        //window.location.href = "/404";
      } else if (error.response.status === 403) {
        window.location.href = "/";
      }
    });
}

// 댓글 수정
export async function commentUpdate(
  comment_id?: number,
  parent_comment_id?: number,
  content?: string
) {
  return axios
    .put(
      `${COMMENT_PATH}/del`,
      {
        parent_comment_id,
        comment_id,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
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
      setCookie("token", response.data.token, {
        path: "/",
        sameSite: "strict",
      });
      setCookie("id", response.data.id, {
        path: "/",
        sameSite: "strict",
      });
      window.location.href = "/";
    })
    .catch((error) => {
      if (error.response.status === 404) {
        //window.location.href = "/404";
      } else if (error.response.status === 400) {
        return error.response.status;
      }
    });
}

// 닉네임 중복 체크
export async function duplicate(nickname: string) {
  return axios
    .get(`${AUTH_PATH}/check`, { params: { nickname } })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status === 404) {
        //window.location.href = "/404";
      } else if (error.response.status === 400) {
        return error.response.status;
      }
    });
}

export interface IJoin {
  user_name: string;
  id: string;
  nickname: string;
  phone: string;
  password: string;
  addr?: string;
  zip_no?: string;
  addr_detail?: string;
}

// 회원가입
export async function join(param: IJoin) {
  return axios
    .post(`${AUTH_PATH}/join`, { ...param })
    .then(() => {
      login({ id: param.id, pw: param.password });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        //window.location.href = "/404";
      } else if (error.response.status === 400) {
        alert(error.response.data.error);
      }
    });
}

export interface ISBoard {
  title: string;
  ctt: string;
  type: string;
  sido?: string;
  sigungu?: string;
  dong?: string;
  addr?: string;
  img?: [];
  date: string;
  latitude?: string;
  longitude?: string;
}

// 찾습니다 게시판 글 등록
export async function loseInsert(param: ISBoard) {
  return axios
    .post(
      `${BOARD_PATH}/lose/write`,
      {
        id: moment().format("YYYYMMDDHHmmss"),
        title: param.title,
        ctt: param.ctt,
        type: param.type,
        sido: param.sido,
        sigungu: param.sigungu,
        dong: param.dong,
        addr: param.addr,
        img: JSON.stringify(param.img),
        date: param.date,
        latitude: param.latitude,
        longitude: param.longitude,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    )
    .then(() => {
      alert("작성 완료");
      window.location.href = "/lose";
    })
    .catch((error) => {
      if (error.response.status === 404) {
        //window.location.href = "/404";
      } else if (error.response.status === 400) {
        alert(error.response.data.error);
      }
    });
}

// 찾습니다 게시글 목록 조회
export async function loseList(
  keyword: string,
  page: number,
  type: string,
  start: string,
  end: string,
  sido: string,
  sigungu: string
) {
  return axios
    .get(`${BOARD_PATH}/lose/list`, {
      params: { keyword, page, type, start, end, sido, sigungu },
    })
    .then((response) => {
      const obj = { data: response.data, page };
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
export async function loseRead(id: string) {
  return axios
    .get(`${BOARD_PATH}/lose/read/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log("오류 발생 : ", error.response.status);
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}
