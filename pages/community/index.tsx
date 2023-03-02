import styled from "styled-components";
import Link from "next/link";
import { SlPencil } from "react-icons/sl";
import { HiSearch, HiSortDescending } from "react-icons/hi";
import Seo from "./../../components/Seo";
import { useQuery } from "@tanstack/react-query";
import { communtiyList } from "../../api/backEndApi";
import Loader from "./../../components/Loader";

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

const Card = styled.div`
  padding: 15px;
  border-bottom: 1px solid #d6d6d6;
  &:hover {
    background-color: #e0e6e7;
  }
  cursor: pointer;
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
  border-radius: 10px;
  padding-left: 40px;
  border: 1px solid ${(props) => props.theme.btnColor};
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

export default function Community() {
  const { isLoading, data } = useQuery(["community_list"], communtiyList, {
    refetchOnWindowFocus: false,
  });
  console.log(data);
  return (
    <Container>
      <Seo title="간택당한 집사s" />
      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
          <GridHead>
            <Link href="/community/write" legacyBehavior>
              <Page>
                <SlPencil style={{ marginRight: "5px" }} />
                작성하기
              </Page>
            </Link>
            <span style={{ fontFamily: "Jua" }}>커뮤니티</span>
            <Sort>
              <HiSortDescending style={{ marginRight: "5px" }} />
              <span>최신순</span>
            </Sort>
          </GridHead>
          <GridSearch>
            <HiSearch className="searchIcon" />
            <Input type="text" placeholder="Search" />
          </GridSearch>
          <GridBody>
            <Card className="board-list">
              <div>
                <div>제목1</div>
                <div>sdfsd</div>
              </div>
              <div>
                <span style={{ marginRight: "5px" }}>33</span>
                <span style={{ marginRight: "5px" }}>12</span>
                <span style={{ marginRight: "5px" }}>12</span>
              </div>
            </Card>
            <Card className="board-list">
              <div>
                <div>제목1</div>
                <div>sdfsd</div>
              </div>
              <div>
                <span style={{ marginRight: "5px" }}>33</span>
                <span style={{ marginRight: "5px" }}>12</span>
                <span style={{ marginRight: "5px" }}>12</span>
              </div>
            </Card>
            <Card className="board-list">
              <div>
                <div>제목1</div>
                <div>sdfsd</div>
              </div>
              <div>
                <span style={{ marginRight: "5px" }}>33</span>
                <span style={{ marginRight: "5px" }}>12</span>
                <span style={{ marginRight: "5px" }}>12</span>
              </div>
            </Card>
            <Card className="board-list">
              <div>
                <div>제목1</div>
                <div>sdfsd</div>
              </div>
              <div>
                <span style={{ marginRight: "5px" }}>33</span>
                <span style={{ marginRight: "5px" }}>12</span>
                <span style={{ marginRight: "5px" }}>12</span>
              </div>
            </Card>
            <Card className="board-list">
              <div>
                <div>제목1</div>
                <div>sdfsd</div>
              </div>
              <div>
                <span style={{ marginRight: "5px" }}>33</span>
                <span style={{ marginRight: "5px" }}>12</span>
                <span style={{ marginRight: "5px" }}>12</span>
              </div>
            </Card>
            <Card className="board-list">
              <div>
                <div>제목1</div>
                <div>sdfsd</div>
              </div>
              <div>
                <span style={{ marginRight: "5px" }}>33</span>
                <span style={{ marginRight: "5px" }}>12</span>
                <span style={{ marginRight: "5px" }}>12</span>
              </div>
            </Card>
            <Card className="board-list">
              <div>
                <div>제목1</div>
                <div>sdfsd</div>
              </div>
              <div>
                <span style={{ marginRight: "5px" }}>33</span>
                <span style={{ marginRight: "5px" }}>12</span>
                <span style={{ marginRight: "5px" }}>12</span>
              </div>
            </Card>
            <Card className="board-list">
              <div>
                <div>제목1</div>
                <div>sdfsd</div>
              </div>
              <div>
                <span style={{ marginRight: "5px" }}>33</span>
                <span style={{ marginRight: "5px" }}>12</span>
                <span style={{ marginRight: "5px" }}>12</span>
              </div>
            </Card>
          </GridBody>
        </Grid>
      )}
    </Container>
  );
}
