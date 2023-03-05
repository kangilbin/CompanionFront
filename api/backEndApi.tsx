import axios from "axios";

const BASE_PATH = "/board";

export async function communityWrite(param: any) {
  return axios
    .post(`${BASE_PATH}/community/write`, {
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

export async function communtiyList(page: number) {
  return axios
    .get(`${BASE_PATH}/community/list`, { params: { page } })
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
