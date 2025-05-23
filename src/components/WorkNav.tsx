import { motion } from "framer-motion";
import styled from "styled-components";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { TWorks } from "../types";
import { styles } from "./Styles";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "-100%", // Off-screen left
  },
  visible: {
    opacity: 1,
    x: "0", // Bring into view
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 1,
    x: "0", // Off-screen left
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const categoryVariants = {
  hidden: {
    opacity: 0,
    x: "-100%", // Slide from left
  },
  visible: {
    opacity: 1,
    x: "0", // Slide to original position
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      staggerChildren: 0.01, // Stagger forward
      delayChildren: 0.01,
    },
  },
  exit: {
    opacity: 0,
    x: "-100%", // Slide from left
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      staggerChildren: 0.01, // Reverse stagger
      staggerDirection: -1, // Reverse order of staggering
    },
  },
};

const listItemVariants = {
  hidden: {
    opacity: 0,
    x: "-50%",
  },
  visible: {
    opacity: 1,
    x: "0",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 1,
    x: "-50%",
    transition: {
      duration: 0.02,
      ease: "easeInOut",
    },
  },
};

export default function WorkNav({
  works,
  scrollToSection,
}: {
  works: TWorks;
  scrollToSection: any;
}) {
  const location = useLocation(); // Using React Router's location
  const [activeHash, setActiveHash] = useState(location.hash); // Track hash state

  // Track hash change in URL manually using useEffect
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash); // Update active hash when hash changes
    };

    // Manually monitor hash changes by using window.location.hash directly
    const interval = setInterval(() => {
      if (window.location.hash !== activeHash) {
        handleHashChange();
      }
    }, 100); // Check every 100ms for hash change

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [activeHash]); // Dependency array ensures that effect reruns only when activeHash changes

  return (
    <SWorkNav
      variants={categoryVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
        {works.map((category) => (
          <React.Fragment key={category.category}>
            <motion.dt  variants={listItemVariants}>
              {category.category}
            </motion.dt>
            {category.items.map((work) => (
              <motion.dd key={work.slug} variants={listItemVariants}>
                {work.category ? (
                  <StyledFeaturedWorkNavLink
                    to={`/work#${work.slug}`}
                    $active={activeHash === `#${work.slug}`} // Compare with activeHash
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(work.slug); // Scroll to the relevant section
                    }}
                  >
                    {work.title}
                    <span>{work.category}</span>
                  </StyledFeaturedWorkNavLink>
                ) : (
                  <StyledWorkNavLink
                    to={`/work#${work.slug}`}
                    $active={activeHash === `#${work.slug}`} // Compare with activeHash
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(work.slug); // Scroll to the relevant section
                    }}
                  >
                    {work.title}
                  </StyledWorkNavLink>
                )}
              </motion.dd>
            ))}
          </React.Fragment>
        ))}
    </SWorkNav>
  );
}

const SWorkNav = styled(motion.dl)`
  width: ${styles.measurements.desktop.workNavWidth}px;
  position: fixed;
  left: ${styles.measurements.desktop.margin}px;
  top: 80px;
  padding-right: ${styles.measurements.desktop.margin}px;
  z-index: 1000;
  font-size: 0.9em;
  height: calc(100vh - 80px);
  overflow-y: scroll;
  display: block;
  dt {
    font-weight: 700;
    padding-top: 20px;
    display: block;
    line-height: 160%;
  }
  dt:first-child {
    padding-top: ${styles.measurements.desktop.margin}px;
  }
  dd:last-child {
    margin-bottom: ${styles.measurements.desktop.margin}px;
  }
`;

const StyledWorkNavLink = styled(Link)<{ $active: boolean }>`
  line-height: 160%;
  font-weight: 300;
  color: ${(props) =>
    props.$active ? styles.colors.active : styles.colors.black} !important;
  .about & {
    color: ${(props) =>
      props.$active ? styles.colors.active : styles.colors.white} !important;
  }
`;

const StyledFeaturedWorkNavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  line-height: 160%;
  font-weight: 300;
  color: ${(props) =>
    props.$active ? styles.colors.active : styles.colors.black} !important;
  .about & {
    color: ${(props) =>
      props.$active ? styles.colors.active : styles.colors.white} !important;
  }
  span {
    text-transform: uppercase;
    font-size: 0.8em;
    font-family: ${styles.type.mono};
  }
  border-bottom: 1px solid ${styles.colors.offBlack};
`;
