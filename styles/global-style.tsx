import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
.ifr_youtube {
  border-radius: 15px 15px 0px 0px;
}
.react-calendar {
  width: 400px;
  max-width: 100%;
  background-color: #fff;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
  font-family: "Noto Sans KR";
  line-height: 1.125em;
  border:none;
}
.react-calendar__navigation button {
  color: #00c3ff;
  min-width: 44px;
  background: none;
  font-size: 16px;
  margin-top: 8px;
}
.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
  background-color: #f8f8fa;
}
.react-calendar__navigation button[disabled] {
  background-color: #f0f0f0;
}
abbr[title] {
  text-decoration: none;
}
.react-calendar__month-view__days__day--weekend {
    color: #d10000;
   }
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background: #f8f8fa;
  color: #00c3ff;
  border-radius: 6px;
}
.react-calendar__tile--now {
  background: #9bf3f033;
  border-radius: 6px;
  font-weight: bold;
  color: #00c3ff;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #9bf3f033;
  border-radius: 6px;
  font-weight: bold;
  color: #00c3ff;
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: #f8f8fa;
}
.react-calendar__tile--active {
  background: #00c3ff;
  border-radius: 6px;
  font-weight: bold;
  color: white;
}
.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
  background: #00c3ff;
  color: white;
}
.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #f8f8fa;
}
.react-calendar__tile--range {
  background: #f8f8fa;
  color: #00c3ff;
  border-radius: 0;
}
.react-calendar__tile--rangeStart {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background: #00c3ff;
  color: white;
}
.react-calendar__tile--rangeEnd {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background: #00c3ff;
  color: white;
}
.sort_active {
  border-bottom: 1px solid #abe2f3;
  color: #00c3ff;
  font-weight: bold;
}
.stop-scroll{
  height: 100%;
  overflow: hidden;
}
input, textarea {
  border: 1px solid #dddddd !important;
  letter-spacing: -0.04rem;
  &:focus {
    outline: 2px solid #abe2f3;
  }
  &::placeholder {
    color: #e2e2e2;
  }
}
`;
