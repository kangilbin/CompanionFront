import { useRouter } from "next/router";
import { RiHashtag } from "react-icons/ri";
import styled from "styled-components";
import { elapsedTime } from "../../common/utills";

const Card = styled.div`
  padding: 15px;
  border-bottom: 1px solid #d6d6d6;
  font-family: "Noto Sans KR";
  &:hover {
    background-color: #e0e6e7;
  }
  cursor: pointer;
`;

const CardETC = styled.span`
  margin-right: 10px;
  display: inline-flex;
`;

const CardTTL = styled.div`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  font-size: 1.3rem;
  line-height: 1.3em;
  height: 1.4em;
  margin: 10px 0px;
`;

const CardCTT = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1em;
  height: 2em;
`;

const CardImg = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  cursor: pointer;
  font-size: 66px;
  background-size: cover;
  background-position: center center;
  width: 20%;
  aspect-ratio: 1/1;
  border-radius: 15px;
  box-shadow: ${(props) => props.url && "0 1px 2px rgb(0 0 0 / 20%)"};
`;

const CardGrid = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardETCGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  color: gray;
`;

const HashTag = styled.span`
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  border-radius: 15px;
  padding: 5px;
  font-family: "Noto Sans KR";
  font-weight: bold;
  margin-right: 10px;
`;

export default function SBoardCard(page: any) {
  const router = useRouter();
  const onClick = (id: string) => {
    router.push({
      pathname: "/lose/read",
      query: { id },
    });
  };

  return (
    <>
      {page.page.data?.map((info: any, i: number) => (
        <Card
          className="board-list"
          key={i}
          onClick={() => {
            onClick(info.id);
          }}
        >
          <CardGrid>
            <div style={{ width: "75%" }}>
              <CardTTL>{info.title}</CardTTL>
              <CardCTT>{info.ctt}</CardCTT>
            </div>
            <CardImg url={JSON.parse(info.img)[0]} />
          </CardGrid>
          <CardETCGrid>
            <div>
              <HashTag>
                #
                {info.type === "MISS"
                  ? "실종"
                  : info.type === "LOOK"
                  ? "목격"
                  : "보호"}
              </HashTag>
              <HashTag>#{info.sigungu}</HashTag>
            </div>
            <div>
              <span style={{ marginRight: "10px" }}>{info.user_id}</span>
              <span>{elapsedTime(info.reg_time)}</span>
            </div>
          </CardETCGrid>
        </Card>
      ))}
    </>
  );
}
