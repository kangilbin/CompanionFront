import { useRouter } from "next/router";
import styled from "styled-components";
import { FaUserCircle, FaDog } from "react-icons/fa";
import Link from "next/link";
import { getCookie, removeCookie } from "../common/utills";

const BtNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  height: 10%;
  position: fixed;
  bottom: 0;
  background: white;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.btnColor};
  left: 0;
  border-radius: 20px;
`;

const IconBox = styled.div<{ isActive: boolean }>`
  padding: 1rem;
  svg {
    color: ${(props) =>
      props.isActive ? props.theme.pointColor : props.theme.btnColor};
    height: 100%;
    width: 100%;
  }
`;
export default function NavBT() {
  const router = useRouter();
  const onClick = () => {
    if (Boolean(getCookie("token"))) {
      let isTrue = confirm("로그아웃 하시겠습니까?");
      if (isTrue) {
        removeCookie("token", { path: "/" });
        removeCookie("id", { path: "/" });
      }
    } else {
      router.push("/login");
    }
  };
  return (
    <BtNav>
      <IconBox isActive={false}></IconBox>
      <IconBox isActive={router.pathname === "/adoption"}>
        <Link href="/adoption">
          <FaDog />
        </Link>
      </IconBox>
      <IconBox isActive={router.pathname === "/login"} onClick={onClick}>
        <FaUserCircle />
      </IconBox>
      <IconBox isActive={false}></IconBox>
    </BtNav>
  );
}
