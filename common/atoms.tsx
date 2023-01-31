import { atom, selector } from "recoil";
import { IVideo } from "../api/youTubeApi";
import { IDItems, IItem, ISItems } from "../api/animalApi";

// 빌드되는 과정에서 재선언 되어 중복 오류가 발생한다. uuid모듈을 활용하여 중복을 방지
export const isVideoAtom = atom<IVideo | undefined>({
  key: "isVideo",
  default: {
    kind: "",
    etag: "",
    id: "",
    snippet: {
      publishedAt: "",
      channelId: "",
      title: "",
      description: "",
      channelTitle: "",

      thumbnails: {
        default: { url: "", width: 0, height: 0 },
        medium: { url: "", width: 0, height: 0 },
        high: { url: "", width: 0, height: 0 },
        standard: { url: "", width: 0, height: 0 },
        maxres: { url: "", width: 0, height: 0 },
      },
    },
  },
});

export const isSidoAtom = atom<ISItems | undefined>({
  key: "isSido",
  default: {
    item: [],
  },
});

export const isSigunguAtom = atom<IDItems | undefined>({
  key: "isSigungu",
  default: {
    item: [],
  },
});

export const isAnimalAtom = atom<IItem | undefined>({
  key: "isAnimal",
  default: {
    desertionNo: "",
    filename: "",
    happenDt: "",
    happenPlace: "",
    kindCd: "",
    colorCd: "",
    age: "",
    weight: "",
    noticeNo: "",
    noticeSdt: "",
    noticeEdt: "",
    popfile: "",
    processState: "",
    sexCd: "",
    neuterYn: "",
    specialMark: "",
    careNm: "",
    careTel: "",
    careAddr: "",
    orgNm: "",
    chargeNm: "",
    officetel: "",
  },
});
