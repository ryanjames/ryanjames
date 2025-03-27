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
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            navigate(`/work/${entry.target.id}`, { replace: true });
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.5 }
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navigate]);

  useEffect(() => {
    const studyFromHash = window.location.hash.substring(1);
    if (studyFromHash && sectionsRef.current[studyFromHash]) {
      sectionsRef.current[studyFromHash].scrollIntoView({ behavior: "smooth" });
      setActiveSection(studyFromHash);
    }
  }, [location.hash]);

  return (
    <>
      {createPortal(
        <SWorkNav
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {Object.entries(caseStudies).map(([category, studies]) => (
            <div key={category}>
              <h2>{category}</h2>
              <ul>
                {studies.map((study) => (
                  <li key={study}>
                    <StyledWorkNavLink
                      to={`/work/#${study}`} // Update to hash-based path
                      active={location.hash === `#${study}`}
                      onClick={(e) => {
                        e.preventDefault();
                        sectionsRef.current[study]?.scrollIntoView({
                          behavior: "smooth",
                        });
                        window.location.hash = `#${study}`; // Set URL hash manually
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

const SWorkNav = styled(motion.div)`
  width: 220px;
  position: fixed;
  left: 0;
  top: 50px;
  padding: 1rem;
  z-index: 1000;
  background-color: orange;
`;

const StyledWorkNavLink = styled(Link)<{ active: boolean }>`
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#0070f3" : "#555")};
`;

const SCaseStudies = styled.div`
  margin-left: 220px;
  padding: 2rem;

  & > * + * {
    margin-top: 0.5rem;
  }
`;
