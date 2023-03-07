import { useQueries } from "@tanstack/react-query";
import styled from "styled-components";
import { communityComments, communityRead } from "../../api/backEndApi";
import Loader from "../../components/Loader";
import Seo from "../../components/Seo";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BiTime } from "react-icons/bi";
import { AiOutlineEye, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { elapsedTime } from "./../../common/utills";
import cat from "../../public/img/cat.png";
import Image from "next/image";
import BoardWriting from "../../components/community/BoardWriting";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px;
`;

const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
  @media screen and (min-width: 1500px) {
    margin: 0px 10rem;
  }
`;

const GridTTL = styled.div`
  margin-top: 25px;
  margin-bottom: 15px;
  border-bottom: solid 1px ${(porps) => porps.theme.pointColor};
`;

const TTL = styled.div`
  padding: 10px 0px;
  font-size: 2rem;
  font-weight: bold;
`;

const GirdTTLSub1 = styled.div`
  margin: 10px 0px;
  font-size: 1.1rem;
  font-family: "Jua";
`;

const GirdTTLSub2 = styled.div`
  margin-bottom: 25px;
  display: flex;
  color: ${(props) => props.theme.btnColor};
`;

const GridBottom = styled.div``;
const CommentReg = styled.div`
  border: solid 1px ${(porps) => porps.theme.btnColor};
  padding: 1.5rem;
  border-radius: 0.5rem;
  gap: 1rem;
  display: flex;
`;
const TextArea = styled.textarea`
  resize: none;
  border: solid 1px ${(porps) => porps.theme.btnColor};
  border-radius: 0.5rem;
  width: 100%;
`;

const CommentBtn = styled.button`
  cursor: pointer;
  padding: 8px;
  border: 1px solid;
  border-radius: 5px;
  background-color: ${(props) => props.theme.pointColor};
  font-weight: bold;
  color: white;
  font-family: "Noto Sans KR";
  width: 10%;
  &:hover {
    background-color: #00c3ff;
  }
`;

const CommentList = styled.div`
  padding: 15px 20px;
  border-bottom: solid 1px #dbdbdb;
`;

const CommentRe = styled.div`
  background: #f6f6f6;
  border-bottom: solid 1px #dbdbdb;
  padding: 20px 20px 20px 50px;
`;

const CommentUser = styled.div`
  color: ${(props) => props.theme.btnColor};
  font-family: "Jua";
  font-size: 1.1rem;
`;
const CommentTime = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.btnColor};
  font-family: "Noto Sans KR";
  font-size: 0.9rem;
`;
const CommentCTT = styled.div`
  padding: 10px 0px;
`;
export default function Read({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const results = useQueries({
    queries: [
      {
        queryKey: ["board", "select"],
        queryFn: () => communityRead(params.id),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["comment", "select"],
        queryFn: () => communityComments(params.id),
        refetchOnWindowFocus: false,
      },
    ],
  });
  useEffect(() => {
    const loadingFinishAll = results.some((result) => result.isLoading);
    setIsLoading(loadingFinishAll);
  }, [results]);

  return (
    <Container>
      <Seo title="간택당한 집사s" />
      {isLoading ? (
        <Loader />
      ) : (
        <Grid>
          <GridTTL>
            <TTL>{results[0].data.title}</TTL>
            <GirdTTLSub1>작성자 : {results[0].data.user_id}</GirdTTLSub1>
            <GirdTTLSub2>
              <BiTime
                style={{
                  height: "1.1rem",
                  width: "1.1rem",
                  padding: "0px 5px",
                }}
              />
              {elapsedTime(results[0].data.reg_time)}
              <AiOutlineEye
                style={{
                  height: "1.1rem",
                  width: "1.1rem",
                  padding: "0px 5px",
                }}
              />
              {results[0].data.hits}
              <AiOutlineLike
                style={{
                  height: "1.1rem",
                  width: "1.1rem",
                  padding: "0px 5px",
                }}
              />
              {results[0].data.likes}
              <AiOutlineComment
                style={{
                  height: "1.1rem",
                  width: "1.1rem",
                  padding: "0px 5px",
                }}
              />
              {results[1].data.length}
            </GirdTTLSub2>
          </GridTTL>
          <BoardWriting data={results[0].data.dom} />
          <GridBottom>
            {results[1].data.length ? (
              <div style={{ marginBottom: "30px" }}>
                {results[1].data.length}개의 댓글
              </div>
            ) : (
              ""
            )}
            <CommentReg>
              <Image
                src={cat}
                alt="Picture of the author"
                width={100}
                height={100}
              />
              <TextArea />
              <CommentBtn>댓글 작성</CommentBtn>
            </CommentReg>
            {(() => {
              let change: number;
              let ele: any[] = [];
              results[1].data.map((item: any, i: number) => {
                if (change !== item.parent_comment_id) {
                  ele.push(
                    <CommentList key={i}>
                      <CommentUser>{item.user_id}</CommentUser>
                      <CommentCTT>{item.content}</CommentCTT>
                      <CommentTime>
                        {
                          <BiTime
                            style={{
                              padding: "0px 5px",
                            }}
                          />
                        }
                        {elapsedTime(item.dt)}
                      </CommentTime>
                    </CommentList>
                  );
                  change = item.parent_comment_id;
                } else {
                  ele.push(
                    <CommentRe key={i}>
                      <CommentUser>{item.user_id}</CommentUser>
                      <CommentCTT>{item.content}</CommentCTT>
                      <CommentTime>
                        <BiTime
                          style={{
                            padding: "0px 5px",
                          }}
                        />
                        {elapsedTime(item.dt)}
                      </CommentTime>
                    </CommentRe>
                  );
                }
              });

              return <div style={{ margin: "30px 0px" }}>{ele}</div>;
            })()}
          </GridBottom>
        </Grid>
      )}
    </Container>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.query;
  return {
    props: { params },
  };
};
