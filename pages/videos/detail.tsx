import YouTube, { YouTubeProps } from "react-youtube";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isVideoAtom } from "../../common/atoms";
import { elapsedTime } from "../../common/utills";
import Seo from "./../../components/Seo";

const Descript = styled.div`
  padding: 10px;
  background-color: #fff;
  height: 100%;
  border-radius: 0px 0px 15px 15px;
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
`;

const ItemExp = styled.div`
  background-size: cover;
  cursor: pointer;
  font-size: 66px;
  background-position: center center;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 15px 15px 0px 0px;
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
`;
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100vh;
  position: relative;
  padding: 10px;
`;
const Grid = styled.div`
  padding: 50px 0px 50px 0px;
  border-top: dotted ${(props) => props.theme.pointColor};
`;

export default function Detail() {
  const value = useRecoilValue(isVideoAtom);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.playVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 1,
    },
  };

  return (
    <Container>
      <Seo title={value?.snippet.title} />
      <Grid>
        <ItemExp>
          <YouTube
            className="ifr_youtube"
            videoId={typeof value.id === "string" ? value.id : value.id.videoId}
            loading="lazy"
            opts={opts}
            iframeClassName="ifr_youtube"
            onReady={onPlayerReady}
            style={{ height: "100%" }}
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
      </Grid>
    </Container>
  );
}
