import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import works from "../work";
import styled from "styled-components";

export default function Work() {
  const navigate = useNavigate();
  const location = useLocation();
  const { study } = useParams();
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Function to scroll to the section and update the URL
  const scrollToSection = (section: string) => {
    if (sectionsRef.current[section]) {
      sectionsRef.current[section]?.scrollIntoView({
        block: "start",
      });
      // Update the URL hash
      window.location.hash = `#${section}`;
    }
  };

  // Intersection observer logic to update active section and URL when it's at the top
  const handleScroll = () => {

    // const scrollPosition = window.scrollY;
    let currentSection = "";

    Object.entries(sectionsRef.current).forEach(([id, section]) => {
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        // Check if the section is at the top of the viewport
        if (sectionRect.top <= 0 && sectionRect.bottom > 0) {
          currentSection = id;
        }
      }
    });

    if (currentSection && currentSection !== activeSection) {
      setActiveSection(currentSection);
      // Update the URL to include the hash (so the browser address updates as we scroll)
      navigate(`/work#${currentSection}`, { replace: true });
    }
  };

  useEffect(() => {
    // If the URL is just /work (without any hash) and we're not already on the desired hash
    const firstCategory = Object.keys(works)[0] as keyof typeof works;
    const firstWorkSlug = works[firstCategory][0].slug;
    if (
      location.hash === "" &&
      window.location.hash !== firstWorkSlug
    ) {
      setActiveSection(firstWorkSlug);
      navigate(`/work#${firstWorkSlug}`, { replace: true });
    }
  }, []);

  useEffect(() => {
    // Initialize the scroll listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up scroll listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection, navigate]);

  // Smooth scroll to the section when the hash changes (e.g., from manual navigation)
  useEffect(() => {
    const workFromHash = window.location.hash.substring(1);
    if (workFromHash && sectionsRef.current[workFromHash]) {
      sectionsRef.current[workFromHash].scrollIntoView({
        block: "start",
      });
      setActiveSection(workFromHash);
    }
  }, []);

  return (
    <>
      {createPortal(
        <SWorkNav
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {Object.entries(works).map(([category, categoryWorks]) => (
            <div key={category}>
              <h2>{category}</h2>
              <ul>
                {categoryWorks.map((work) => (
                  <li key={work.slug}>
                    <StyledWorkNavLink
                      to={`/work#${work.slug}`} // Update to hash-based path
                      $active={location.hash === `#${work.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(work.slug); // Use smooth scroll
                      }}
                    >
                      {work.title}
                    </StyledWorkNavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </SWorkNav>,
        document.body
      )}

      <SWorks>
        {Object.values(works)
          .flat()
          .map((work) => (
            <SWork
              key={work.slug}
              ref={(el) => {
                if (el) sectionsRef.current[work.slug] = el;
              }}
            >
              <h2>
                {work.title}
              </h2>
              <p>
                {work.description}
              </p>
              {work.images.map((image) => (
                <img key={image.src} src={image.src} alt={`${image.alt}`} />
              ))}
            </SWork>
          ))}
      </SWorks>
    </>
  );
}

const SWork = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 0.2em;
  }
  p {
    font-size: 1.2rem;
  }
`;

const SWorkNav = styled(motion.div)`
  width: 220px;
  position: fixed;
  left: 0;
  top: 50px;
  padding: 1rem;
  z-index: 1000;
  background-color: orange;
`;

const StyledWorkNavLink = styled(Link)<{ $active: boolean }>`
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  color: ${(props) => (props.$active ? "#0070f3" : "#555")};
`;

const SWorks = styled.div`
  margin-left: 220px;
  padding-bottom: 40vh;
`;
