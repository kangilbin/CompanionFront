import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Loader from "../Loader";
import ReactQuill from "react-quill";
import styled from "styled-components";
const ReactQuill2 = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false, loading: () => <Loader /> }
);

const CustomReactQuill = styled(ReactQuill2)`
  margin: 30px 0px;
  padding-bottom: 30px;
  border-bottom: solid 1px ${(props) => props.theme.pointColor};
  & > div {
    border: none !important;
  }
`;

export default function BoardWriting(data: any) {
  return (
    <CustomReactQuill
      modules={{ toolbar: false }}
      readOnly="false"
      value={data.data}
    />
  );
}
