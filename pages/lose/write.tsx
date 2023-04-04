import styled from "styled-components";
import Seo from "../../components/Seo";
import { MdOutlinePhotoCamera, MdGpsFixed, MdDateRange } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { HiSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import useDidMountEffect from "./../../hooks/useDidMountEffect";
import moment from "moment";
import { getCookie } from "../../common/utills";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../common/firebase";
import { useMutation } from "@tanstack/react-query";
import { ISBoard, loseInsert } from "../../api/backEndApi";

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
  aspect-ratio: 1/1;
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
  white-space: nowrap;
  margin-right: 10px;
`;
const Input = styled.input`
  width: -webkit-fill-available;
  border-radius: 0.5rem;
  border: 1px solid gainsboro;
  margin: 10px 0px;
  padding: 10px;
  cursor: pointer;
`;

const AddrBox = styled.div`
  position: relative;
  & svg {
    position: absolute;
    right: 10px;
    top: 20px;

    &:hover {
      color: ${(props) => props.theme.pointColor};
    }
  }
`;

const IconBox = styled.span`
  padding: 5px 10px 5px 10px;
  font-family: "Noto Sans KR";
  font-weight: bold;
  background-color: white;
  box-shadow: ${(props) => props.theme.boxShadow};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  color: black;
  &:hover {
    color: ${(props) => props.theme.btnColor};
  }
`;

const SaveBTN = styled.button`
  height: 100%;
  padding: 5px 10px 5px 10px;
  font-family: "Noto Sans KR";
  font-weight: bold;
  background-color: #abe2f3;
  box-shadow: ${(props) => props.theme.boxShadow};
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: ${(props) => props.theme.stPointColor};
  }
`;

const RadioInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #abe2f3;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: end;
  color: #888;
  font-family: "Jua";
  margin-right: 0.3rem;
`;

declare global {
  interface Window {
    kakao: any;
  }
}
interface IAddr {
  address: string;
  zonecode: string;
  sido: string;
  sigungu: string;
  bname: string;
}
export default function Write() {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [files, setFiles] = useState<any>([]);
  const [photo, setPhoto] = useState<any>([]);
  const [data, setData] = useState<ISBoard>();
  const save = useMutation((param: ISBoard) => loseInsert(param));

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
                sido: result[0].address.region_1depth_name,
                sigungu: result[0].address.region_2depth_name,
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
            sido: result[0].address.region_1depth_name,
            sigungu: result[0].address.region_2depth_name,
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
  const onChangeCTT = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setData((prev: any) => ({
      ...prev,
      ctt: value,
    }));
  };

  const onChangeDate = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    setData((prev: any) => ({
      ...prev,
      date: value,
    }));
  };

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (addrData: IAddr) {
        var geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(
          addrData.address,
          function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              var currentPos = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              (document.getElementById("addr") as HTMLInputElement).value =
                addrData.address;
              setData((prev: any) => ({
                ...prev,
                addr: addrData.address,
                sido: addrData.sido,
                sigungu: addrData.sigungu,
                dong: addrData.bname,
                latitude: currentPos.La,
                longitude: currentPos.Ma,
              }));
              map.panTo(currentPos);
              // 결과값으로 받은 위치를 마커로 표시합니다
              marker.setMap(null);
              marker.setPosition(currentPos);
              marker.setMap(map);
            }
          }
        );
      },
    }).open();
  };

  const onClickPhoto = () => {
    (document.getElementById("img") as HTMLInputElement).click();
  };
  const onChagePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (files.length < 4) {
        const file: File = event?.target?.files[0];
        var reader = new FileReader();

        setFiles((prev: []) => [...prev, file]);

        reader.onload = () => {
          setPhoto((prev: any) => [...prev, reader.result]);
        };

        reader.readAsDataURL(file);
        event.target.value = "";
      } else {
        alert("사진은 최대 4개까지 등록 가능합니다.");
      }
    }
  };

  const onClickDelete = (idx: number) => {
    setFiles([...files.slice(0, idx), ...files.slice(idx + 1)]);
    setPhoto([...photo.slice(0, idx), ...photo.slice(idx + 1)]);
  };

  const onSubmit = () => {
    if (files.length) {
      files.forEach((file: File) => {
        const path =
          "images/lose/" +
          new Date().getFullYear() +
          "년/" +
          (new Date().getMonth() + 1) +
          "월/";
        const fileNm =
          moment().format("YYYYhmmss") + `_${getCookie("id")}_` + file.name;
        const storageRef = ref(storage, path + fileNm);

        uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downUrl) => {
            setData((prev: any) => ({
              ...prev,
              type: (
                document.querySelector(
                  'input[name="type"]:checked'
                ) as HTMLInputElement
              ).value,
              img: prev.img ? [...prev.img, downUrl] : [downUrl],
            }));
          });
        });
      });
    } else {
      setData((prev: any) => ({
        ...prev,
        type: (
          document.querySelector(
            'input[name="type"]:checked'
          ) as HTMLInputElement
        ).value,
        img: [],
      }));
    }
  };
  useDidMountEffect(() => {
    if (data?.img && data?.img.length === files.length) save.mutate(data);
  }, [data]);
  return (
    <Container>
      <Seo title="커뮤니티s" />
      <Grid>
        <Box>
          <div>
            <Text>제목</Text> <Title type="text" onChange={onChangeTTL} />
          </div>
          <div style={{ display: "flex" }}>
            <Label>
              <RadioInput
                type="radio"
                name="type"
                value="MISS"
                defaultChecked
              />
              <span>실종</span>
            </Label>
            <Label>
              <RadioInput type="radio" name="type" value="PRT" />
              <span>보호</span>
            </Label>
            <Label>
              <RadioInput type="radio" name="type" value="LOOK" />
              <span>목격</span>
            </Label>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Text>일자</Text>
            <Input
              id="calendar"
              placeholder="YYYYMMDD"
              type="tel"
              onChange={onChangeDate}
            />
            <MdDateRange style={{ position: "absolute", right: "10px" }} />
          </div>
          <div>
            <Text>사진</Text>
            <div
              style={{
                position: "relative",
              }}
            >
              <ImgBigBox>
                {photo?.map((file: string, i: number) => (
                  <ImgBox key={i} onClick={() => onClickDelete(i)}>
                    <Img src={file} />
                    <ImCancelCircle />
                  </ImgBox>
                ))}
              </ImgBigBox>
              <input
                id="img"
                type="file"
                accept="image/*"
                style={{ visibility: "hidden", position: "absolute" }}
                onChange={onChagePhoto}
              />
              <IconBox
                style={{
                  position: "absolute",
                  right: "8px",
                  bottom: "8px",
                  display: "flex",
                }}
                onClick={onClickPhoto}
              >
                <MdOutlinePhotoCamera />
              </IconBox>
            </div>
          </div>
          <div>
            <Text>내용</Text>
            <CTT placeholder="내용을 입력해 주세요." onChange={onChangeCTT} />
          </div>
          <div>
            <Text>주소</Text>
            <AddrBox onClick={onClickAddr}>
              <Input id="addr" readOnly />
              <HiSearch />
            </AddrBox>
          </div>
          <div id="map" style={{ width: "100%", height: "400px" }}></div>
          <div style={{ padding: "10px 0px" }}>
            <IconBox onClick={getCurrentPosBtn}>
              <MdGpsFixed /> 현위치
            </IconBox>
            <SaveBTN onClick={onSubmit}>완료</SaveBTN>
          </div>
        </Box>
      </Grid>
    </Container>
  );
}
