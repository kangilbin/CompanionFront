import Image from "next/image";
import styled from "styled-components";
import Seo from "../components/Seo";
import cat from "../public/img/cat.png";
import { SlLock, SlUser } from "react-icons/sl";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  top: 3rem;
  padding: 10px;
`;
const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
  text-align: center;
`;
const SiteNm = styled.span`
  font-weight: bold;
  font-family: "Noto Sans KR";
  font-size: 1.7rem;
`;
const Welcome = styled.div`
  font-size: 1.5rem;
  padding: 10px;
`;

const Hr = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 1rem;
  margin: 15px 0px;

  &::before,
  ::after {
    content: "";
    flex-grow: 1;
    background: #e5e7eb;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const LoginBox = styled.div`
  display: inline-block;
  padding: 10px;
  border: 1px solid;
  border-radius: 15px;
`;

const LoginId = styled.div`
  border: 1px solid;
  padding: 10px;
  border-radius: 15px 15px 0px 0px;
  &:focus-within {
    border: 1px solid ${(props) => props.theme.pointColor};
    color: ${(props) => props.theme.pointColor};
  }
`;
const LoginPw = styled.div`
  border: 1px solid;
  padding: 10px;
  border-radius: 0px 0px 15px 15px;
  &:focus-within {
    border: 1px solid ${(props) => props.theme.pointColor};
    color: ${(props) => props.theme.pointColor};
  }
`;

const Table = styled.div`
  display: table;
  border-collapse: collapse;
`;

const Input = styled.input`
  border: none;
  height: 30px;
  margin-left: 10px;
  outline: none;
`;
export default function Login() {
  return (
    <Container>
      <Seo title="로그인s" />
      <Grid>
        <div>
          <div style={{ padding: "2rem" }}>
            <Image src={cat} alt="야옹이 사진" width={200} height={200} />
          </div>
          <Welcome>
            <SiteNm>간택당한 집사들s</SiteNm>에 오신것을 환영합니다.
          </Welcome>
        </div>
        <Hr>
          <span>아이디 로그인</span>
        </Hr>
        <LoginBox>
          <Table>
            <LoginId>
              <SlUser />
              <Input placeholder="아이디" />
            </LoginId>
            <LoginPw>
              <SlLock />
              <Input placeholder="비밀번호" />
            </LoginPw>
          </Table>
          <div>
            <button>로그인</button>
          </div>
        </LoginBox>
      </Grid>
    </Container>
  );
}
