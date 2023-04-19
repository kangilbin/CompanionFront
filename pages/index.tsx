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
import { getCookie } from "../common/utills";

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

const SubText = styled.div`
  font-family: "Dongle", sans-serif;
  font-size: 1.5rem;
  justify-content: space-between;
  display: flex;
  padding: 5px;
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
      <Seo
        title="간택당한 집사s"
        description="유기 동물 정보와 반려동물 관련 정보를 얻을 수 있는 커뮤니트 사이트입니다."
        url="https://www.meowbow.shop"
      />
      {isVLoading && isNLoading ? (
        <Loader />
      ) : (
        <>
          <Grid>
            <div style={{ gridColumn: "span 4" }}>
              <SubText>
                <span>Best 영상</span>
                <Link
                  href="/videos"
                  style={{ textDecorationLine: "blink", color: "black" }}
                >
                  <AddBoard>더보기</AddBoard>
                </Link>
              </SubText>
              <YouTubeList data={vData} />
            </div>
          </Grid>
          <Grid>
            <div style={{ gridColumn: "span 4" }}>
              <SubText>최신 뉴스</SubText>
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
