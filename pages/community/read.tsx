import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import {
  commentInsert,
  communityComments,
  communityRead,
  likesIncrease,
  commentDelete,
  commentUpdate,
} from "../../api/backEndApi";
import Loader from "../../components/Loader";
import Seo from "../../components/Seo";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BiTime } from "react-icons/bi";
import { AiOutlineEye, AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import { CgMoreR } from "react-icons/cg";
import { elapsedTime, getCookie } from "./../../common/utills";
import cat from "../../public/img/cat.png";
import Image from "next/image";
import BoardWriting from "../../components/community/BoardWriting";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const CommentReg = styled.div`
  border: none;
  background: gainsboro;
  padding: 1.5rem;
  border-radius: 0.5rem;
  gap: 1rem;
  display: flex;
`;
const TextArea = styled.textarea`
  resize: none;
  border-radius: 0.5rem;
  width: 100%;
  border: none;
`;

const CommentBtn = styled.button`
  cursor: pointer;
  padding: 8px;
  border: none;
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
  display: flex;
  justify-content: space-between;
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

const MoreBTN = styled.span`
  svg {
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.pointColor};
    }
  }
`;
interface ITaget {
  top?: number;
  left?: number;
}

const MoreBtnUl = styled(motion.div)<ITaget>`
  position: absolute;
  margin-top: 10px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  cursor: pointer;
  border-radius: 5px;
  z-index: 1;
  background: white;
  padding: 0px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
`;

const MoreBtnLi = styled.div`
  padding: 10px 18px;
  border-bottom: 1px solid #d6d6d6;
  &:hover {
    border-bottom: 1px solid ${(props) => props.theme.pointColor};
    color: ${(props) => props.theme.pointColor};
    font-weight: bold;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
`;
const Reply = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 1px ${(porps) => porps.theme.btnColor};
  padding: 1.5rem;
  border-radius: 0.5rem;
  gap: 1rem;
  display: flex;
  border: none;
  background: gainsboro;
  width: 50%;
`;

const ReComment = styled.div`
  font-family: "Noto Sans KR";
  color: ${(props) => props.theme.pointColor};
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;
`;

const LikesBtn = styled.div`
  text-align: center;
  border-bottom: solid 1px ${(props) => props.theme.pointColor};
  padding-bottom: 30px;
  margin: 30px 0px;
  & > svg {
    height: 3rem;
    width: 3rem;
    padding: 10px;
    color: ${(props) => props.theme.pointColor};
    cursor: pointer;
    border: 3px solid ${(props) => props.theme.btnColor};
    border-radius: 15px;
  }
  & > svg:hover {
    color: ${(props) => props.theme.stPointColor};
  }
`;

const moreVariants = {
  initial: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, y: -10, x: -20 },
  leaving: { opacity: 0, scale: 0, y: -50 },
};

interface ICommentId {
  parent_comment_id: number | undefined;
  comment_id: number | undefined;
}

export default function Read({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [commentId, setCommentId] = useState<ICommentId | null>({
    parent_comment_id: 0,
    comment_id: 0,
  });
  const [targetSize, setTargetSize] = useState<any>(null);
  const outside = useRef<HTMLDivElement>(null);
  const outReplay = useRef<HTMLDivElement>(null);
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

  const mutation = useMutation(
    ({ type, parent_comment_id, content }: any) =>
      commentInsert({ type, board_id: params.id, parent_comment_id, content }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["comment", "select"], data);
        setIsReply(false);
        setComment("");
      },
    }
  );

  const likesmut = useMutation((id: string) => likesIncrease(id), {
    onSuccess: (data) => {
      alert("해당 글을 추천합니다!");
    },
  });

  const delMut = useMutation(
    () =>
      commentDelete({
        board_id: params.id,
        parent_comment_id: commentId?.parent_comment_id,
        comment_id: commentId?.comment_id,
      }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["comment", "select"], data);
      },
    }
  );

  const modMut = useMutation(
    () =>
      commentUpdate(
        commentId?.parent_comment_id,
        commentId?.comment_id,
        comment
      ),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["comment", "select"], data);
        setIsReply(false);
        setComment("");
      },
    }
  );

  useEffect(() => {
    const loadingFinishAll = results.some((result) => result.isLoading);
    setIsLoading(loadingFinishAll);
  }, [results]);

  useEffect(() => {
    isReply
      ? document.body.classList.add("stop-scroll")
      : document.body.classList.remove("stop-scroll");
  }, [isReply]);

  const onClick = (type: string) => {
    if (comment.length === 0) {
      alert("댓글 내용을 작성해주세요.");
    } else {
      const obj = {
        type,
        parent_comment_id: commentId?.parent_comment_id,
        content: comment,
      };
      mutation.mutate(obj);
    }
  };

  const targetFind = (event: React.FormEvent<HTMLSpanElement>) => {
    const target = event.currentTarget;
    const targetX = target?.getBoundingClientRect().left;
    const abX = window.pageXOffset + (targetX ?? 0);

    const targetY = target?.getBoundingClientRect().top;
    const abY = window.pageYOffset + (targetY ?? 0);

    const opt = {
      left: abX,
      top: abY + 30,
    };
    setIsOpen(true);
    setTargetSize(opt);
  };

  const moreBtnClick = (
    event: React.FormEvent<HTMLSpanElement>,
    parent_comment_id: number,
    comment_id: number
  ) => {
    targetFind(event);
    setCommentId({ parent_comment_id, comment_id });
  };

  const delComment = () => {
    delMut.mutate();
  };
  const modComment = () => {
    setIsReply(true);
    //modMut.mutate();
  };

  return (
    <Container
      onClick={(e: any) => {
        if (isOpen && (!outside.current || !outside.current.contains(e.target)))
          setIsOpen(false);
      }}
    >
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
          <LikesBtn>
            <AiOutlineLike />
          </LikesBtn>
          <div>
            {results[1].data.length ? (
              <div style={{ marginBottom: "30px" }}>
                {results[1].data.length}개의 댓글
              </div>
            ) : (
              ""
            )}
            <CommentReg>
              <Image src={cat} alt="야옹이 사진" width={100} height={100} />
              <TextArea
                onChange={(e) => setComment(e.currentTarget.value)}
                value={comment}
              />
              <CommentBtn onClick={() => onClick("new")}>댓글 작성</CommentBtn>
            </CommentReg>
            {(() => {
              let change: number;
              let ele: any[] = [];
              results[1].data.map((item: any, i: number) => {
                if (change !== item.parent_comment_id) {
                  ele.push(
                    <CommentList key={i}>
                      <CommentUser>
                        <span>{item.nickname}</span>
                        {item.user_id === getCookie("id") && (
                          <>
                            <MoreBTN
                              onClick={(event) =>
                                moreBtnClick(
                                  event,
                                  item.parent_comment_id,
                                  item.comment_id
                                )
                              }
                              ref={outside}
                            >
                              <CgMoreR />
                            </MoreBTN>
                          </>
                        )}
                      </CommentUser>
                      <CommentCTT>{item.content}</CommentCTT>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <CommentTime>
                          <BiTime
                            style={{
                              padding: "0px 5px",
                            }}
                          />
                          {elapsedTime(item.dt)}
                        </CommentTime>
                        <ReComment
                          onClick={() => {
                            setIsReply(true);
                            setCommentId({
                              parent_comment_id: item.parent_comment_id,
                              comment_id: item.comment_id,
                            });
                          }}
                        >
                          답글 쓰기
                        </ReComment>
                      </div>
                    </CommentList>
                  );
                  change = item.parent_comment_id;
                } else {
                  ele.push(
                    <CommentRe key={i}>
                      <CommentUser>
                        <span>{item.nickname}</span>
                        {item.user_id === getCookie("id") && (
                          <>
                            <MoreBTN
                              onClick={(event) =>
                                moreBtnClick(
                                  event,
                                  item.parent_comment_id,
                                  item.comment_id
                                )
                              }
                              ref={outside}
                            >
                              <CgMoreR />
                            </MoreBTN>
                          </>
                        )}
                      </CommentUser>
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
            <AnimatePresence>
              {isOpen && (
                <MoreBtnUl
                  variants={moreVariants}
                  initial="initial"
                  animate="visible"
                  exit="leaving"
                  {...targetSize}
                >
                  <MoreBtnLi onClick={modComment}>수정</MoreBtnLi>
                  <MoreBtnLi onClick={delComment}>삭제</MoreBtnLi>
                </MoreBtnUl>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isReply && (
                <>
                  <Overlay
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e: any) => {
                      if (
                        isReply &&
                        (!outReplay.current ||
                          !outReplay.current.contains(e.target))
                      ) {
                        setIsReply(false);
                      }
                    }}
                  >
                    <Reply ref={outReplay}>
                      <Image
                        src={cat}
                        alt="야옹이 사진"
                        width={100}
                        height={100}
                      />
                      <TextArea
                        onChange={(e) => setComment(e.currentTarget.value)}
                        value={comment}
                      />
                      <CommentBtn onClick={() => onClick("reply")}>
                        답글 작성
                      </CommentBtn>
                    </Reply>
                  </Overlay>
                </>
              )}
            </AnimatePresence>
          </div>
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
