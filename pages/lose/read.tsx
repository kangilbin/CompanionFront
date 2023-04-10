import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import styled from "styled-components";
import Seo from "../../components/Seo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { communityComments, loseRead } from "../../api/backEndApi";
import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/Loader";
import { elapsedTime } from "../../common/utills";
import { BiTime } from "react-icons/bi";
import moment from "moment";
import useDidMountEffect from "../../hooks/useDidMountEffect";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  top: 3rem;
  padding: 10px;
`;
// const Grid = styled.div`
//   border-top: dotted ${(props) => props.theme.pointColor};
//   height: 100%;
//   padding-top: 50px;
//   @media screen and (min-width: 600px) {
//     padding: 50px;
//   }
// `;
const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
  @media screen and (min-width: 1500px) {
    margin: 0px 10rem;
  }
`;
const Box = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 20px;
  padding: 15px;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  .slick-arrow::before {
    color: #e9e9e9;
    font-size: 30px;
  }
  .slick-prev {
    left: -37px;
  }
  .slick-dots {
    .slick-active {
      button::before {
        color: #c1c1c1;
      }
    }
    button::before {
      color: #e9e9e9;
    }
  }
  .slick-list {
    border-radius: 25px 25px 0px 0px;
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
const Text = styled.span`
  color: #888;
  font-family: "Noto Sans KR";
  font-weight: bold;
`;

const Li = styled.div`
  margin-top: 20px;
`;

const Img = styled.img``;
declare global {
  interface Window {
    kakao: any;
  }
}
export default function Read({
  params,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const results = useQueries({
    queries: [
      {
        queryKey: ["board", params.id],
        queryFn: () => loseRead(params.id),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["comment", params.id],
        queryFn: () => communityComments(params.id),
        refetchOnWindowFocus: false,
      },
    ],
  });
  useEffect(() => {
    const loadingFinishAll = results.some((result) => result.isLoading);
    setIsLoading(loadingFinishAll);
  }, [results]);

  const settings = {
    centerMode: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useDidMountEffect(() => {
    window.kakao.maps.load(() => {
      var currentPos = new window.kakao.maps.LatLng(
        results[0].data.latitude,
        results[0].data.longitude
      );
      const container = document.getElementById("map");
      const options = {
        center: currentPos,
        level: 3,
      };
      var map = new window.kakao.maps.Map(container, options);
      var marker = new window.kakao.maps.Marker();

      marker.setMap(null);
      marker.setPosition(currentPos);
      marker.setMap(map);
    });
  }, [isLoading]);
  return (
    <Container>
      <Seo title="찾습니다s" />
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
            </GirdTTLSub2>
          </GridTTL>
          <Box>
            <StyledSlider {...settings}>
              {JSON.parse(results[0].data.img).map(
                (item: string, i: number) => (
                  <Img src={item} key={i}></Img>
                )
              )}
            </StyledSlider>
            <Li>
              <Text>발견 일자</Text>
              <div>{moment(results[0].data.date).format("YYYY-MM-DD")}</div>
            </Li>
            <Li>
              <Text>내용</Text>
              <pre>{results[0].data.ctt}</pre>
            </Li>
            <Li>
              <Text>발견 위치</Text>
              <div>{results[0].data.addr}</div>
            </Li>
            <div id="map" style={{ width: "100%", height: "400px" }}></div>
          </Box>
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
