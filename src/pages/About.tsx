import { motion } from "framer-motion";
import { useEffect } from "react";
import { styles } from "../components/Styles";
import { heroVariants } from "../animations";
import Meta from "../components/Meta";
import styled from "styled-components";
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
      <Meta
        title="About - Ryan James"
        description="Ryan James is a multidisciplinary designer and developer from Seattle, Washington."
      />
      <SContent>
        <SContentInner>
          <motion.div
            variants={heroVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p>
              Hello world! Whether I'm designing intuitive experiences, building
              design systems, defining brand identity, or diving deep into code,
              I bring depth, experience, and strategic thinking across
              leadership roles and teams of all sizes.
            </p>
            <p className="links">
              <a href="ryan-james-resume-2025.pdf" target="_blank">
                Resume
              </a>
              <a href="mailto:&#114;&#121;&#097;&#110;&#064;&#114;&#121;&#097;&#110;&#106;&#097;&#109;&#046;&#101;&#115;">
                Contact
              </a>
            </p>
            <p className="social">
              <a
                href="https://ryanrjames.substack.com/"
                target="_blank"
                aria-label="Substack"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 17.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ryanjames/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/ryanjames"
                target="_blank"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://x.com/ryanrjames" target="_blank" aria-label="X">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
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
      <img
        className="background-portrait"
        src="/images/ryan-james.jpg"
        alt="Ryan James"
      />
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
`;

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
  .links {
    display: flex;
    gap: 24px;
  }
  .social {
    display: flex;
    gap: 20px;
    margin-top: -0.75em;
    a {
      display: flex;
      align-items: center;
      color: ${styles.colors.active};
      transition: opacity 0.2s ease-in-out;
      &:hover {
        opacity: 0.6;
      }
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
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
    width: 45%;
    font-size: 1.3em;
  }
  @media (min-width: ${styles.breakpoints.large}px) {
    font-size: 1.5em;
  }
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    font-size: 1.75em;
    width: 45%;
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
