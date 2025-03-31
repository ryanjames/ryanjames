import { motion } from "framer-motion";
import { useEffect } from "react";
import { styles } from "../components/Styles";
import { heroVariants } from "../animations";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import clients from "../data/clients";

export default function About() {

  useEffect(() => {
    document.body.classList.add("about");

    return () => {
      document.body.classList.remove("about");
    };
  }, []);

  return (
    <SAbout initial="initial" animate="animate" exit="exit">
      <Helmet>
        <title>Ryan James - About</title>
        <meta name="description" content="Ryan James - About" />
      </Helmet>
      <SContent>
        <SContentInner>
          <motion.div
            variants={heroVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p>
              Whether designing intuitive user experiences, building comprehensive
              design systems, diving deep into the code, defining the archetypes
              of a brand, or bringing other artists' visions to life, Ryan James
              brings a thoughtful, joyful, adaptable approach to every project.
            </p>
            <p>
              Known for his versatility and curiosity, he has worked with small
              agile teams and large structured organizations, seamlessly adapting
              to different challenges. With experience in leadership roles, Ryan
              combines strategic thinking with hands-on execution, ensuring that
              the projects he's involved with are both innovative and effective.
            </p>
            <p>
              <a href="ryan-james-resume-2025.pdf" target="_blank">Resume</a>
            </p>
            <br />
            <h3>Partial Client List:</h3>
            <SClients>
              {clients.map((client) => (
                <img src={`/client-logos/${client.logo}`} />
              ))}
            </SClients>
          </motion.div>
        </SContentInner>
      </SContent>
      <img className="background-portrait" src="/images/ryan-james.jpg" alt="Ryan James" />
    </SAbout>
  );
}

const SClients = styled.div`
  opacity: 1;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding-bottom: 120px;
  > img {
    margin-top: -12px;
    height: 36px;
    width: auto;
  }
  @media (min-width: ${styles.breakpoints.small}px) {
    gap: 32px;
    opacity: 0.6;
  }
`

const SContent = styled.div`
  position: absolute;
  top: ${styles.measurements.mobile.headerHeight}px;
  padding-top: 40px;
  @media (min-width: ${styles.breakpoints.small}px) {
    top: ${styles.measurements.desktop.headerHeight}px;
  }
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  z-index: 2;
`;

const SContentInner = styled.div`
  position: relative;
  z-index: 2;
  width: 90%;
  line-height: 120%;
  font-size: 1em;
  padding-left: ${styles.measurements.mobile.margin}px;
  @media (min-width: ${styles.breakpoints.small}px) {
    padding-left: calc(2vw + ${styles.measurements.desktop.margin}px);
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
  h3 {
    font-family: ${styles.type.mono};
    text-transform: uppercase;
    font-size: 14px;
    display: block;
    padding-bottom: 18px;
    letter-spacing: 0.2em;
  }
  a,
  a:visited,
  a:active {
    color: ${styles.colors.active};
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
  .background-portrait {
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