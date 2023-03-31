import styled from "styled-components";
import Seo from "../../components/Seo";
import { MdOutlinePhotoCamera, MdGpsFixed } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import useDidMountEffect from "./../../hooks/useDidMountEffect";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  top: 3rem;
  padding: 10px;
`;
const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
  height: 100%;
  padding-top: 50px;
  @media screen and (min-width: 600px) {
    padding: 50px;
  }
`;

const Box = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 20px;
  padding: 15px;
`;
const Title = styled.input`
  height: 2rem;
  border-radius: 0.5rem;
  font-size: 20px;
  width: 100%;
  border: 1px solid gainsboro;
  margin: 10px 0px;
`;
const CTT = styled.textarea`
  resize: none;
  border-radius: 0.5rem;
  width: 100%;
  border: none;
  border: 1px solid gainsboro;
  margin: 10px 0px;
  height: 4rem;
  padding: 10px 0px;
`;

const Img = styled.img`
  width: 100%;
`;

const ImgBox = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${(props) => props.theme.boxShadow};
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 2px 3px rgb(184 229 240);
  }
`;
const ImgBigBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
  gap: 10px;
  border-radius: 0.5rem;
  border: 1px solid gainsboro;
  margin: 10px 0px;
`;

const Text = styled.span`
  color: #888;
  font-family: "Jua";
`;
const InputAddr = styled.input`
  width: -webkit-fill-available;
  border-radius: 0.5rem;
  border: 1px solid gainsboro;
  margin: 10px 0px;
  padding: 10px;
`;

declare global {
  interface Window {
    kakao: any;
  }
}
export default function Write() {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [data, setData] = useState<any>();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  useDidMountEffect(() => {
    window.kakao.maps.event.addListener(
      map,
      "click",
      function (mouseEvent: any) {
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(
          mouseEvent.latLng.getLng(),
          mouseEvent.latLng.getLat(),
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              var addr = !!result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name;
              (document.getElementById("addr") as HTMLInputElement).value =
                addr;

              setData((prev: any) => ({
                ...prev,
                addr,
                sido: result[0].address.region_2depth_name,
                sigungu: result[0].address.region_3depth_name,
                dong: result[0].address.region_3depth_name,
                latitude: mouseEvent.latLng.getLat(),
                longitude: mouseEvent.latLng.getLng(),
              }));

              marker.setMap(null);
              // 마커를 클릭한 위치에 표시합니다
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);
            }
          }
        );
      }
    );
  }, [map]);

  function getCurrentPosBtn() {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  }
  const getPosSuccess = (pos: GeolocationPosition) => {
    // 현재 위치(위도, 경도) 가져온다.
    var currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude // 경도
    );
    // 지도를 이동 시킨다.
    map.panTo(currentPos);

    var geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      currentPos.La,
      currentPos.Ma,
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          var addr = !!result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          (document.getElementById("addr") as HTMLInputElement).value = addr;

          setData((prev: any) => ({
            ...prev,
            addr,
            sido: result[0].address.region_2depth_name,
            sigungu: result[0].address.region_3depth_name,
            dong: result[0].address.region_3depth_name,
            latitude: currentPos.La,
            longitude: currentPos.Ma,
          }));
        }
      }
    );

    // 기존 마커를 제거하고 새로운 마커를 넣는다.
    marker.setMap(null);
    marker.setPosition(currentPos);
    marker.setMap(map);
  };

  const onChangeTTL = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setData((prev: any) => ({
      ...prev,
      title: value,
    }));
  };
  return (
    <Container>
      <script
        type="text/javascript"
        defer
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=3ac433d8c7d59fc4a01d7669bd060a06&libraries=services&autoload=false`}
      />
      <Seo title="커뮤니티s" />
      <Grid>
        <Box>
          <div>
            <Text>제목</Text> <Title type="text" onChange={onChangeTTL} />
          </div>
          <div>
            <MdOutlinePhotoCamera />
            <ImgBigBox>
              <ImgBox>
                <Img src="https://source.unsplash.com/1600x900/?policies,protection,pet" />
                <ImCancelCircle />
              </ImgBox>
              <ImgBox>
                <Img src="https://source.unsplash.com/1600x900/?policies,protection,pet" />
                <ImCancelCircle />
              </ImgBox>
            </ImgBigBox>
          </div>
          <CTT placeholder="내용을 입력해 주세요." />
          <div>
            <InputAddr id="addr" disabled />
            <div>
              <MdGpsFixed />
              <HiSearch />
            </div>
          </div>

          <div id="map" style={{ width: "100%", height: "400px" }}></div>
          <button onClick={getCurrentPosBtn}>완료</button>
        </Box>
      </Grid>
    </Container>
  );
}
