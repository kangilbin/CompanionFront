import Seo from "./../components/Seo";
import styled from "styled-components";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getSearchList, IGetListResult } from "./../api/youTubeApi";
import Loader from "./../components/Loader";
import YouTubeList from "./../components/YoutubeList";
import { useScroll } from "framer-motion";
import { useEffect } from "react";

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
  const { scrollYProgress } = useScroll();
  const { data, fetchNextPage } = useInfiniteQuery<IGetListResult>(
    ["videosPage"],
    ({ pageParam }) => getSearchList(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    }
  );
  useEffect(() => {
    scrollYProgress.onChange(() => {
      if (scrollYProgress.get() === 1) {
        fetchNextPage();
      }
    });
  }, [scrollYProgress, fetchNextPage]);

  return (
    <Container id="ctn">
      <Seo title="간택당한 집사s" />

      <>
        <Grid>
          <div style={{ gridColumn: "span 4" }}>
            {data?.pages.map((page, i) => (
              <YouTubeList key={i} data={page} />
            ))}
          </div>
        </Grid>
      </>
    </Container>
  );
}
