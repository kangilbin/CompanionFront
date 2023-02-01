import YouTube, { YouTubeProps } from "react-youtube";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IoVolumeMuteOutline, IoVolumeMediumOutline } from "react-icons/io5";
import { isVideoAtom } from "../../common/atoms";
import { elapsedTime } from "../../common/utills";

const Descript = styled.div`
  padding: 10px;
  border-radius: 0px 0px 15px 15px;
  background-color: #fff;
  height: 100%;
`;

const ItemExp = styled.div`
  background-size: cover;
  cursor: pointer;
  font-size: 66px;
  background-position: center center;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 15px 15px 0px 0px;
`;

export default function YouTubePlay() {
  const value = useRecoilValue(isVideoAtom);
  const [target, setTarget] = useState<any>();
  const [volume, setVolume] = useState(false);

  useEffect(() => {}, [value]);
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // 동영상 로드 후 이벤트 설정
    event.target.mute();
    event.target.playVideo();
    setTarget(event.target);
  };

  const muteCh = () => {
    volume ? target.mute() : target.unMute();
    setVolume((prev) => !prev);
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    borderRadius: "15px 15px 0px 0px",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      controls: 0,
    },
  };
  return (
    <>
      <ItemExp>
        <YouTube
          className="ifr_youtube"
          videoId={typeof value.id === "string" ? value.id : value.id.videoId}
          loading="lazy"
          opts={opts}
          iframeClassName="ifr_youtube"
          onReady={onPlayerReady}
          style={{ borderRadius: "15px 15px 0px 0px", height: "100%" }}
        />
      </ItemExp>
      <Descript>
        <div
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            fontFamily: "'Dongle', sans-serif",
            padding: "5px 0px 10px 0px",
          }}
        >
          <span>{value?.snippet.title}</span>
          <span>
            {volume ? (
              <IoVolumeMediumOutline
                onClick={muteCh}
                style={{ cursor: "pointer", float: "right" }}
              />
            ) : (
              <IoVolumeMuteOutline
                onClick={muteCh}
                style={{ cursor: "pointer", float: "right" }}
              />
            )}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Noto Sans KR",
            fontWeight: "bold",
          }}
        >
          <span>{value?.snippet.channelTitle}</span>
          <span>{elapsedTime(value!.snippet.publishedAt)}</span>
        </div>
      </Descript>
    </>
  );
}
