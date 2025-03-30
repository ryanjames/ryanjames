import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { styles } from "./Styles";

export default function Header() {
  const location = useLocation();
  const finalText = "RYAN JAMES".split(""); // Space remains
  const dingbats = ["◸", "◹", "◺", "◿"];

  const [displayedText, setDisplayedText] = useState(
    finalText.map((char) => (char === " " ? " " : "✦"))
  );

  useEffect(() => {
    finalText.forEach((letter, index) => {
      if (letter === " ") return; // Skip spaces

      let count = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => {
          const newText = [...prev as any];
          newText[index] =
            dingbats[Math.floor(Math.random() * dingbats.length)];
          return newText;
        });
        count++;
      }, 100);

      // Stop cycling after some time and resolve to the final letter
      setTimeout(() => {
        clearInterval(interval);
        setDisplayedText((prev) => {
          const newText = [...prev as any];
          newText[index] = letter;
          return newText;
        });
      }, 300 + index * 130); // Sequential delay
    });

    return () => {
      // Cleanup intervals in case component unmounts
      finalText.forEach((_letter, index) => clearTimeout(index));
    };
  }, []);

  return (
    <SHeader>
      <SHeaderInner>
        <SLogo to="/">
          {displayedText.map((char, index) => (
            <motion.h1
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {char}
            </motion.h1>
          ))}
        </SLogo>
        <SNavigation
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
        >
          <StyledNavLink
            to="/work#san-francisco-standard"
            $active={location.pathname.startsWith("/work")}
          >
            Work
          </StyledNavLink>
          <StyledNavLink to="/about" $active={location.pathname === "/about"}>
            About
          </StyledNavLink>
        </SNavigation>
        <SBar
          className="header-bar"
          initial={{ x: "-100%" }}
          animate={{ x: "0" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </SHeaderInner>
    </SHeader>
  );
}

const SHeader = styled(motion.div)`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 ${styles.measurements.mobile.margin}px;
  @media (min-width: ${styles.breakpoints.small}px) {
    padding: 0 ${styles.measurements.desktop.margin}px;
  }
  .about & {
    background: transparent;
  }
  background: ${styles.colors.white};
`;
const SHeaderInner = styled.div`
  position: relative;
  width: 100%;
  height: ${styles.measurements.mobile.headerHeight}px;
  @media (min-width: ${styles.breakpoints.small}px) {
    height: ${styles.measurements.desktop.headerHeight}px;
  }
  overflow: hidden;
  display: flex;
  align-items: center;
`;


const SLogo = styled(Link)`
  position: absolute;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-family: ${styles.type.mono};
  display: flex;
  white-space: pre;
  h1 {
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.2em;
    width: 0.8em;
  }
`;

const SNavigation = styled(motion.nav)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 1.5rem;
  font-family: ${styles.type.mono};
`;
const SBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-bottom: 1px solid ${styles.colors.black};
`;

const StyledNavLink = styled(Link)<{ $active: boolean }>`
  transition: color 0.2s ease-in-out;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 300;
  color: ${(props) =>
    props.$active ?  styles.colors.active : styles.colors.black} !important;
  .about & {
    color: ${(props) => (props.$active ? styles.colors.active : styles.colors.white)} !important;
  }
  &:hover {
    color: ${styles.colors.active} !important;
  }
`;
