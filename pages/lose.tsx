import styled from "styled-components";
import Seo from "../components/Seo";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100vh;
  position: relative;
  top: 3rem;
  padding: 10px;
`;
export default function Community() {
  return (
    <Container>
      <Seo title="간택당한 집사s" />
      <h1>lose</h1>
    </Container>
  );
}
