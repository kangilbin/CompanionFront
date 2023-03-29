import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { duplicate, IJoin, join } from "../api/backEndApi";
import Seo from "../components/Seo";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  top: 3rem;
  padding: 10px;
`;
const Grid = styled.div`
  border-top: dotted ${(props) => props.theme.pointColor};
  text-align: center;
`;
const JoinBox = styled.form`
  display: inline-block;
  padding: 25px;
  border-radius: 15px;
  box-shadow: ${(props) => props.theme.boxShadow};
  border: none;
  width: 700px;
  @media (max-width: 900px) {
    width: 90%;
  }
`;

const Label = styled.label`
  position: absolute;
  padding: 6px;
  background: white;
  font-size: 14px;
  color: #888;
  font-weight: bold;
  z-index: 1;
  left: 30px;
  top: 3px;
`;

const Input = styled.input<{ width: string }>`
  position: relative;
  width: ${(props) => props.width};
  border: 1px solid #dddddd !important;
  font-size: 1rem;
  line-height: 2;
  letter-spacing: -0.04rem;
  border-radius: 10px;
  padding: 16px;
  margin-top: 16px;
  &:focus {
    outline: 2px solid ${(props) => props.theme.pointColor};
  }
  &::placeholder {
    color: #e2e2e2;
  }
`;

const ItemBox = styled.div`
  position: relative;
  display: flex;
`;

const BtnBox = styled.div`
  display: inline-block;
  width: 20%;
  height: 100%;
  margin-top: 16px;
`;

const Btn = styled.div`
  line-height: 4;
  border: none;
  font-size: 1rem;
  font-family: "Jua";
  border-radius: 10px;
  margin-left: 10px;
  cursor: pointer;
  background-color: #e0e6e7;
  &:hover {
    background-color: ${(props) => props.theme.pointColor};
    color: white;
  }
`;
const Star = styled.span`
  color: ${(props) => props.theme.pointColor};
  margin-right: 5px;
`;

const FormBtn = styled.button`
  border-radius: 10px;
  padding: 16px;
  margin-top: 16px;
  position: relative;
  width: 100%;
  border: none;
  background-color: ${(props) => props.theme.pointColor};
  color: white;
  font-family: "Jua";
  font-size: 1.1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.stPointColor};
  }
`;
const Error = styled.div`
  margin-top: 5px;
  color: red;
  font-size: 0.9rem;
  font-weight: bold;
`;

const Success = styled.div`
  margin-top: 5px;
  color: ${(props) => props.theme.pointColor};
  font-size: 0.9rem;
  font-weight: bold;
`;

interface IForm {
  name: string;
  id: string;
  nickname: string;
  phone: string;
  password: string;
  password2: string;
  addr?: string;
  zipNo?: string;
  addrDetail?: string;
}
declare global {
  interface Window {
    daum: any;
  }
}
interface IAddr {
  address: string;
  zonecode: string;
}
export default function Join() {
  const { register, handleSubmit, setError, getValues, setValue } =
    useForm<IForm>();
  const [isDupOpen, setIsDupOpen] = useState(false);
  const { data, refetch } = useQuery<any>(["nickname", "check"], () =>
    duplicate(getValues("nickname"))
  );

  const onValid = (param: IForm) => {
    if (param.password !== param.password2) {
      /* 특정 오류 */
      setError(
        "password2",
        { message: "패스워드가 다릅니다." },
        { shouldFocus: true }
      );
    } else if (data) {
      setError(
        "nickname",
        { message: "증복 여부를 체크해 주세요." },
        { shouldFocus: true }
      );
    } else {
      const obj = {} as IJoin;
      obj.id = param.id;
      obj.user_name = param.name;
      obj.nickname = param.nickname;
      obj.phone = param.phone;
      obj.password = param.password;
      obj.addr = param.addr;
      obj.zip_no = param.zipNo;
      obj.addr_detail = param.addrDetail;
      join(obj);
    }
  };

  const onClickDupCheck = () => {
    if (getValues("nickname")) {
      refetch();
      setIsDupOpen(true);
    }
  };

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        (document.getElementById("addr") as HTMLInputElement).value =
          data.address;
        (document.getElementById("zipNo") as HTMLInputElement).value =
          data.zonecode;
        setValue("addr", data.address);
        setValue("zipNo", data.zonecode);
        document.getElementById("addrDetail")?.focus();
      },
    }).open();
  };

  return (
    <Container>
      <Seo title="회원가입s" />
      <Grid>
        <JoinBox onSubmit={handleSubmit(onValid)}>
          <ItemBox>
            <Label htmlFor="name">
              <Star>*</Star>이름
            </Label>
            <Input
              width="100%"
              id="name"
              type="text"
              {...register("name", { required: true })}
            />
          </ItemBox>
          <ItemBox>
            <Label htmlFor="id">
              <Star>*</Star>아아디
            </Label>
            <Input
              width="100%"
              id="id"
              type="email"
              {...register("id", { required: true })}
              placeholder="이메일 형식"
            />
          </ItemBox>
          <ItemBox>
            <Label htmlFor="nickname">
              <Star>*</Star>닉네임
            </Label>
            <Input
              width="80%"
              id="nickname"
              type="text"
              {...register("nickname", { required: true })}
            />
            <BtnBox>
              <Btn onClick={onClickDupCheck}>확인</Btn>
            </BtnBox>
          </ItemBox>
          {isDupOpen && (
            <ItemBox>
              {data ? (
                <Error>중복된 닉네임 입니다.</Error>
              ) : (
                <Success>사용 가능</Success>
              )}
            </ItemBox>
          )}
          <ItemBox>
            <Label htmlFor="phone">
              <Star>*</Star>휴대폰
            </Label>
            <Input
              width="100%"
              id="phone"
              type="tel"
              {...register("phone", { required: true })}
            />
          </ItemBox>
          <ItemBox>
            <Label htmlFor="password">
              <Star>*</Star>비밀번호
            </Label>
            <Input
              width="100%"
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
          </ItemBox>
          <ItemBox>
            <Label htmlFor="password2">
              <Star>*</Star>비밀번호 재확인
            </Label>
            <Input
              width="100%"
              id="password2"
              type="password"
              {...register("password2", { required: true })}
            />
          </ItemBox>
          <ItemBox>
            <Label htmlFor="addr">주소</Label>
            <Input
              readOnly
              id="addr"
              width="80%"
              type="text"
              {...register("addr")}
              onClick={onClickAddr}
            />
            <BtnBox>
              <Btn onClick={onClickAddr}>검색</Btn>
            </BtnBox>
          </ItemBox>
          <ItemBox>
            <Label htmlFor="zipNo">우편번호</Label>
            <Input
              readOnly
              width="100%"
              id="zipNo"
              type="text"
              {...register("zipNo")}
            />
          </ItemBox>
          <ItemBox>
            <Label htmlFor="addrDetail">상세주소</Label>
            <Input
              width="100%"
              id="addrDetail"
              type="text"
              {...register("addrDetail")}
            />
          </ItemBox>
          <ItemBox>
            <FormBtn>가입</FormBtn>
          </ItemBox>
        </JoinBox>
      </Grid>
    </Container>
  );
}
