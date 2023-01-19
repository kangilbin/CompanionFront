import { IGetNewsListResult } from "../api/naverApi";
import styled from "styled-components";
import { elapsedTime } from "./../common/utills";
import { HiOutlineNewspaper } from "react-icons/hi";

interface IProps {
  data?: IGetNewsListResult;
}

const NewsItem = styled.div`
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
  border-radius: 20px;
  align-self: center;
  height: 100%;
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 5px 3px rgb(184 229 240);
  }
`;

const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 15px;
  font-family: "Noto Sans KR";
  height: 35%;
`;

const NewsTitle = styled.div`
  padding: 15px;
  font-family: "Noto Sans KR";
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 2px solid ${(props) => props.theme.text2Color};
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 9fr;
`;
const Test = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Date = styled.div`
  padding: 15px;
  font-family: "Noto Sans KR";
  text-align: right;
  font-weight: bold;
  color: ${(props) => props.theme.text2Color};
`;

export default function NewsList({ data }: IProps) {
  const options = `top=${(window.screen.height - 700) / 2}, left=${
    (window.screen.width - 600) / 2
  }, width=600, height=700, status=no, menubar=no, toolbar=no, resizable=no`;
  return (
    <>
      {data?.items.map((news, i) => (
        <NewsItem
          key={i}
          onClick={() => window.open(news.link, "뉴스", options)}
        >
          <NewsTitle>
            <HiOutlineNewspaper size="2em" style={{ paddingRight: "10px" }} />
            <Test dangerouslySetInnerHTML={{ __html: news.title }}></Test>
          </NewsTitle>
          <Ellipsis
            dangerouslySetInnerHTML={{ __html: news.description }}
          ></Ellipsis>
          <Date>{elapsedTime(news.pubDate)}</Date>
        </NewsItem>
      ))}
    </>
  );
}
