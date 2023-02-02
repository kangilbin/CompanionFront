import { IGetListResult, IGetSearchResult } from "../../api/youTubeApi";
import styled from "styled-components";
import { Iimg } from "../../api/youTubeApi";
import { elapsedTime } from "../../common/utills";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { isVideoAtom } from "../../common/atoms";
import YouTubePlay from "./YouTubePlay";
import { useRouter } from "next/router";
import Link from "next/link";

interface IProps {
  data?: IGetListResult | IGetSearchResult;
}

const Descript = styled.div`
  padding: 10px;
  border-radius: 0px 0px 15px 15px;
  background-color: #fff;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding: 0px 25px 0px 25px;
`;

const Item = styled.div<Iimg>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  cursor: pointer;
  font-size: 66px;
  background-size: cover;
  background-position: center center;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 15px 15px 0px 0px;
`;

const Grid = styled(motion.div)`
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
  border-radius: 20px;
`;

const videoVariants = {
  initial: { scale: 1 },
  visible: { scale: 1.2 },
  leaving: { scale: 1 },
};

const Video = styled(motion.div)<ITaget>`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
  border-radius: 20px;
  background-color: black;
  transform-origin: center;
  overflow: hidden;
`;

interface ITaget {
  height?: number;
  top?: number;
  width?: number;
  left?: number;
}

export default function YouTubeList({ data }: IProps) {
  const [showing, setShowing] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [targetSize, setTargetSize] = useState<ITaget>();
  const setPlaying = useSetRecoilState(isVideoAtom);
  const router = useRouter();

  const targetFind = (id: string) => {
    const target = document.getElementById(id);
    const targetX = target?.getBoundingClientRect().left;
    const abX = window.pageXOffset + (targetX ?? 0);

    let advt = document.getElementById("ctn");
    let advtX = window.pageXOffset + (advt?.getBoundingClientRect().left ?? 0);
    let advtY = window.pageYOffset + (advt?.getBoundingClientRect().top ?? 0);

    const targetY = target?.getBoundingClientRect().top;
    const abY = window.pageYOffset + (targetY ?? 0);

    const opt = {
      left: abX - advtX,
      top: abY - advtY,
      width: target?.getBoundingClientRect().width,
      height: target?.getBoundingClientRect().height,
    };
    setShowing(true);
    setTargetSize(opt);
  };

  return (
    <Container>
      {data?.items.map((video) => (
        <Grid
          id={typeof video.id === "string" ? video.id : video.id.videoId}
          key={typeof video.id === "string" ? video.id : video.id.videoId}
          onHoverStart={() => {
            const time = setTimeout(() => {
              targetFind(
                typeof video.id === "string" ? video.id : video.id.videoId
              );
              setPlaying(video);
            }, 1000);
            setTimer(time);
          }}
          onHoverEnd={() => {
            clearTimeout(timer);
            setShowing(false);
          }}
          onClick={() => {
            setPlaying(video);
            router.push("/videos/detail");
          }}
        >
          <Item {...video.snippet.thumbnails.high} />
          <Descript>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                fontFamily: "'Dongle', sans-serif",
                padding: "5px 0px 10px 0px",
              }}
            >
              {video.snippet.title}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "Noto Sans KR",
                fontWeight: "bold",
              }}
            >
              <span>{video.snippet.channelTitle}</span>
              <span>{elapsedTime(video.snippet.publishedAt)}</span>
            </div>
          </Descript>
        </Grid>
      ))}
      <AnimatePresence>
        {showing ? (
          <Video
            variants={videoVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
            transition={{ duration: 0.3, type: "tween" }}
            {...targetSize}
            onHoverStart={() => setShowing(true)}
            onHoverEnd={() => setShowing(false)}
          >
            <YouTubePlay />
          </Video>
        ) : null}
      </AnimatePresence>
    </Container>
  );
}
