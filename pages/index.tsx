import Seo from "./../components/Seo";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getPopularList, IGetListResult } from "../api/youTubeApi";
import Loader from "./../components/Loader";
import YouTubeList from "../components/youTube/YouTubeList";
import { NewsList } from "../api/naverApi";
import { IGetNewsListResult } from "./../api/naverApi";
import News from "../components/News";
import Link from "next/link";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100vh;
  position: relative;
  padding: 10px;
`;

const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  padding-bottom: 50px;
`;

const Board = styled.div`
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
  border-radius: 20px;
  margin: 20px;
  width: 100%;
  height: 100%;
`;

const SubText = styled.div`
  font-family: "Dongle", sans-serif;
  font-size: 1.5rem;
  justify-content: space-between;
  display: flex;
  padding: 5px;
`;

const BoardGrid = styled.div`
  margin: 20px 0px 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 350px;
  grid-column: span 4;
`;
const BoardTitle = styled.div`
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 20px 20px 0px 0px;
  padding: 10px;
  font-family: "Dongle", sans-serif;
  font-size: 1.5rem;
  color: ${(props) => props.theme.bgColor};
  text-align: center;
`;

const BoardCtt = styled.li`
  padding: 10px;
  font-family: "Jua", sans-serif;
  border-bottom: 1px solid ${(props) => props.theme.pointColor};
  &:hover {
    background-color: ${(props) => props.theme.btnColor};
  }
  cursor: pointer;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const AddBoard = styled.span`
  cursor: pointer;
  &:hover {
    text-shadow: 2px 2px 2px rgb(184 229 240);
    color: #a39595;
  }
`;

export default function Main() {
  const { data: vData, isLoading: isVLoading } = useQuery<IGetListResult>(
    ["videos"],
    () => getPopularList({ maxResults: 4, videoCategoryId: 15 }),
    { refetchOnWindowFocus: false, staleTime: 5000 }
  );

  const { data: nData, isLoading: isNLoading } = useQuery<IGetNewsListResult>(
    ["news"],
    NewsList,
    { refetchOnWindowFocus: false, staleTime: 5000 }
  );

  return (
    <Container id="ctn">
      <Seo title="???????????? ??????s" />
      {isVLoading && isNLoading ? (
        <Loader />
      ) : (
        <>
          <Grid>
            <div style={{ gridColumn: "span 4" }}>
              <SubText>
                <span>Best ??????</span>
                <Link
                  href="/videos"
                  style={{ textDecorationLine: "blink", color: "black" }}
                >
                  <AddBoard>?????????</AddBoard>
                </Link>
              </SubText>
              <YouTubeList data={vData} />
            </div>
            <BoardGrid>
              <Board>
                <BoardTitle>???????????? ?????????</BoardTitle>
                <ul>
                  <BoardCtt>1??? ???????????? ??????</BoardCtt>
                  <BoardCtt>2??? ???????????? ??????</BoardCtt>
                  <BoardCtt>3??? ???????????? ?????????</BoardCtt>
                  <BoardCtt>4??? ???????????? ????????????</BoardCtt>
                  <BoardCtt>5??? ?????? ?????????</BoardCtt>
                </ul>
              </Board>
            </BoardGrid>
          </Grid>
          <Grid>
            <div style={{ gridColumn: "span 4" }}>
              <SubText>?????? ??????</SubText>
              <NewsGrid>
                <News data={nData} />
              </NewsGrid>
            </div>
          </Grid>
        </>
      )}
    </Container>
  );
}
