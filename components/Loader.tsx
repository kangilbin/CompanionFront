import styled from "styled-components";
import { motion } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Container = styled(motion.div)`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Circle = styled(motion.span)`
  display: block;
  width: 2rem;
  height: 2rem;
  border: 10px solid ${(props) => props.theme.pointColor};
  border-radius: 1rem;
  margin: 5px;
`;

const circleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "60%",
  },
};

const Loader = () => {
  return (
    <>
      <Overlay animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <Container variants={containerVariants} initial="start" animate="end">
        <Circle
          variants={circleVariants}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            repeatType: "mirror",
            repeat: Infinity,
          }}
        />
        <Circle
          variants={circleVariants}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            repeatType: "mirror",
            repeat: Infinity,
          }}
        />
        <Circle
          variants={circleVariants}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            repeatType: "mirror",
            repeat: Infinity,
          }}
        />
      </Container>
    </>
  );
};

export default Loader;
