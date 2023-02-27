import axios from "axios";

const BASE_PATH = "/board";

export async function communityWrite(param: any) {
  return axios
    .post(`${BASE_PATH}/community/write`, {
      ...param,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log("오류 발생", error.response.status);
      // catch 부분은 추후 에러 페이지 추가 후 해당 페이지로 이동
      if (error.response.status === 404) {
        //window.location.href = "/404";
      }
    });
}
