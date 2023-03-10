import Link from "next/link";
import styled from "styled-components";
import { motion, useCycle, useScroll } from "framer-motion";
import { useRouter } from "next/router";

const Menu = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 10px 40px 0px 40px;
  padding: 10px;
  gap: 10px;
`;

const Page = styled(motion.a)`
  border-radius: 20px;
  text-decoration-line: none;
  background-color: #e0e6e7;
  font-weight: bold;
  display: grid;
  grid-template-rows: 1fr;
`;

const Text = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "#000" : props.theme.text2Color)};
  font-weight: bold;
  font-size: 30px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jua", sans-serif;
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
  border-radius: 20px;
  gap: 10%;
  text-align: center;
`;

const Line = styled(motion.div)`
  margin: 0px 20px 0px 20px;
  border-bottom: 3px solid ${(props) => props.theme.pointColor};
`;

const Svg = styled.svg`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  path {
    stroke: white;
    stroke-width: 15;
  }
`;
const svgVariants = {
  start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
  end: {
    pathLength: 1,
    fill: "rgba(255,255,255,1)",
  },
};

const tabVariants = {
  hover: { scale: 1.1, transition: { type: "spring", damping: 1 } },
  click: {
    scale: 1,
    backgroundColor: "#bdc3c7",
  },
};

const SubTab = styled.div`
  grid-column: 3/5;
  margin-top: 10px;
  justify-content: space-between;
  display: flex;
`;
const SubPage = styled.a`
  cursor: pointer;
  text-decoration-line: none;
  font-family: "Noto Sans KR";
  padding: 0px 5px 0px 5px;
  border: 2px solid ${(props) => props.theme.pointColor};
  color: #00c3ff;
  border-radius: 15px;
  font-weight: bold;
  margin-right: 10px;
  &:hover {
    box-shadow: 1px 1px 2px 1px rgb(195 243 255);
    color: #a39595;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const LoginBtn = styled.button`
  padding: 5px 10px 5px 10px;
  font-family: "Noto Sans KR";
  height: 100%;
  font-weight: bold;
  background-color: white;
  box-shadow: ${(props) => props.theme.boxShadow};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.btnColor};
  }
`;
const JoinBtn = styled.button`
  height: 100%;
  padding: 5px 10px 5px 10px;
  font-family: "Noto Sans KR";
  font-weight: bold;
  background-color: ${(props) => props.theme.pointColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.stPointColor};
  }
`;

export default function NavBar() {
  const router = useRouter();
  return (
    <Menu>
      <Link href="/" legacyBehavior>
        <Page variants={tabVariants} whileHover="hover" whileTap="click">
          <Text isActive={router.pathname === "/"}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <motion.path
                variants={svgVariants}
                initial="start"
                animate="end"
                transition={{
                  default: { duration: 3 },
                  fill: { duration: 2, delay: 1 },
                }}
                d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"
              />
            </Svg>
            ??????s.
          </Text>
          {router.pathname === "/" && <Line layoutId="line" />}
        </Page>
      </Link>
      <Link href="/videos" legacyBehavior>
        <Page variants={tabVariants} whileHover="hover" whileTap="click">
          <Text isActive={router.pathname === "/videos"}>??????</Text>
          {router.pathname === "/videos" && <Line layoutId="line" />}
        </Page>
      </Link>
      <Link href="/community" legacyBehavior>
        <Page variants={tabVariants} whileHover="hover" whileTap="click">
          <Text isActive={router.pathname === "/community"}>????????????</Text>
          {router.pathname === "/community" && <Line layoutId="line" />}
        </Page>
      </Link>
      <Link href="/lose" legacyBehavior>
        <Page variants={tabVariants} whileHover="hover" whileTap="click">
          <Text isActive={router.pathname === "/lose"}>????????????</Text>
          {router.pathname === "/lose" && <Line layoutId="line" />}
        </Page>
      </Link>
      <SubTab>
        <Link href="/adoption" legacyBehavior>
          <SubPage>????????????</SubPage>
        </Link>
        <UserBox>
          <LoginBtn
            onClick={() => {
              router.push("/login");
            }}
          >
            ?????????
          </LoginBtn>
          <JoinBtn
            onClick={() => {
              router.push("/join");
            }}
          >
            ????????????
          </JoinBtn>
        </UserBox>
      </SubTab>
    </Menu>
  );
}
