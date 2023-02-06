import { motion } from "framer-motion";
import styled from "styled-components";
import { FiUserCheck, FiUserX } from "react-icons/fi";

const Button = styled(motion.button)<{ isopen: string }>`
  outline: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: ${(props) => (props.isopen === "true" ? 0 : 158)}px;
  right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  transition: 0.5s;
`;

export default function MenuToggle({ toggle, isOpen }: any) {
  return (
    <Button onClick={toggle} isopen={isOpen ? "true" : "false"}>
      {isOpen ? (
        <FiUserX
          style={{
            display: "inline-block",
            width: "90%",
            height: "90%",
            color: "white",
          }}
        />
      ) : (
        <FiUserCheck
          style={{
            display: "inline-block",
            width: "90%",
            height: "90%",
            color: "white",
          }}
        />
      )}
    </Button>
  );
}
