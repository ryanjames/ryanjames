import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import WorkNav from "../components/WorkNav";
import works from "../data/works";
import styled from "styled-components";
import { styles } from "../components/Styles";
import { useRef, useEffect, memo } from "react";
import { throttle } from "lodash"; // Throttling function

const Work = function Work() {
  console.log("Rendering Work Component");

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
        if (sectionRect.top <= 200 && sectionRect.bottom > 0) {
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
  const Item = memo(({ item }: { item: any }) => {
    return (
      <SWork
        key={item.slug}
        id={item.slug}
        ref={(el) => {
          if (el) sectionsRef.current[item.slug] = el;
        }}
      >
        <SDescription>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </SDescription>
        <SImage>
          {item.images.map((image: any) => (
            <img key={image.src} src={image.src} alt={`${image.alt}`} />
          ))}
        </SImage>
      </SWork>
    );
  });

  return (
    <>
      {createPortal(
        <WorkNav works={works} scrollToSection={scrollToSection} />,
        document.body
      )}
      <SWorks>
        {works
          .flatMap((category) => category.items)
          .map((work) => (
            <Item item={work} key={work.slug} />
          ))}
      </SWorks>
    </>
  );
};

export default Work;

const SWork = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 120px;
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

const SDescription = styled.div`
  width: 300px;
  padding-right: 40px;
  h2 {
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 0.1em;
  }
  p {
    font-size: 1rem;
  }
`;

const SWorks = styled.div`
  margin-left: ${styles.measurements.workNavWidth +
  styles.measurements.desktopMargin * 2}px;
  padding-right: ${styles.measurements.desktopMargin}px;
  padding-bottom: 40vh;
`;
