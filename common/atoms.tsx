import { atom } from "recoil";
import { ISVideo, IVideo } from "../api/youTubeApi";
import { IDItems, IItem, ISItems } from "../api/animalApi";

export const isVideoAtom = atom<IVideo | ISVideo>({
  key: "isVideo",
  default: {
    kind: "",
    etag: "",
    id: { kind: "", videoId: "" },
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
