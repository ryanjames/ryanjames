import styled from "styled-components";
import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styles } from "./Styles";
import type { TWorks } from "../types";
// import { styles } from "./Styles";

export default function WorkSelect({
  works,
  scrollToSection,
}: {
  works: TWorks;
  scrollToSection: any;
}) {
  const location = useLocation(); // Using React Router's location
  const [activeHash, setActiveHash] = useState(location.hash); // Track hash state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDListElement>(null);
  const flatItems = works.flatMap((category) =>
    category.items.map((item) => ({ ...item, category: item.category || category.category }))
  );

  // Find the initially selected item
  const [selectedItem, setSelectedItem] = useState(
    flatItems.find((item) => `#${item.slug}` === activeHash) || null
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Track hash change in URL manually using useEffect
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash); // Update active hash when hash changes
      setSelectedItem(
        flatItems.find((item) => `#${item.slug}` === window.location.hash) || null
      );
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
    <SWorkSelect>
      {selectedItem && (
        <>
          <SSelectedWork className={isOpen ? "open" : "closed"}>
            <SSelectedWorkText onClick={() => setIsOpen(!isOpen)}>
              <strong>{selectedItem.title}</strong>
              <span>{selectedItem.category}</span>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.947923 0L5.99368 5.00612L11.0394 0L12 0.99238L5.99368 7L0 1.01414L0.0175541 0.925707L0.947923 0Z"
                  fill={`${styles.colors.black}`}
                />
              </svg>
            </SSelectedWorkText>
          </SSelectedWork>
        </>
      )}
      {isOpen && (
        <SWorkSelectOptions ref={dropdownRef}>
          {works.map((category) => (
            <React.Fragment key={category.category}>
              <SWorkSelectCategory>{category.category}</SWorkSelectCategory>
              {category.items.map((item) => (
                <dd key={item.slug}>
                  <SWorkLink
                    to={`/work#${item.slug}`}
                    $active={activeHash === `#${item.slug}`} // Compare with activeHash
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      scrollToSection(item.slug); // Scroll to the relevant section
                    }}
                  >
                    {item.title}
                  </SWorkLink>
                </dd>
              ))}
            </React.Fragment>
          ))}
        </SWorkSelectOptions>
      )}
    </SWorkSelect>
  );
}

const SWorkSelect = styled.div`
  margin-top: -16px;
  background-color: ${styles.colors.white};
  padding: 8px ${styles.measurements.mobile.margin}px;
  @media (min-width: ${styles.breakpoints.small}px) {
    padding: 8px ${styles.measurements.desktop.margin}px;
  }
  @media (min-width: ${styles.breakpoints.large}px) {
    background-color: transparent;
  }
`;

const SWorkLink = styled(Link)<{ $active: boolean }>`
  line-height: 160%;
  font-weight: 300;
  color: ${(props) =>
    props.$active ? styles.colors.active : styles.colors.black} !important;
  .about & {
    color: ${(props) =>
      props.$active ? styles.colors.active : styles.colors.white} !important;
  }
`;

const SSelectedWork = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
  &.open {
    svg {
      transform: rotate(180deg);
    }
  }
`

const SSelectedWorkText = styled.div`
  display: flex;
  align-items: center;
  font-size: 1em;
  font-weight: 700;
  line-height: 160%;
  margin-bottom: 0.4em;
  padding: 4px 8px;
  border-radius: 4px;
  gap: 16px;
  width: 100%;
  border: 1px solid ${styles.colors.offBlack};
  @media (min-width: ${styles.breakpoints.large}px) {
    width: 440px;
  }
  min-width: 0;

  strong {
    display: block;
    min-width: 0;
    font-size: 1em;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 300;
  }

  span {
    font-family: ${styles.type.mono};
    text-transform: uppercase;
    font-size: 0.8em;
    display: block;
  }
`;

const SWorkSelectOptions = styled.dl`
  border-radius: 4px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.38);
  padding-top: 8px;
  background-color: ${styles.colors.white};
  font-size: 0.8em;
  height: 400px;
  max-height: 80vh;
  overflow-y: scroll;
  dd {
    margin: 0;
    padding: 0;
    a {
      display: block;
      padding: 4px 16px;
      &:hover {
        cursor: pointer;
        background-color: ${styles.colors.offBlack};
      }
    }
    &:last-child {
      margin-bottom: 8px;
    }
  }
`;

const SWorkSelectCategory = styled.dt`
  font-weight: 700;
  padding: 24px 16px 4px;
  display: block;
  line-height: 160%;
  &:first-child {
    padding-top: 0;
  }
`
