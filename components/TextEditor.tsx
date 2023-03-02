import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState, useMemo, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import moment from "moment";
import { storage } from "../common/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { communityWrite } from "../api/backEndApi";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

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
  float: right;
  &:hover {
    background-color: #00c3ff;
  }
`;

export default function TextEditor() {
  const [title, setTitle] = useState("");
  const [dom, setDom] = useState("");
  const { register, handleSubmit } = useForm();

  const quillRef = useRef<any>();

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.click();

    input.onchange = async (event: any) => {
      const file: File = event?.target?.files[0];

      const path =
        "images/community/" +
        new Date().getFullYear() +
        "년/" +
        (new Date().getMonth() + 1) +
        "월/";
      const fileNm = moment().format("YYYYhmmss") + "_jacob_" + file.name;
      const storageRef = ref(storage, path + fileNm);

      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downUrl) =>
          quillRef.current?.editor?.insertEmbed(
            quillRef.current.getEditor().getSelection().index,
            "image",
            downUrl
          )
        );
      });
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const onValid = () => {
    const requestObj = {
      id: moment().format("YYYYMMDDHHmmss"),
      user_id: "jacob",
      title: title,
      content: quillRef.current?.editor.getText(),
      dom: dom,
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
      <ReactQuill
        forwardedRef={quillRef}
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ height: "90%" }}
        onChange={setDom}
      />
      <Save>완료</Save>
    </form>
  );
}
