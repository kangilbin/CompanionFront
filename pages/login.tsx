import Image from "next/image";
import styled from "styled-components";
import Seo from "../components/Seo";
import cat from "../public/img/cat.png";
import { SlLock, SlUser } from "react-icons/sl";
import { useEffect, useState } from "react";
import { login } from "../api/backEndApi";
import { useQuery } from "@tanstack/react-query";

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
  padding: 25px;
  border-radius: 15px;
  box-shadow: ${(props) => props.theme.boxShadow};
  border: none;
  width: 460px;
  @media (max-width: 632px) {
    width: 100%;
  }
`;

const LoginId = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.btnColor};
  padding: 10px;
  border-radius: 15px 15px 0px 0px;
  margin-bottom: -1px;
  text-align: left;
  &:focus-within {
    z-index: 1;
    border: 1px solid ${(props) => props.theme.pointColor};
    color: ${(props) => props.theme.pointColor};
  }
`;
const LoginPw = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.btnColor};
  color: ${(props) => props.theme.btnColor};
  padding: 10px;
  border-radius: 0px 0px 15px 15px;
  margin-top: -1px;
  text-align: left;
  &:focus-within {
    z-index: 1;
    border: 1px solid ${(props) => props.theme.pointColor};
    color: ${(props) => props.theme.pointColor};
  }
`;

const Input = styled.input`
  border: none;
  height: 30px;
  font-family: auto;
  margin-left: 10px;
  outline: none;
  width: 90%;
  font-size: 1.1rem;
`;

const LoginBtn = styled.button`
  width: 100%;
  border-radius: 15px;
  height: 3rem;
  border: none;
  cursor: pointer;
  color: white;
  font-family: "Noto Sans KR";
  font-weight: bold;
  background-color: #abe2f3;
  box-shadow: ${(props) => props.theme.boxShadow};
  font-size: 1.5rem;
  &:hover {
    background-color: ${(props) => props.theme.stPointColor};
    color: white;
  }
`;
const Error = styled.div`
  padding-top: 25px;
  text-align: left;
  color: red;
`;
export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const { data, refetch } = useQuery<any>(
    ["error", "login"],
    () => login({ id, pw }),
    { enabled: isClick, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    setError(data);
  }, [data]);

  const onClickLogin = () => {
    isClick ? refetch() : setIsClick(true);
  };
  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickLogin();
    }
  };
  return (
    <Container>
      <Seo
        title="로그인s"
        description="로그인 페이지"
        url="https://www.meowbow.shop/login"
      />
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
          <div>
            <LoginId>
              <SlUser
                style={{
                  height: "1.1rem",
                  width: "1.1rem",
                }}
              />
              <Input
                placeholder="아이디"
                onChange={(e) => setId(e.currentTarget.value)}
                onKeyPress={handleOnKeyPress}
              />
            </LoginId>
            <LoginPw>
              <SlLock
                style={{
                  height: "1.1rem",
                  width: "1.1rem",
                }}
              />
              <Input
                placeholder="비밀번호"
                type="password"
                onChange={(e) => setPw(e.currentTarget.value)}
                onKeyPress={handleOnKeyPress}
              />
            </LoginPw>
          </div>
          {Boolean(error) && (
            <>
              <Error>
                아이디 또는 비밀번호를 잘못 입력했습니다.
                <br />
                입력하신 내용을 다시 확인해주세요.
              </Error>
            </>
          )}
          <div style={{ paddingTop: "25px" }}>
            <LoginBtn onClick={onClickLogin}>로그인</LoginBtn>
          </div>
        </LoginBox>
      </Grid>
    </Container>
  );
}
