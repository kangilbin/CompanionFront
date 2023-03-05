import styled from "styled-components";
import { IGetAbandonedList, IItem } from "../../api/animalApi";
import moment from "moment";
import { useSetRecoilState } from "recoil";
import { isAnimalAtom } from "../../common/atoms";
import { motion } from "framer-motion";

const Descript = styled.div`
  padding: 10px;
`;
const DescriptCTT = styled.div`
  text-align: end;
  font-weight: bold;
`;
const DescriptTTL = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.btnColor};
`;
const Item = styled(motion.div)`
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
  border-radius: 20px;
  &:hover {
    box-shadow: 3px 3px 5px 3px rgb(184 229 240);
  }
`;
const Img = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  cursor: pointer;
  font-size: 66px;
  background-size: cover;
  background-position: center center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 15px 15px 0px 0px;
`;

interface IProps {
  data?: IGetAbandonedList;
}

export default function AnimalCard({ data }: IProps) {
  const setAnimal = useSetRecoilState(isAnimalAtom);

  return (
    <>
      {data?.response.body.items.item.map((animal, j) => (
        <Item
          key={j}
          onClick={() => setAnimal(animal)}
          layoutId={animal.desertionNo}
        >
          <Img url={animal.popfile} />
          <Descript>
            <div>
              <DescriptTTL>접수일</DescriptTTL>
              <DescriptCTT>
                {moment(animal.happenDt).format("YYYY.MM.DD")}
              </DescriptCTT>
            </div>
            <div>
              <DescriptTTL>발견장소</DescriptTTL>
              <DescriptCTT>{animal.happenPlace}</DescriptCTT>
            </div>
          </Descript>
        </Item>
      ))}
    </>
  );
}
