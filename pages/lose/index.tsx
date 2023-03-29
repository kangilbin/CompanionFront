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
import DatePicker from "../../components/DatePicker";

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

const Page = styled.a`
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

const Search = styled.div`
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  & > svg {
    height: 1.5rem;
    width: 1.5rem;
  }
  &:hover {
    color: ${(props) => props.theme.pointColor};
  }
`;

const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
`;

const SearchData = styled(motion.div)`
  position: absolute;
  margin-top: 10px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  cursor: pointer;
  border-radius: 5px;
  z-index: 1;
  background: white;
  list-style-type: none;
  width: 300px;
`;

const Title = styled.span`
  font-family: "Noto Sans KR";
  gap: 10px;
  display: flex;
`;
const TargetType = styled.span`
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  cursor: pointer;
  border-radius: 15px;
  font-weight: bold;
  padding: 0.3rem;

  &:hover {
    box-shadow: 0 1px 2px rgb(184 229 240);
  }
`;
const SearchText = styled.div`
  color: ${(props) => props.theme.btnColor};
  padding: 5px;
`;
const SelectBox = styled.select`
  border-radius: 10px;
  padding: 3px;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  text-align: center;
`;
const SearchBtn = styled.button`
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: #00c3ff;
  border: none;
  padding: 10px;
  width: 100%;
  &:active {
    background-color: #8ecbde;
  }
`;

const searchVariants = {
  initial: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, x: -250 },
  leaving: { opacity: 0, scale: 0, y: -100 },
};

export default function Community() {
  const { scrollYProgress } = useScroll();
  const [keyword, setKeyword] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [sortText, setSortText] = useState("최신순");
  const [sort, setSort] = useState("reg_time");
  const [searchData, setSearchData] = useState("ALL");
  const outside = useRef<HTMLDivElement>(null);

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
  return (
    <Container
      onClick={(e: any) => {
        if (isSort && (!outside.current || !outside.current.contains(e.target)))
          setIsSort(false);
      }}
    >
      <Seo title="찾습니다s" />
      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
          <GridHead>
            <Link href="/lose/write" legacyBehavior>
              <Page>
                <SlPencil style={{ marginRight: "5px" }} />
                작성하기
              </Page>
            </Link>
            <Title>
              <TargetType
                className={searchData === "ALL" ? "sort_active" : ""}
                onClick={() => setSearchData("ALL")}
              >
                전체
              </TargetType>
              <TargetType
                className={searchData === "MISS" ? "sort_active" : ""}
                onClick={() => setSearchData("MISS")}
              >
                실종
              </TargetType>
              <TargetType
                className={searchData === "PRT" ? "sort_active" : ""}
                onClick={() => setSearchData("PRT")}
              >
                보호
              </TargetType>
              <TargetType
                className={searchData === "LOOK" ? "sort_active" : ""}
                onClick={() => setSearchData("LOOK")}
              >
                목격
              </TargetType>
            </Title>
            <div>
              <Search onClick={() => setIsSort((prev) => !prev)}>
                <HiSearch />
              </Search>
              <AnimatePresence>
                {isSort && (
                  <SearchData
                    variants={searchVariants}
                    initial="initial"
                    animate="visible"
                    exit="leaving"
                    ref={outside}
                  >
                    <div style={{ padding: "10px" }}>
                      <SearchText>기간</SearchText>
                      <DatePicker />
                      <SearchText>지역</SearchText>
                      <div>
                        <SelectBox>
                          <option>전체</option>
                        </SelectBox>
                        <SelectBox>
                          <option>전체</option>
                        </SelectBox>
                      </div>
                    </div>
                    <SearchBtn>검색</SearchBtn>
                  </SearchData>
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
