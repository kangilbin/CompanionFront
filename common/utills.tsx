export const elapsedTime = (date: string) => {
  const start = +new Date(date);
  const end = +new Date();

  const diff = (end - start) / 1000;

  const times = [
    { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
    { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
    { name: "일", milliSeconds: 60 * 60 * 24 },
    { name: "시간", milliSeconds: 60 * 60 },
    { name: "분", milliSeconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return "방금 전";
};

export const dateFormat = (dt: string) => {
  let day = ["일", "월", "화", "수", "목", "금", "토"];

  let date = new Date(dt);

  let dateFormat =
    date.getFullYear() +
    "년 " +
    (date.getMonth() + 1) +
    "월 " +
    date.getDate() +
    "일 " +
    day[date.getDay()] +
    "요일 ";

  return dateFormat;
};
