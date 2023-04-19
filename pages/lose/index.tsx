import styled from "styled-components";
import Link from "next/link";
import { SlPencil } from "react-icons/sl";
import { HiSearch } from "react-icons/hi";
import Seo from "./../../components/Seo";
import { useInfiniteQuery } from "@tanstack/react-query";
import { loseList } from "../../api/backEndApi";
import Loader from "./../../components/Loader";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import DatePicker from "../../components/DatePicker";
import SBoardCard from "../../components/lose/SBoardCard";
import { area, getCookie } from "../../common/utills";
import { useRouter } from "next/router";

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
  overflow: hidden;
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
  margin-top: 5px;
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
  const router = useRouter();
  const [isSort, setIsSort] = useState(false);
  const [sigungu, setSigungu] = useState<any>([]);
  const [searchOpt, setSearchOpt] = useState<any>({
    keyword: "",
    type: "",
    start: "",
    end: "",
    sido: "",
    sigungu: "",
  });
  const outside = useRef<HTMLDivElement>(null);
  const { isLoading, data, fetchNextPage, refetch } = useInfiniteQuery<any>(
    ["lose_list"],
    ({ pageParam = 1 }) =>
      loseList(
        searchOpt.keyword,
        pageParam,
        searchOpt.type,
        searchOpt.start,
        searchOpt.end,
        searchOpt.sido,
        searchOpt.sigungu
      ),
    {
      getNextPageParam: (lastPage) => lastPage.page + 1,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    refetch();
  }, [searchOpt, refetch]);

  useEffect(() => {
    scrollYProgress.onChange(() => {
      if (scrollYProgress.get() > 0.9) {
        fetchNextPage();
      }
    });
  }, [scrollYProgress, fetchNextPage]);

  const onChangeDate = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setSearchOpt((prev: any) => ({
      ...prev,
      keyword: value,
    }));
  };

  const onClickSearch = () => {
    setSearchOpt((prev: any) => ({
      ...prev,
      start: (
        document.getElementById("startDt") as HTMLInputElement
      ).value.replace(/-/gi, ""),
      end: (document.getElementById("endDt") as HTMLInputElement).value.replace(
        /-/gi,
        ""
      ),
      sido: (document.getElementById("sido") as HTMLSelectElement).value,
      sigungu: (document.getElementById("sigungu") as HTMLSelectElement).value,
    }));
    setIsSort(false);
  };

  const onChageSido = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    if (value === "전체") {
      setSigungu([]);
    } else {
      setSigungu(area.get(value));
    }
  };
  const wirtePage = () => {
    if (Boolean(getCookie("token"))) {
      router.push("/lose/write");
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
        title="찾습니다s"
        description="반려동물 실종/보호/목격 글 목록"
        url="https://www.meowbow.shop/lose"
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
            <Title>
              <TargetType
                className={searchOpt.type === "" ? "sort_active" : ""}
                onClick={() =>
                  setSearchOpt((prev: any) => ({ ...prev, type: "" }))
                }
              >
                전체
              </TargetType>
              <TargetType
                className={searchOpt.type === "MISS" ? "sort_active" : ""}
                onClick={() =>
                  setSearchOpt((prev: any) => ({ ...prev, type: "MISS" }))
                }
              >
                실종
              </TargetType>
              <TargetType
                className={searchOpt.type === "PRT" ? "sort_active" : ""}
                onClick={() =>
                  setSearchOpt((prev: any) => ({ ...prev, type: "PRT" }))
                }
              >
                보호
              </TargetType>
              <TargetType
                className={searchOpt.type === "LOOK" ? "sort_active" : ""}
                onClick={() =>
                  setSearchOpt((prev: any) => ({ ...prev, type: "LOOK" }))
                }
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
                      <div
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <SelectBox onChange={onChageSido} id="sido">
                          <option value="">전체</option>
                          <option>서울</option>
                          <option>경기</option>
                          <option>인천</option>
                          <option>강원</option>
                          <option>충북</option>
                          <option>충남</option>
                          <option>대전</option>
                          <option>전북</option>
                          <option>전남</option>
                          <option>광주</option>
                          <option>경북</option>
                          <option>경남</option>
                          <option>부산</option>
                          <option>대구</option>
                          <option>울산</option>
                          <option>세종특별자치시</option>
                          <option>제주특별자치도</option>
                        </SelectBox>
                        <SelectBox id="sigungu">
                          <option value="">전체</option>
                          {sigungu.map((item: any, i: number) => (
                            <option value={item} key={i}>
                              {item}
                            </option>
                          ))}
                        </SelectBox>
                      </div>
                    </div>
                    <SearchBtn onClick={onClickSearch}>검색</SearchBtn>
                  </SearchData>
                )}
              </AnimatePresence>
            </div>
          </GridHead>
          <GridSearch>
            <HiSearch className="searchIcon" />
            <Input
              type="text"
              placeholder="Search..."
              onChange={onChangeDate}
            />
          </GridSearch>
          <GridBody>
            {data?.pages.map((page, i) => (
              <SBoardCard key={i} page={page} />
            ))}
          </GridBody>
        </Grid>
      )}
    </Container>
  );
}
