import Seo from "./../components/Seo";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getSearchList, IGetListResult } from "./../api/youTubeApi";
import Loader from "./../components/Loader";
import YouTubeList from "./../components/YoutubeList";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100vh;
  position: relative;
  top: 3rem;
  padding: 10px;
`;

const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  padding-bottom: 50px;
`;

export default function Video() {
  const { data: vData, isLoading: isVLoading } = useQuery<IGetListResult>(
    ["videos"],
    getSearchList
  );

  return (
    <Container id="ctn">
      <Seo title="간택당한 집사s" />
      {isVLoading ? (
        <Loader />
      ) : (
        <>
          <Grid>
            <div style={{ gridColumn: "span 4" }}>
              <YouTubeList data={vData} />
            </div>
          </Grid>
        </>
      )}
    </Container>
  );
}
