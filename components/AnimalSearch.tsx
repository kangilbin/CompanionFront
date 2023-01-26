import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSidoList, getSigunguList } from "../api/animalApi";
import { useRecoilState } from "recoil";
import { isSidoAtom } from "../common/atoms";
import { isSigunguAtom } from "./../common/atoms";
import DatePicker from "./DatePicker";

const SearchGrid = styled.div`
  justify-content: right;
  display: flex;
`;
const SearchNav = styled(motion.nav)`
  filter: drop-shadow(1px 1px 1px);
  width: 300px;
`;
const SearchUl = styled(motion.ul)`
  display: flex;
  width: 300px;
  position: absolute;
  flex-direction: column;
  gap: 10px;
  background: #fafafa;
`;
const Searchli = styled(motion.li)`
  list-style: none;
  margin: 0;
  padding: 10px;
`;
const SearchBtn = styled(motion.button)`
  -webkit-appearance: button;
  margin-top: 1.5rem;
  background: #fafafa;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchText = styled.div`
  color: ${(props) => props.theme.btnColor};
  padding: 5px;
`;
const SelectBox = styled.select`
  border-radius: 10px;
  padding: 3px;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  text-align: center;
`;
const ChoiceBtn = styled.button`
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  background-color: #00c3ff;
  border: none;
  padding: 10px;
  &:active {
    background-color: #8ecbde;
  }
`;
const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
export default function AnimalSearch({ objFun }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);
  const [sidoCode, setSidoCode] = useState("");
  const { data: SData, isLoading: SIsLoading } = useQuery(
    ["sido"],
    getSidoList,
    { cacheTime: Infinity }
  );
  const {
    data: GData,
    isLoading: GisLoading,
    refetch,
  } = useQuery(["sigungu"], () => getSigunguList(sidoCode), {
    enabled: false,
  });
  const [sido, setSido] = useRecoilState(isSidoAtom);
  const [sigungu, setSigungu] = useRecoilState(isSigunguAtom);

  function sendFun() {
    let obj = {
      bgnde: (
        document.getElementById("startDt") as HTMLInputElement
      ).value.replace(/-/gi, ""),
      endde: (
        document.getElementById("endDt") as HTMLInputElement
      ).value.replace(/-/gi, ""),
      upkind: (document.getElementById("kind") as HTMLInputElement).value,
      //kind: 품종
      upr_cd: (document.getElementById("sido") as HTMLInputElement).value,
      org_cd: (document.getElementById("sigungu") as HTMLInputElement).value,
      neuter_yn: "",
    };
    document.getElementsByName("neuter").forEach((ele: any) => {
      if (ele.checked && ele.value !== "ALL") {
        obj = { ...obj, neuter_yn: ele.value ?? "" };
      }
    });
    objFun(obj);
    setIsOpen(false);
  }

  useEffect(() => {
    setSido(SData?.response.body.items);
  }, [SData, setSido]);

  useEffect(() => {
    if (GData?.response.header.resultCode === "00") {
      setSigungu(GData?.response.body.items);
    } else {
      setSigungu(undefined);
    }
  }, [GData, setSigungu]);

  useEffect(() => {
    refetch();
  }, [sidoCode, refetch]);

  const handleCloseModal = (event: MouseEvent) => {
    if (isOpen && (!ref.current || !ref.current.contains(event.target)))
      setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseModal);
  }, [ref]);

  const handleSelector = (event: React.FormEvent<HTMLSelectElement>) => {
    setSidoCode(event.currentTarget.value);
  };

  return (
    <SearchGrid ref={ref}>
      <SearchNav initial={false} animate={isOpen ? "open" : "closed"}>
        <SearchBtn
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          조회 조건
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </motion.div>
        </SearchBtn>
        <SearchUl
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 15px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 15px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <Searchli variants={itemVariants}>
            <SearchText>유기 날짜</SearchText>
            <DatePicker />
          </Searchli>
          <Searchli variants={itemVariants}>
            <div>
              <SearchText>종류</SearchText>
              <SelectBox id="kind" style={{ float: "right" }}>
                <option value="">전체</option>
                <option value={417000}>개</option>
                <option value={422400}>고양이</option>
                <option value={429900}>기타</option>
              </SelectBox>
            </div>
          </Searchli>
          <Searchli variants={itemVariants}>
            <SearchText>지역</SearchText>
            <div style={{ float: "right" }}>
              <SelectBox
                id="sido"
                onChange={handleSelector}
                style={{ marginRight: "5px" }}
              >
                <option value="">전체</option>
                {sido?.item.map((sido, i) => (
                  <option key={i} value={sido.orgCd}>
                    {sido.orgdownNm}
                  </option>
                ))}
              </SelectBox>
              <SelectBox id="sigungu">
                <option value="">전체</option>
                {sigungu?.item.map((sigungu, i) => (
                  <option
                    key={i}
                    value={sigungu.orgCd}
                    onClick={() => setSidoCode(sigungu.orgCd)}
                  >
                    {sigungu.orgdownNm}
                  </option>
                ))}
              </SelectBox>
            </div>
          </Searchli>
          <Searchli variants={itemVariants}>
            <SearchText>중성화 여부</SearchText>
            <div style={{ float: "right" }}>
              <span>
                ALL
                <input type="radio" name="neuter" value="ALL" defaultChecked />
              </span>
              <span>
                Y<input type="radio" name="neuter" value="Y" />
              </span>
              <span>
                N<input type="radio" name="neuter" value="N" />
              </span>
            </div>
          </Searchli>
          <ChoiceBtn onClick={sendFun}>적용</ChoiceBtn>
        </SearchUl>
      </SearchNav>
    </SearchGrid>
  );
}
