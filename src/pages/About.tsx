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
          <p>
          Whether designing intuitive user experiences, building comprehensive design systems, diving deep into the code, defining the
          archetypes of a brand, or bringing other artists' visions to life, Ryan James brings a thoughtful, joyful, adaptable approach to every project.
          </p>
          <p>
          Known for his versatility and curiosity,
          he has worked with small agile teams and large structured
          organizations, seamlessly adapting to different challenges. With
          experience in leadership roles, Ryan combines strategic thinking with
          hands-on execution, ensuring that the projects he's involved with are
          both innovative and effective. 
          </p>
        </motion.p>
      </SContent>
      <img src="/images/ryan-james.jpg" alt="Ryan James" />
    </SAbout>
  );
}

const SContent = styled.div`
  position: relative;
  z-index: 2;
  padding-left: ${styles.measurements.desktop.margin}px;
  width: 90%;
  line-height: 120%;
  font-size: 1em;
  @media (min-width: ${styles.breakpoints.small}px) {
    font-size: 1.3em;
  }
  @media (min-width: ${styles.breakpoints.medium}px) {
    width: 55%;
    font-size: 1.3em;
  }
  @media (min-width: ${styles.breakpoints.large}px) {
    font-size: 1.5em;
  }
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    font-size: 1.75em;
    width: 55%;
  }
  p {
    font-weight: 300;
    margin-bottom: 1.5em;
  }
`;

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