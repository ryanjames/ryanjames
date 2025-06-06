import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import { useState } from "react";
import WorkNav from "../components/WorkNav";
import worksDesktop from "../data/works-desktop";
import worksMobile from "../data/works-mobile";
import styled from "styled-components";
import { styles } from "../components/Styles";
import { useRef, useEffect, memo } from "react";
import { throttle } from "lodash"; // Throttling function
import type { TWork, TWorkImage } from "../types";
import Meta from "../components/Meta";
import WorkSelect from "../components/WorkSelect";

const Work = function Work() {
  const location = useLocation();
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const [works, setWorks] = useState(
    window.innerWidth < 800 ? worksMobile : worksDesktop
  );
  const activeSectionRef = useRef<string>("");
  const [isSelectNav, setIsSelectNav] = useState(
    window.innerWidth < styles.breakpoints.xLarge
  );

  // Function to scroll to a section manually when hash changes
  const scrollToSection = (section: string) => {
    if (sectionsRef.current[section]) {
      setTimeout(() => {
        sectionsRef.current[section]?.scrollIntoView({
          block: "start",
        });
      }, 300)
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWorks(window.innerWidth < 769 ? worksMobile : worksDesktop);
      setIsSelectNav(window.innerWidth < styles.breakpoints.xLarge);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Intersection observer to detect which section is currently in view
  const handleScroll = throttle(() => {
    let currentSection = "";
    const offset = window.innerWidth <= 1300 ? 140 : 120; // Adjust threshold dynamically
    Object.entries(sectionsRef.current).forEach(([id, section]) => {
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top <= offset && sectionRect.bottom > 0) {
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
  const Work = memo(({ item, category }: { item: TWork; category: string }) => {
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
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </SDescription>
          <SImage>
            {item.images.map((image: TWorkImage) => (
              <LazyImage className="work-image" key={image.src} src={image.src} alt={image.alt} width={image.width} height={image.height} />
            ))}
          </SImage>
        </SWorkInner>
      </SWork>
    );
  });

  return (
    <>
      <Meta
        title="Work - Ryan James"
        description="Ryan James is a multidisciplinary designer and developer from Seattle, Washington."
      />
      {createPortal(
        isSelectNav ? (
          <SWorkSelect>
            <WorkSelect works={works} scrollToSection={scrollToSection} />
          </SWorkSelect>
        ) : (
          <WorkNav works={works} scrollToSection={scrollToSection} />
        ),
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
  scroll-margin: 32px;
  @media (min-width: ${styles.breakpoints.small}px) {
    scroll-margin: 56px;
  }
  @media (min-width: ${styles.breakpoints.large}px) {
    scroll-margin: 68px;
  }
`;

const SWorkSelect = styled.div`
  display: block;
  position: fixed;
  top: ${styles.measurements.mobile.headerHeight + 12}px;
  width: 100%;
  z-index: 1000;
  @media (min-width: ${styles.breakpoints.small}px) {
    top: ${styles.measurements.desktop.headerHeight - 2}px;
  }
  @media (min-width: ${styles.breakpoints.large}px) {
    width: auto;
    left: 50%;
    margin-left: -250px;
    top: 28px;
  }
`;

const SWorkInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  border-top: 1px solid ${styles.colors.black};
  &:first-child {
    padding-top: 50px;
  }

  @media (min-width: ${styles.breakpoints.small}px) {
    margin-top: 69px;
  }

  @media (min-width: ${styles.breakpoints.large}px) {
    &:first-child {
      padding-top: 0;
    }
    flex-direction: row;
    align-items: flex-start; /* Ensures SDescription and SImage align properly */
  }
`;

const SImage = styled.div`
  flex: 1;
  padding-top: 38px;
  .work-image {
    width: 100%;
    height: auto;
    display: block;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    @media (min-width: ${styles.breakpoints.medium}px) {
      margin-bottom: 40px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const SCategory = styled.span`
  font-family: ${styles.type.mono};
  text-transform: uppercase;
  font-size: 0.8em;
  margin-bottom: 0.85em;
  display: block;
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    margin-bottom: 0.6em;
  }
`;

const SDescription = styled.div`
  padding-top: 24px;
  display: block;
  padding-left: 9px;
  padding-right: 9px;
  @media (min-width: ${styles.breakpoints.large}px) {
    position: sticky;
    align-self: flex-start;
    max-height: 80vh;
    overflow-y: auto;
    gap: 20px;
    width: 100%;
    background-color: ${styles.colors.white};
    z-index: 2;
    padding-top: 30px;
    display: block;
    top: 80px;
    width: 300px;
    padding-right: 40px;
    padding-bottom: 0;
  }
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    top: 84px;
  }
  a {
    color: ${styles.colors.active} !important;
  }

  h2 {
    font-size: 1.1em;
    font-weight: 700;
    line-height: 110%;
    margin-bottom: 0.4em;
    display: block;
    @media (min-width: ${styles.breakpoints.large}px) {
      font-size: 1.2em;
    }
    @media (min-width: ${styles.breakpoints.xLarge}px) {
      display: block;
    }
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
  padding-left: ${styles.measurements.mobile.margin}px;
  padding-right: ${styles.measurements.mobile.margin}px;
  @media (min-width: ${styles.breakpoints.small}px) {
    padding-left: ${styles.measurements.desktop.margin}px;
    padding-right: ${styles.measurements.desktop.margin}px;
  }
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    padding-left: 0;
    margin-left: ${styles.measurements.desktop.workNavWidth +
    styles.measurements.desktop.margin * 2}px;
  }
  padding-bottom: 40vh;
`;
