import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;

}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
}
ol, ul {
    list-style: none;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
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

`;
