import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { TWorks } from "../types";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "-100%", // Off-screen left
  },
  visible: {
    opacity: 1,
    x: "0", // Bring into view
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "-100%", // Off-screen left
    transition: {
      duration: 1.6,
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
      duration: 0.6,
      ease: "easeInOut",
      staggerChildren: 0.1, // Stagger forward
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    x: "-100%", // Slide out to left
    transition: {
      delay: 2,
      duration: 0.6,
      ease: "easeInOut",
      staggerChildren: 0.1, // Reverse stagger
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
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "-50%",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export default function WorkNav({ works, scrollToSection }: { works: TWorks, scrollToSection: any}) {
  return (
    <SWorkNav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.dl
        variants={categoryVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {works.map((category) => (
          <>
            <motion.dt key={category.category} variants={listItemVariants}>
              {category.category}
            </motion.dt>
            {category.items.map((work) => (
              <motion.dd key={work.slug} variants={listItemVariants}>
                <StyledWorkNavLink
                  to={`/work#${work.slug}`}
                  $active={location.hash === `#${work.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(work.slug);
                  }}
                >
                  {work.title}
                </StyledWorkNavLink>
              </motion.dd>
            ))}
          </>
        ))}
      </motion.dl>
    </SWorkNav>
  );
}


const SWorkNav = styled(motion.div)`
  width: 220px;
  position: fixed;
  left: 32px;
  top: 100px;
  z-index: 1000;
  dt {
    padding-top: 20px;
    display: block;
    line-height: 160%;
  }
`;

const StyledWorkNavLink = styled(Link)<{ $active: boolean }>`
  font-size: 1em;
  margin-left: 12px;
  line-height: 160%;
  font-weight: 300;
  color: ${(props) => (props.$active ? "#0070f3" : "#555")} !important;
`;