import { useRouter } from "next/router";
import { AiOutlineComment, AiOutlineEye, AiOutlineLike } from "react-icons/ai";
import styled from "styled-components";
import { elapsedTime } from "./../../common/utills";

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
  margin: 10px 0px;
  color: gray;
`;

export default function BoardCard(page: any) {
  const router = useRouter();
  const onClick = (id: string) => {
    router.push({
      pathname: "/community/read",
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
              <CardCTT>{info.content}</CardCTT>
            </div>
            <CardImg url={JSON.parse(info.img)[0]} />
          </CardGrid>
          <CardETCGrid>
            <span>
              <AiOutlineEye
                style={{
                  padding: "0px 5px",
                }}
              />
              {info.hits}
              <AiOutlineLike
                style={{
                  padding: "0px 5px",
                }}
              />
              {info.likes}
              <AiOutlineComment
                style={{
                  padding: "0px 5px",
                }}
              />
              {info.comments}
            </span>
            <div style={{ float: "right" }}>
              <span style={{ marginRight: "10px" }}>{info.user_id}</span>
              <span>{elapsedTime(info.reg_time)}</span>
            </div>
          </CardETCGrid>
        </Card>
      ))}
    </>
  );
}
