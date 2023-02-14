import Seo from "../../components/Seo";
import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getPopularList,
  getSearchList,
  IGetListResult,
  IGetSearchResult,
} from "../../api/youTubeApi";
import { useScroll, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../../components/Loader";
import YouTubeList from "../../components/youTube/YouTubeList";

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
const Search = styled.form`
  color: black;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 1rem;
  justify-content: right;
  svg {
    height: 25px;
  }
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: 1;
  color: black;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid white;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 2px;
  border-radius: 15px;
`;
interface IForm {
  keyword: string;
}

export default function Video() {
  const { scrollYProgress } = useScroll();
  const [keyword, setKeyword] = useState<string>();
  const { data, fetchNextPage, refetch, isLoading } = useInfiniteQuery<
    IGetListResult | IGetSearchResult
  >(
    ["videosPage"],
    ({ pageParam }) =>
      !!keyword
        ? getSearchList({
            q: encodeURIComponent(keyword),
            pageToken: pageParam,
          })
        : getPopularList({
            maxResults: 16,
            videoCategoryId: 15,
            pageToken: pageParam,
          }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
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

  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const { register, handleSubmit } = useForm<IForm>();
  const onVaild = (data: IForm) => {
    setKeyword(data.keyword);
  };

  useEffect(() => {
    refetch();
  }, [keyword, refetch]);

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({ scaleX: 0 });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  return (
    <Container id="ctn">
      <Seo title="영상s" />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid>
            <div style={{ gridColumn: "span 4" }}>
              <Search onSubmit={handleSubmit(onVaild)}>
                <motion.svg
                  onClick={toggleSearch}
                  animate={{ x: searchOpen ? -215 : 0 }}
                  transition={{ type: "linear" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ zIndex: "2" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </motion.svg>
                <Input
                  {...register("keyword", { required: false })}
                  transition={{ type: "linear" }}
                  initial={{ scaleX: 0 }}
                  animate={inputAnimation}
                  placeholder="Search..."
                />
              </Search>
              {data?.pages.map((page, i) => (
                <YouTubeList key={i} data={page} />
              ))}
            </div>
          </Grid>
        </>
      )}
    </Container>
  );
}
