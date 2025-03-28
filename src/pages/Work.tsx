import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import WorkNav from "../components/WorkNav";
import works from "../data/works";
import styled from "styled-components";
import { styles } from "../components/Styles";
import { useRef, useEffect, memo } from "react";
import { throttle } from "lodash"; // Throttling function
import type { TWork } from "../types";

const Work = function Work() {
  const location = useLocation();
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const activeSectionRef = useRef<string>("");
  const navigate = useNavigate();

  // Function to scroll to a section manually when hash changes
  const scrollToSection = (section: string) => {
    if (sectionsRef.current[section]) {
      sectionsRef.current[section]?.scrollIntoView({
        block: "start",
      });
    }
  };

  // Only update when hash actually changes (avoid unnecessary state updates)
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && sectionsRef.current[hash]) {
      scrollToSection(hash);
      if (activeSectionRef.current !== hash) {
        activeSectionRef.current = hash; // Set the ref instead of state
      }
    }
  }, [location.hash]); // Effect runs only when location.hash changes

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if(!hash) {
      navigate(`/work#${works[0].items[0].slug}`, { replace: true });
    }
  }, [])

  // Intersection observer to detect which section is currently in view
  const handleScroll = throttle(() => {
    let currentSection = "";
    Object.entries(sectionsRef.current).forEach(([id, section]) => {
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top <= 0 && sectionRect.bottom > 0) {
          currentSection = id;
        }
      }
    });

    if (currentSection && currentSection !== activeSectionRef.current) {
      activeSectionRef.current = currentSection;
      // Manually update the URL hash to avoid causing a page reload
      window.history.replaceState(null, "", `#${currentSection}`);
    }
  }, 100); // Throttle to once every 100ms

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Memoized component for individual work items
  const Work = memo(({ item, category }: { item: TWork, category: string }) => {
    return (
      <SWork
        key={item.slug}
        id={item.slug}
        ref={(el) => {
          if (el) sectionsRef.current[item.slug] = el;
        }}
      >
        <SWorkInner>
          <SDescription>
            <h2>{item.title}</h2>
            {item.category ? (
              <SCategory>{item.category}</SCategory>
            ) : (
              <SCategory>{category}</SCategory>
            )}
            <p>{item.description}</p>
          </SDescription>
          <SImage>
            {item.images.map((image: any) => (
              <img key={image.src} src={image.src} alt={`${image.alt}`} />
            ))}
          </SImage>
        </SWorkInner>
      </SWork>
    );
  });

  return (
    <>
      {createPortal(
        <WorkNav works={works} scrollToSection={scrollToSection} />,
        document.body
      )}
      <SWorks
        key="works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {works.map((category) =>
          category.items.map((work) => (
            <Work item={work} category={category.category} key={work.slug} />
          ))
        )}
      </SWorks>
    </>
  );
};

export default Work;

const SWork = styled.div`
  &:first-child > div {
    border-top: 0;
  }
  padding-top: 40px;
  @media (min-width: ${styles.breakpoints.small}px) {
    padding-top: 79px;
  }
`;

const SWorkInner = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${styles.breakpoints.small}px) {
    border-top: 1px solid ${styles.colors.black};
  }
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    flex-direction: row;
  }
`;

const SImage = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 0;
    display: block;
  }
`;

const SCategory = styled.span`
  font-family: ${styles.type.mono};
  text-transform: uppercase;
  font-size: 0.8em;
  margin-bottom: 0.6em;
  display: block;
  @media (min-width: ${styles.breakpoints.large}px) {
    display: none;
  }
`;

const SDescription = styled.div`
  padding-top: 30px;
  padding-bottom: 24px;
  padding-left: ${styles.measurements.mobile.margin}px;
  padding-right: ${styles.measurements.mobile.margin}px;
  @media (min-width: ${styles.breakpoints.small}px) {
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    width: 300px;
    padding-right: 40px;
    padding-bottom: 0;
  }
  h2 {
    font-size: 1.2em;
    font-weight: 700;
    line-height: 110%;
    margin-bottom: 0.4em;
  }
  p {
    font-size: 0.9em;
  }
  @media (min-width: ${styles.breakpoints.medium}px) {
    h2 {
      font-size: 1.5em;
    }
    p {
      font-size: 1em;
    }
  }
`;

const SWorks = styled(motion.div)`
  @media (min-width: ${styles.breakpoints.small}px) {
    padding-left: ${styles.measurements.desktop.margin}px;
    padding-right: ${styles.measurements.desktop.margin}px;
  }
  @media (min-width: ${styles.breakpoints.large}px) {
    padding-left: 0;
    margin-left: ${styles.measurements.desktop.workNavWidth +
    styles.measurements.desktop.margin * 2}px;
  }
  padding-bottom: 40vh;
`;
