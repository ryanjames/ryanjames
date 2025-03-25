import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import styled from "styled-components";

export default function Header() {
  const location = useLocation();
  return (
    <SHeader>
      <Link to="/">Ryan James</Link>
      <SNavigation>
        <StyledNavLink to="/work" active={location.pathname === "/work"}>
          Work
        </StyledNavLink>
        <StyledNavLink to="/about" active={location.pathname === "/about"}>
          About
        </StyledNavLink>
      </SNavigation>
    </SHeader>
  );
}

const SNavigation = styled.nav`
  gap: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
`;
const SHeader = styled.nav`
  z-index: 10;
  position: absolute;
  display: flex;
`;

const StyledNavLink = styled(Link)<{ active: boolean }>`
  text-decoration: none;
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#0070f3" : "#555")};
  padding: 0.5rem;
  border-bottom: ${(props) => (props.active ? "2px solid #0070f3" : "none")};
  transition: color 0.2s ease-in-out, border-bottom 0.2s ease-in-out;

  &:hover {
    color: #0070f3;
  }
`;
