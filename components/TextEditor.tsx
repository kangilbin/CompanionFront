import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState, useMemo, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import moment from "moment";
import { storage } from "../common/Firebase";
import {
  ref,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

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

interface QuilFileProps {
  base64: string;
  file: File;
}

export default function TextEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { register, handleSubmit } = useForm();

  const quillRef = useRef<any>();

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    //document.body.appendChild(input);

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

      // fileReader.onload = (event: any) => {
      //   const baseData: string = event.target.result;
      //   quillRef.current?.editor?.insertEmbed(
      //     quillRef.current.getEditor().getSelection().index,
      //     "image",
      //     baseData
      //   );
      //   setQuillFile((prev: QuilFileProps[]) => [
      //     ...prev,
      //     { base64: baseData, file: file },
      //   ]);
      // };
      // fileReader.readAsDataURL(file);
    };
  };

  // const quilImageTagArr = useMemo(() => {
  //   const result = Array.from(
  //     content.matchAll(/<img[^>]+src=["']([^'">]+)['"]/gi)
  //   );
  //   return result.map((item) => item.pop() || "");
  // }, [content]);

  // useEffect(() => {
  //   const changeResultFiles = quillFile?.filter(
  //     (item) => quilImageTagArr.includes(item.base64) && item
  //   );
  //   if (changeResultFiles.length !== quillFile.length) {
  //     setQuillFile(changeResultFiles);
  //   }
  // }, [quilImageTagArr, quillFile]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
    }),
    []
  );

  const onValid = () => {
    const path =
      "images/community/" +
      new Date().getFullYear() +
      "년/" +
      (new Date().getMonth() + 1) +
      "월/";
    const fileNm = moment().format("YYYYhmmss") + "_jacob";
    const storageRef = ref(storage, path + fileNm);

    const requestObj = {
      id: "",
      time: moment().format("YYYYMMDDHHmmss"),
      title: title,
      content: content,
    };
    content.replace(/data:([^'">]+)/g, (match) => {
      let url = "";
      uploadString(storageRef, match.split(",")[1], "base64", {
        contentType: "image/jpg",
      })
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downUrl) => (url = downUrl));
        })
        .catch((error) => {
          alert(error + " : 이미지 저장 오류 발생.");
        });
      return url;
    });
    //communityWrite(requestObj);
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
        style={{ height: "80%" }}
        onChange={setContent}
      />
      <Save style={{}}>완료</Save>
    </form>
  );
}
