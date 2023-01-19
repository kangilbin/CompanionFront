import NavBar from "./NavBar";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`;
const Advertise = styled.div`
  grid-column: span 1;
`;
const MainGird = styled.div<{ isMobile: Boolean }>`
  grid-column: span ${(props) => (props.isMobile ? 10 : 8)};
`;

export default function Layout({ children }: React.PropsWithChildren) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const user = navigator.userAgent;
    if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
      setMobile(true);
    }
  }, [mobile]);

  return (
    <>
      <NavBar />
      {mobile ? (
        <Container>
          <MainGird isMobile={mobile}>{children}</MainGird>
        </Container>
      ) : (
        <Container>
          <Advertise></Advertise>
          <MainGird isMobile={mobile}>{children}</MainGird>
          <Advertise></Advertise>
        </Container>
      )}
    </>
  );
}
