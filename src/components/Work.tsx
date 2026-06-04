import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "ASE - Aadil Sir's Endeavours",
    category: "CMS-based App",
    tools: ["React.js", "NoSQL", "Firebase", "CMS"],
    image: "/images/aseapp.png",
    link: "https://ase-kashmir.web.app",
  },
  {
    title: "Assister",
    category: "Discord bot",
    tools: ["discord.py"],
    image: "/images/assisterbot.png",
    link: "https://assisterbot.xyz",
  },
  {
    title: "Atlas Coup",
    category: "Growth Tracker Platform",
    tools: ["React.js", "NoSQL", "Firebase"],
    image: "/images/atlcoupp.png",
    link: "https://atlcoup.web.app",
  },
  {
    title: "DcodeFuture",
    category: "Website",
    tools: ["React", "HTML5", "CSS3"],
    image: "/images/dcodie.png",
    link: "https://dcodefuture.com",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating],
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const arrowButtons = (
    <>
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={goToPrev}
        aria-label="Previous project"
        data-cursor="disable"
      >
        <MdArrowBack />
      </button>
      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={goToNext}
        aria-label="Next project"
        data-cursor="disable"
      >
        <MdArrowForward />
      </button>
    </>
  );

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          <div className="carousel-arrows-desktop">{arrowButtons}</div>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <div className="carousel-tags">
                            {project.tools.map((tool) => (
                              <span className="carousel-tag" key={tool}>
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="carousel-visit"
                          data-cursor="disable"
                        >
                          <span>Visit</span>
                          <svg
                            className="carousel-visit-arrow"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 17L17 7M17 7H7M17 7V17"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-bottom">
            <div className="carousel-arrows-mobile">{arrowButtons}</div>
            <div className="carousel-dots">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${
                    index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to project ${index + 1}`}
                  data-cursor="disable"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
