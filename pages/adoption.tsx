import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { animalList } from "../api/animalApi";
import Seo from "../components/Seo";
import { IGetAbandonedList } from "../api/animalApi";
import Loader from "./../components/Loader";
import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import AnimalCard from "../components/adoption/AnimalCard";
import AnimalSearch from "./../components/adoption/AnimalSearch";
import AnimalDetail from "../components/adoption/AnimalDetail";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100vh;
  position: relative;
  padding: 10px;
  font-family: "Noto Sans KR";
`;
const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
`;
const Box = styled.div`
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 1.5rem;
`;

export default function Adoption() {
  const [obj, setObj] = useState({});
  const { scrollYProgress } = useScroll();

  const { data, fetchNextPage, isLoading, isFetching, refetch } =
    useInfiniteQuery<IGetAbandonedList>(
      ["animals"],
      ({ pageParam }) => animalList({ ...obj, pageNo: pageParam }),
      {
        getNextPageParam: (lastPage) => {
          if (
            document.getElementsByClassName("imgBox").length <
            lastPage.response.body.totalCount
          ) {
            return lastPage.response.body.pageNo + 1;
          } else {
            return undefined;
          }
        },
        refetchOnWindowFocus: false,
        staleTime: 5000,
      }
    );
  useEffect(() => {
    scrollYProgress.onChange(() => {
      if (scrollYProgress.get() === 1) {
        fetchNextPage();
      }
    });
  }, [scrollYProgress, fetchNextPage]);

  function objFun(obj: any) {
    setObj(obj);
  }

  useEffect(() => {
    refetch();
  }, [obj, refetch]);
  return (
    <Container>
      <Seo title="유기동물s" />
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          <Grid>
            <AnimalSearch objFun={objFun} />
            <Box>
              {data?.pages.map((page, i) => (
                <AnimalCard data={page} key={i} />
              ))}
            </Box>
          </Grid>
          <AnimalDetail />
        </>
      )}
    </Container>
  );
}
