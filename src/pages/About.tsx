import { motion } from "framer-motion";
import { useEffect } from "react";
import { styles } from "../components/Styles";
import { heroVariants } from "../animations";
import styled from "styled-components";

export default function About() {

  useEffect(() => {
    document.body.classList.add("about");

    return () => {
      document.body.classList.remove("about");
    };
  }, []);

  return (
    <SAbout initial="initial" animate="animate" exit="exit">
      <SContent>
        <motion.p
          variants={heroVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
          vestibulum. Duis mollis, est non commodo luctus, nisi erat porttitor
          ligula, eget lacinia odio sem nec elit.
        </motion.p>
      </SContent>
      <img src="/images/ryan-james.jpg" alt="Ryan James" />
    </SAbout>
  );
}

const SContent = styled.div`
  position: relative;
  width: 80%;
  z-index: 2;
  font-size: 2em;
  padding-left: ${styles.measurements.desktop.margin}px;
  @media (min-width: ${styles.breakpoints.small}px) {
    font-size: 3em;
  }
  @media (min-width: ${styles.breakpoints.medium}px) {
    width: 50%;
  }
  p {
    font-weight: 300;
    line-height: 100%;
  }
`

const SAbout = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  padding-top: 80px;
  left: 0;
  bottom: 0;
  img {
    position: absolute;
    height: 100%;
    z-index: 1;
    width: auto;
    top: 0;
    bottom: 0;
    right: -45%;
    opacity: 0.4;
    @media (min-width: ${styles.breakpoints.small}px) {
      right: -35%;
    }
    @media (min-width: ${styles.breakpoints.medium}px) {
      right: -25%;
      opacity: 1;
    }
    @media (min-width: ${styles.breakpoints.large}px) {
      right: -10%;
    }
    @media (min-width: ${styles.breakpoints.xLarge}px) {
      right: 0%;
    }
  }
`;