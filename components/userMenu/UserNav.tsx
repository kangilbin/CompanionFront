import { motion } from "framer-motion";
import styled from "styled-components";
import { MenuItem } from "./MenuItem";

const Ul = styled(motion.ul)`
  padding: 25px;
  position: absolute;
  top: 180px;
  width: 230px;
`;

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const UserNav = () => (
  <Ul variants={variants}>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} />
    ))}
  </Ul>
);

const itemIds = [0, 1, 2, 3, 4];
