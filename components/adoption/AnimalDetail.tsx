import { AnimatePresence, motion, useScroll } from "framer-motion";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { isAnimalAtom } from "../../atoms";
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;
const BigCard = styled(motion.div)<{ y: number }>`
  position: absolute;
  top: ${(props) => props.y - 310}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 95vh;
  max-width: 95%;
  @media screen and (min-width: 1200px) {
    width: 30vw;
    top: ${(props) => props.y - 140}px;
  }
`;
const BigCover = styled.img`
  width: 100%;
`;
const BigOverview = styled.div`
  padding: 15px;
  overflow: auto;
`;
const ShelterInfo = styled.ul`
  border: 2px solid ${(props) => props.theme.pointColor};
  margin-top: 20px;
  border-radius: 20px;
  padding: 10px;
  list-style-type: none;
`;
const AnimalCTT = styled.li`
  padding-top: 10px;
  border-bottom: 1px dotted lightgray;
`;
const SubTitle = styled.span`
  font-family: "Jua", sans-serif;
  color: ${(props) => props.theme.text2Color};
  font-size: 1.1rem;
`;
const SubCTT = styled.span`
  float: right;
`;
export default function AnimalDetail() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isAnimal = useRecoilValue(isAnimalAtom);
  const resetList = useResetRecoilState(isAnimalAtom);

  const outSideClick = (event: React.FormEvent<HTMLDivElement>) => {
    if (!ref.current || !ref.current.contains(event.currentTarget)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    setIsOpen(!!isAnimal?.desertionNo);
  }, [isAnimal]);

  useEffect(() => {
    if (!isOpen) resetList();
  }, [isOpen, resetList]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={outSideClick}
          />
          <BigCard
            layoutId={isAnimal?.desertionNo}
            ref={ref}
            y={Math.round(scrollY.get())}
          >
            <div>
              <BigCover src={isAnimal?.popfile} />
            </div>
            <BigOverview>
              <ul style={{ listStyleType: "none", padding: "0" }}>
                <AnimalCTT>
                  <div
                    style={{
                      fontFamily: "'Jua', sans-serif",
                      fontSize: "1.2rem",
                      color: "#abe2f3",
                      textAlign: "center",
                    }}
                  >
                    {`( ${isAnimal?.processState} )`}
                  </div>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>접수일</SubTitle>
                  <SubCTT>
                    {moment(isAnimal?.happenDt).format("YYYY. MM. DD")}
                  </SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>발견장소</SubTitle>
                  <SubCTT>{isAnimal?.happenPlace}</SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>품종</SubTitle>
                  <SubCTT>{isAnimal?.kindCd}</SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>색상</SubTitle>
                  <SubCTT>{isAnimal?.colorCd}</SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>나이</SubTitle> <SubCTT>{isAnimal?.age}</SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>체중</SubTitle> <SubCTT>{isAnimal?.weight}</SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>성별</SubTitle>
                  <SubCTT>
                    {isAnimal?.sexCd === "M"
                      ? "수컷"
                      : isAnimal?.sexCd === "F"
                      ? "암컷"
                      : "미상"}
                  </SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>중성화여부</SubTitle>
                  <SubCTT>
                    {isAnimal?.neuterYn === "U" ? "미상" : isAnimal?.neuterYn}
                  </SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>특징</SubTitle>
                  <SubCTT> {isAnimal?.specialMark}</SubCTT>
                </AnimalCTT>

                <AnimalCTT>
                  <SubTitle>공고일</SubTitle>
                  <SubCTT>
                    <SubCTT>
                      {moment(isAnimal?.noticeSdt).format("YYYY. MM. DD")} ~
                      {moment(isAnimal?.noticeEdt).format("YYYY. MM. DD")}
                    </SubCTT>
                  </SubCTT>
                </AnimalCTT>
              </ul>
              <ShelterInfo>
                <AnimalCTT>
                  <SubTitle>보호장소 </SubTitle>
                  <SubCTT>{isAnimal?.careAddr}</SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>보호소이름</SubTitle>
                  <SubCTT>{isAnimal?.careNm}</SubCTT>
                </AnimalCTT>
                <AnimalCTT>
                  <SubTitle>보호소Tel (입양 문의)</SubTitle>
                  <SubCTT>{isAnimal?.careTel}</SubCTT>
                </AnimalCTT>
              </ShelterInfo>
            </BigOverview>
          </BigCard>
        </>
      )}
    </AnimatePresence>
  );
}
