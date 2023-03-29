import styled from "styled-components";
import Seo from "../../components/Seo";
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  top: 3rem;
  padding: 10px;
`;
const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
  padding-bottom: 50px;
  height: 100%;
`;

export default function Write() {
  return (
    <Container>
      <Seo title="커뮤니티s" />
      <Grid>
        <div>
          <div>
            <span>제목</span> <input type="text" />
          </div>
          <div>사진, 주소</div>
          <div>내용</div>
          <button>완료</button>
        </div>
      </Grid>
    </Container>
  );
}
