import styled from "styled-components";
import Link from "next/link";
import { SlPencil } from "react-icons/sl";
import { HiSearch, HiSortDescending } from "react-icons/hi";
import Seo from "./../../components/Seo";
import { useInfiniteQuery } from "@tanstack/react-query";
import { communityList } from "../../api/backEndApi";
import Loader from "./../../components/Loader";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import BoardCard from "../../components/community/BoardCard";
import { useRouter } from "next/router";
import { getCookie } from "../../common/utills";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  top: 3rem;
  padding: 10px;
`;

const GridHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  border-bottom: 1px solid #d6d6d6;
`;

const GridBody = styled.div`
  display: grid;
  @media screen and (min-width: 1100px) {
    .board-list:nth-child(2n + 1) {
      border-right: 1px solid #d6d6d6;
    }
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const GridSearch = styled.div`
  text-align: center;
  padding: 15px;
  border-bottom: 1px solid #d6d6d6;

  .searchIcon {
    position: relative;
    left: 25px;
    top: 3px;
    color: ${(props) => props.theme.btnColor};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.pointColor};
    }
  }
`;

const Page = styled.div`
  cursor: pointer;
  padding: 8px;
  border: 1px solid;
  border-radius: 5px;
  background-color: ${(props) => props.theme.pointColor};
  font-weight: bold;
  color: white;
  font-family: "Noto Sans KR";
  &:hover {
    background-color: #00c3ff;
  }
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 25px;
  padding-left: 40px;
  border: 1px solid ${(props) => props.theme.btnColor};
  height: 30px;
  font-family: auto;
`;

const Sort = styled.div`
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  font-family: "Noto Sans KR";
`;

const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
`;

const SortList = styled(motion.ul)`
  position: absolute;
  margin-top: 10px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  cursor: pointer;
  border-radius: 5px;
  z-index: 1;
  background: white;
  list-style-type: none;
  padding: 0px;
`;

const Sortli = styled.li`
  padding: 10px 18px;
  border-bottom: 1px solid #d6d6d6;
  &:hover {
    border-bottom: 1px solid ${(props) => props.theme.pointColor};
    color: #00c3ff;
    font-weight: bold;
  }
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-family: "Jua";
`;

const sortVariants = {
  initial: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  leaving: { opacity: 0, scale: 0, y: -30 },
};

export default function Community() {
  const { scrollYProgress } = useScroll();
  const [keyword, setKeyword] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [sortText, setSortText] = useState("최신순");
  const [sort, setSort] = useState("reg_time");
  const outside = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { isLoading, data, fetchNextPage, refetch } = useInfiniteQuery<any>(
    ["community_list"],
    ({ pageParam = 0 }) => communityList(pageParam, keyword, sort),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    scrollYProgress.onChange(() => {
      if (scrollYProgress.get() > 0.9) {
        fetchNextPage();
      }
    });
  }, [scrollYProgress, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [sort, refetch]);
  function onSubmit() {
    refetch();
  }
  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      onSubmit();
    }
  }
  function onClickSort(event: any) {
    setSortText(event.target.innerText);
    setSort(event.target.attributes[0].value);
    setIsSort(false);
  }
  const wirtePage = () => {
    if (Boolean(getCookie("token"))) {
      router.push("/community/write");
    } else {
      router.push("/login");
    }
  };
  return (
    <Container
      onClick={(e: any) => {
        if (isSort && (!outside.current || !outside.current.contains(e.target)))
          setIsSort(false);
      }}
    >
      <Seo
        title="커뮤니티s"
        description="반려동물 커뮤니티 페이지"
        url="https://www.meowbow.shop/community"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
          <GridHead>
            <Page onClick={wirtePage}>
              <SlPencil style={{ marginRight: "5px" }} />
              작성하기
            </Page>
            <Title>커뮤니티</Title>
            <div>
              <Sort onClick={() => setIsSort((prev) => !prev)}>
                <HiSortDescending style={{ marginRight: "5px" }} />
                <span>{sortText}</span>
              </Sort>
              <AnimatePresence>
                {isSort && (
                  <SortList
                    variants={sortVariants}
                    initial="initial"
                    animate="visible"
                    exit="leaving"
                    onClick={onClickSort}
                  >
                    <Sortli
                      value="reg_time"
                      className={sort === "reg_time" ? "sort_active" : ""}
                    >
                      최신순
                    </Sortli>
                    <Sortli
                      value="hits"
                      className={sort === "hits" ? "sort_active" : ""}
                    >
                      조회순
                    </Sortli>
                    <Sortli
                      value="likes"
                      className={sort === "likes" ? "sort_active" : ""}
                    >
                      추천순
                    </Sortli>
                    <Sortli
                      value="comments"
                      className={sort === "comments" ? "sort_active" : ""}
                    >
                      댓글순
                    </Sortli>
                  </SortList>
                )}
              </AnimatePresence>
            </div>
          </GridHead>
          <GridSearch>
            <HiSearch className="searchIcon" onClick={onSubmit} />
            <Input
              type="text"
              placeholder="Search..."
              onKeyPress={onKeyPress}
              onChange={(e) => setKeyword(e.currentTarget.value)}
            />
          </GridSearch>
          <GridBody>
            {data?.pages.map((page, i) => (
              <BoardCard key={i} page={page} />
            ))}
          </GridBody>
        </Grid>
      )}
    </Container>
  );
}
