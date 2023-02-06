import { motion } from "framer-motion";
import styled from "styled-components";

const Li = styled(motion.li)`
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const ItemIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex: 40px 0;
  margin-right: 20px;
`;

const ItemText = styled.div`
  border-radius: 5px;
  width: 200px;
  height: 20px;
  flex: 1;
`;

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i }: any) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <Li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ItemIcon style={style} />
      <ItemText style={style}>내 정보</ItemText>
    </Li>
  );
};
