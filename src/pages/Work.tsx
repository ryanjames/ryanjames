import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const caseStudies = {
  Branding: ["case-study-1", "case-study-2"],
  "Product Design": ["case-study-3", "case-study-4"],
};

export default function Work() {
  const navigate = useNavigate();
  const location = useLocation();
  const { study } = useParams();
  const [activeSection, setActiveSection] = useState("");
  const [isScrollingManually, setIsScrollingManually] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Function to scroll to the section and update the URL
  const scrollToSection = (section: string) => {
    setIsScrollingManually(true); // Set manual scroll flag
    if (sectionsRef.current[section]) {
      sectionsRef.current[section]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Update the URL hash
      window.location.hash = `#${section}`;
    }
  };

  // Intersection observer logic to update active section and URL when it's at the top
  const handleScroll = () => {
    if (isScrollingManually) return; // Ignore scroll events while scrolling manually

    const scrollPosition = window.scrollY;
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
    if (location.hash === "" && window.location.hash !== "#case-study-1") {
      navigate("/work#case-study-1", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    // Initialize the scroll listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up scroll listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection, navigate, isScrollingManually]);

  // Reset the flag after the scroll animation is done
  useEffect(() => {
    if (isScrollingManually) {
      setTimeout(() => {
        setIsScrollingManually(false); // Reset manual scroll flag after 1000ms (time for scroll)
      }, 1000); // 1 second delay to give time for scroll animation to finish
    }
  }, [isScrollingManually]);

  // Smooth scroll to the section when the hash changes (e.g., from manual navigation)
  useEffect(() => {
    const studyFromHash = window.location.hash.substring(1);
    if (studyFromHash && sectionsRef.current[studyFromHash]) {
      sectionsRef.current[studyFromHash].scrollIntoView({ behavior: "smooth" });
      setActiveSection(studyFromHash);
    }
  }, []);

  return (
    <>
      {createPortal(
        <SWorkNav>
          {Object.entries(caseStudies).map(([category, studies]) => (
            <div key={category}>
              <h2>{category}</h2>
              <ul>
                {studies.map((study) => (
                  <li key={study}>
                    <StyledWorkNavLink
                      to={`/work#${study}`} // Update to hash-based path
                      $active={location.hash === `#${study}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(study); // Use smooth scroll
                      }}
                    >
                      {study.replace(/-/g, " ")}
                    </StyledWorkNavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </SWorkNav>,
        document.body
      )}

      {/* Case Study Content */}
      <SCaseStudies>
        {Object.values(caseStudies)
          .flat()
          .map((study) => (
            <SCaseStudy
              key={study}
              ref={(el) => {
                if (el) sectionsRef.current[study] = el;
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                {study.replace(/-/g, " ")}
              </h2>
              <p className="text-lg text-gray-600">
                Description of {study.replace(/-/g, " ")} with details.
              </p>
              <img src={`/images/${study}-1.jpg`} alt={`${study}`} />
              <img src={`/images/${study}-2.jpg`} alt={`${study}`} />
            </SCaseStudy>
          ))}
      </SCaseStudies>
    </>
  );
}

const SCaseStudy = styled(motion.section)`
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

const SWorkNav = styled.div`
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

const SCaseStudies = styled.div`
  margin-left: 220px;
  padding: 2rem;

  & > * + * {
    margin-top: 0.5rem;
  }
`;
