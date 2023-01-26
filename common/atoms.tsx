import { atom, selector } from "recoil";
import { IVideo } from "../api/youTubeApi";
import { v4 } from "uuid";
import { IDItems, ISItems } from "../api/animalApi";

// 빌드되는 과정에서 재선언 되어 중복 오류가 발생한다. uuid모듈을 활용하여 중복을 방지
export const isVideoAtom = atom<IVideo | undefined>({
  key: `isVideo/${v4()}`,
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
  key: `isSido/${v4()}`,
  default: {
    item: [],
  },
});

export const isSigunguAtom = atom<IDItems | undefined>({
  key: `isSigungu/${v4()}`,
  default: {
    item: [],
  },
});
