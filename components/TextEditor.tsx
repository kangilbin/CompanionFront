import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { useForm } from "react-hook-form";
import moment from "moment";
import { communityWrite } from "../api/backEndApi";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <Loader />,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const Title = styled.input`
  margin: 10px;
  width: 80%;
  height: 2rem;
  border-radius: 10px;
  font-size: 20px;
`;

const Save = styled.button`
  cursor: pointer;
  padding: 8px;
  border: 1px solid;
  border-radius: 5px;
  background-color: ${(props) => props.theme.pointColor};
  font-weight: bold;
  color: white;
  font-family: "Noto Sans KR";
  margin-top: 100px;
  &:hover {
    background-color: #00c3ff;
  }
`;

export default function TextEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { register, handleSubmit } = useForm();
  const onValid = () => {
    const requestObj = {
      id: "",
      time: moment().format("YYYYMMDDHHmmss"),
      title: title,
      content: content,
    };
    communityWrite(requestObj);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <span>제목</span>
      <Title
        {...register("TITLE", { required: true })}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="Title..."
      />
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ height: "80%" }}
        onChange={setContent}
      />
      <Save style={{}}>완료</Save>
    </form>
  );
}
