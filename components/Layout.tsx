import NavBar from "./NavBar";
import styled from "styled-components";
import { useState, useEffect } from "react";

import NavBT from "./NavBT";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  margin-bottom: 25%;
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
      <NavBar isMobile={mobile} />
      {mobile ? (
        <>
          <Container>
            <MainGird isMobile={mobile}>{children}</MainGird>
          </Container>
          <NavBT />
        </>
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
