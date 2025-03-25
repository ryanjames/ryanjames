import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/*
import { Link } from "react-router-dom";

import {
  titleVariants,
  paragraphVariants,
  buttonVariants,
} from "../animations";
*/

const caseStudies = {
  Branding: ["case-study-1", "case-study-2"],
  "Product Design": ["case-study-3", "case-study-4"],
};


export default function Work() {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-1/4 fixed left-0 top-0 h-full p-4 bg-gray-100">
        {Object.entries(caseStudies).map(([category, studies]) => (
          <div key={category} className="mb-4">
            <h2 className="text-lg font-bold">{category}</h2>
            <ul>
              {studies.map((study) => (
                <li key={study}>
                  <a
                    href={`/work/${study}`}
                    className={`block p-2 ${
                      activeSection === study
                        ? "text-blue-500 font-bold"
                        : "text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      sectionsRef.current[study]?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    {study.replace(/-/g, " ")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Case Study Content */}
      <main className="ml-1/4 w-3/4 p-8 space-y-20">
        {Object.values(caseStudies)
          .flat()
          .map((study) => (
            <motion.section
              key={study}
              id={study}
              ref={(el) => {
                if (el) sectionsRef.current[study] = el;
              }}
              className="h-screen flex flex-col justify-center"
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
              <div className="mt-4 flex space-x-4">
                <img
                  src={`/images/${study}-1.jpg`}
                  alt={`${study}`}
                  className="w-1/3 rounded-lg"
                />
                <img
                  src={`/images/${study}-2.jpg`}
                  alt={`${study}`}
                  className="w-1/3 rounded-lg"
                />
              </div>
            </motion.section>
          ))}
      </main>
    </div>
  );
}