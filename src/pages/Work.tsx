import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
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
        if (sectionRect.top <= 120 && sectionRect.bottom > 0) {
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
            <div className="description" dangerouslySetInnerHTML={{ __html: item.description }} />
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
      <Helmet>
        <title>Ryan James - Work</title>
        <meta name="description" content="Ryan James - Work" />
      </Helmet>
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
  scroll-margin: 78px;
`;

const SWorkInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  @media (min-width: ${styles.breakpoints.small}px) {
    margin-top: 79px;
  }

  @media (min-width: ${styles.breakpoints.small}px) {
    border-top: 1px solid ${styles.colors.black};
  }

  @media (min-width: ${styles.breakpoints.xLarge}px) {
    flex-direction: row;
    align-items: flex-start; /* Ensures SDescription and SImage align properly */
  }
`;

const SImage = styled.div`
  flex: 1;
  padding-top: 40px;
  img {
    width: 100%;
    height: auto;
    margin-bottom: 40px;
    display: block;
    border: 1px solid #ddd;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const SCategory = styled.span`
  font-family: ${styles.type.mono};
  text-transform: uppercase;
  font-size: 0.8em;
  display: block;
  margin-bottom: 0.85em;
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    margin-bottom: 0.6em;
  }
`;

const SDescription = styled.div`
  position: sticky;
  align-self: flex-start;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  width: 100%;
  background-color: ${styles.colors.white};
  z-index: 2;
  top: 40px;
  padding-top: 30px;
  padding-left: ${styles.measurements.mobile.margin}px;
  padding-right: ${styles.measurements.mobile.margin}px;
  .description {
    display: none;
    @media (min-width: ${styles.breakpoints.xLarge}px) {
      display: block;
    }
  }
  a {
    color: ${styles.colors.active} !important;
  }
  @media (min-width: ${styles.breakpoints.small}px) {
    top: 60px;
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    display: block;
    padding-bottom: 24px;
    top: 100px;
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
