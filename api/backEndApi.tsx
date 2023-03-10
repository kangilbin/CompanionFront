import axios from "axios";

const BOARD_PATH = "/board";
const COMMENT_PATH = "/comment";

export async function communityWrite(param: any) {
  return axios
    .post(`${BOARD_PATH}/community/write`, {
      ...param,
    })
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

export async function commentInsert(obj: any) {
  return axios
    .post(`${COMMENT_PATH}/${obj.type}`, {
      ...obj,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log("오류 발생 : ", error.response.status);
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}
