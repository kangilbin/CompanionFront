import TextEditor from "../../components/TextEditor";
import styled from "styled-components";
import Seo from "./../../components/Seo";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 50vh;
  padding: 10px;
`;

const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
  padding-bottom: 50px;
  height: 100%;
`;

const GridBody = styled.div`
  margin-top: 5rem;
  height: 100%;
  display: flex;
  justify-content: center;
`;
export default function Write() {
  return (
    <Container>
      <Seo
        title="반려동물 커뮤니티 작성"
        description="반려동물 커뮤니티 글 작성 페이지"
        url="https://www.meowbow.shop/community/write"
      />
      <Grid>
        <GridBody>
          <TextEditor />
        </GridBody>
      </Grid>
    </Container>
  );
}
