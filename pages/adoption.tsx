import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { animalList } from "../api/animalApi";
import Seo from "../components/Seo";
import { IGetAbandonedList } from "../api/animalApi";
import Loader from "./../components/Loader";
import { dateFormat } from "./../common/utills";
import AnimalSearch from "../components/AnimalSearch";
import { useState, useEffect } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100vh;
  position: relative;
  padding: 10px;
  font-family: "Noto Sans KR";
`;
const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
`;
const Box = styled.div`
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 1.5rem;
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
const Item = styled.div`
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
  border-radius: 20px;
  &:hover {
    box-shadow: 3px 3px 5px 3px rgb(184 229 240);
  }
`;

export default function Adoption() {
  const [obj, setObj] = useState({});
  const {
    data: AData,
    isLoading: AIsLoading,
    refetch,
    isFetching,
  } = useQuery<IGetAbandonedList>(["animals"], () => animalList(obj));

  function objFun(obj: any) {
    setObj(obj);
  }

  useEffect(() => {
    refetch();
  }, [obj, refetch]);
  return (
    <Container>
      <Seo title="유기동물s" />
      {AIsLoading || isFetching ? (
        <Loader />
      ) : (
        <Grid>
          <AnimalSearch objFun={objFun} />
          <Box>
            {AData?.response.body.items.item.map((animal, i) => (
              <Item key={i}>
                <Img url={animal.popfile} />
                <Descript>
                  <div>
                    <DescriptTTL>접수일</DescriptTTL>
                    <DescriptCTT>
                      {dateFormat(
                        `${animal.happenDt.substring(
                          0,
                          4
                        )}-${animal.happenDt.substring(
                          4,
                          6
                        )}-${animal.happenDt.substring(6, 8)}`
                      )}
                    </DescriptCTT>
                  </div>
                  <div>
                    <DescriptTTL>발견장소</DescriptTTL>
                    <DescriptCTT>{animal.happenPlace}</DescriptCTT>
                  </div>
                </Descript>
              </Item>
            ))}
          </Box>
        </Grid>
      )}
    </Container>
  );
}
