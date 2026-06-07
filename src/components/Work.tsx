import { useState, useRef, useEffect } from "react";
import "./styles/Work.css";

const projects = [
  {
    title: "Crawl Scope",
    category: "Lightweight website auditing tool",
    tools: [
      "Next.js",
      "Typescript",
      "Tailwind",
      "Puppeteer",
      "Lighthouse",
      "Cheerio",
    ],
    image: "/images/crawlscope.png",
    link: "https://crawlscope.vercel.app",
    year: "2026 (Latest)",
  },
  {
    title: "Endeavours App",
    category: "CMS-based application",
    tools: ["React.js", "NoSQL", "Firebase", "CMS"],
    image: "/images/aseapp.png",
    link: "https://ase-kashmir.web.app",
    year: "2026",
  },
  {
    title: "Assister",
    category: "Discord bot",
    tools: ["discord.py"],
    image: "/images/assisterbot.png",
    link: "https://assisterbot.xyz",
    year: "2025",
  },
  {
    title: "Atlas Coup",
    category: "Growth tracker platform",
    tools: ["React.js", "NoSQL", "Firebase"],
    image: "/images/atlcoupp.png",
    link: "https://atlcoup.web.app",
    year: "2025",
  },
  {
    title: "DcodeFuture",
    category: "Agency website",
    tools: ["React", "HTML5", "CSS3"],
    image: "/images/dcodie.png",
    link: "https://dcodefuture.com",
    year: "2023",
  },
];

const PREVIEW_W = 360;
const PREVIEW_H = 220;

const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [previewStyle, setPreviewStyle] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = e.clientX + 28;
    let y = e.clientY - PREVIEW_H / 2;

    if (x + PREVIEW_W > vw - 16) x = e.clientX - PREVIEW_W - 28;
    if (y < 16) y = 16;
    if (y + PREVIEW_H > vh - 16) y = vh - PREVIEW_H - 16;

    setPreviewStyle({ x, y });
  };

  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  return (
    <div
      className="work-section"
      id="work"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          <a
            href="/projects"
            className="work-all-projects"
            data-cursor="disable"
          >
            <span>View all projects</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="work-list">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`work-item${hoveredIndex === index ? " work-item--active" : ""}${hoveredIndex !== null && hoveredIndex !== index ? " work-item--dimmed" : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor="disable"
            >
              <span className="work-item-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="work-item-body">
                <div className="work-item-top">
                  <h3 className="work-item-title">{project.title}</h3>
                  <span className="work-item-year">{project.year}</span>
                </div>
                <p className="work-item-category">{project.category}</p>
                <div className="work-item-tags">
                  {project.tools.map((tool) => (
                    <span className="work-item-tag" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="work-item-image-mobile">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
              </div>

              <div className="work-item-arrow" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div
        className={`work-preview${hoveredIndex !== null ? " work-preview--visible" : ""}`}
        style={{
          left: previewStyle.x,
          top: previewStyle.y,
          width: PREVIEW_W,
          height: PREVIEW_H,
        }}
        aria-hidden="true"
      >
        {projects.map((project, index) => (
          <img
            key={index}
            src={project.image}
            alt=""
            className={`work-preview-img${hoveredIndex === index ? " work-preview-img--visible" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Work;
