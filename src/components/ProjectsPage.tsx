import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdClose, MdOpenInNew, MdReadMore } from "react-icons/md";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import "./styles/ProjectsPage.css";

const projects = [
  {
    name: "My Portfolio",
    image: "/images/foliopre.gif",
    live: "https://devahm.xyz",
    source: "https://github.com/code2ahm/myfolio",
    description:
      "Personal developer portfolio with GSAP scroll choreography, TypeScript, and hand-crafted CSS.",
    points: [
      "GSAP ScrollTrigger animations throughout",
      "Full TypeScript with Vite",
      "Custom visual system built from scratch",
    ],
    tags: ["TypeScript", "Vite", "GSAP", "CSS3", "React"],
    role: "Design, frontend engineering, animation, deployment",
    stack: ["React", "TypeScript", "Vite", "GSAP", "Three.js", "CSS"],
    details:
      "A personal portfolio built as a motion-heavy identity system rather than a static resume. The site combines a 3D character, scroll choreography, custom loading states, responsive project showcases, and a lightweight archive page.",
    highlights: [
      "Custom 3D character integration with mobile fallbacks",
      "GSAP-driven page transitions and section reveals",
      "Responsive carousel and project archive",
      "Performance tuning around heavy WebGL assets",
    ],
    architecture: [
      "Vite/React app split into focused visual sections",
      "Three.js character layer mounted separately from content",
      "CSS-led component styling with shared accent tokens",
    ],
  },
  {
    name: "Atlas Coup",
    image: "/images/atlcoup.png",
    live: "https://atlcoup.web.app",
    source: "https://github.com/code2ahm/atlcoup",
    description:
      "Real-time web platform for tracking daily habits and long-term goals with clean UX and reliable infra.",
    points: [
      "Real-time analytics and data sync",
      "Clean, minimal frontend interface",
      "Low-latency backend responses",
    ],
    tags: ["Firebase", "React", "JavaScript"],
    role: "Frontend, Firebase integration, product flow",
    stack: ["React", "Firebase", "JavaScript", "Firestore", "CSS"],
    details:
      "A goal and habit-tracking platform focused on quick daily input and readable progress. The project prioritizes real-time state, clean dashboards, and a lightweight interface that keeps users close to the data.",
    highlights: [
      "Realtime data syncing for user progress",
      "Simple dashboard patterns for habit visibility",
      "Firebase-backed deployment and data persistence",
    ],
    architecture: [
      "React frontend with Firebase services",
      "Firestore-style document data model",
      "Hosted as a fast static web app",
    ],
  },
  {
    name: "ASE - Kashmir",
    image: "/images/aseapp.png",
    live: "https://ase-kashmir.web.app",
    source: "https://github.com/code2ahm/aseapp",
    description:
      "Digital platform for an educational initiative based in Kashmir, built for reach and low-bandwidth access.",
    points: [
      "Info hub for students and educators",
      "Accessible design for local reach",
      "Lightweight and fast on slow networks",
    ],
    tags: ["Firebase", "React", "HTML5", "JavaScript"],
    role: "Frontend, content structure, deployment",
    stack: ["React", "Firebase", "JavaScript", "HTML5", "CSS3"],
    details:
      "A web platform for an education initiative in Kashmir. It is structured as a practical information hub, built to load quickly and remain usable for students and educators on inconsistent connections.",
    highlights: [
      "Accessible education-focused content layout",
      "Low-bandwidth conscious page structure",
      "Firebase hosting for simple deployment",
    ],
    architecture: [
      "React single-page frontend",
      "Static content and hosted assets",
      "Firebase-hosted production build",
    ],
  },
  {
    name: "Assister Bot",
    image: "/images/assisterbot.png",
    live: "https://assisterbot.xyz",
    source: "https://github.com/code2ahm/assister",
    description:
      "Discord bot built for automation, moderation, and server assistance without unnecessary bloat.",
    points: [
      "Server automation and moderation",
      "200+ commands and anti-nuke protection",
      "Fast responses with minimal resource usage",
    ],
    tags: ["Python", "Discord.py"],
    role: "Bot development, automation logic, command design",
    stack: ["Python", "Discord.py", "Discord API", "Automation"],
    details:
      "A Discord automation bot built for server assistance, moderation, and utility commands. The system is designed to stay modular so commands and protection features can grow without becoming hard to maintain.",
    highlights: [
      "200+ command surface for server management",
      "Moderation and anti-nuke workflows",
      "Fast command handling with practical resource usage",
    ],
    architecture: [
      "Python bot runtime using Discord.py",
      "Command-oriented module structure",
      "Event listeners for moderation and protection",
    ],
  },
  {
    name: "DcodeFuture",
    image: "/images/dcodie.png",
    live: "https://dcodefuture.com",
    source: "https://github.com/code2ahm/dcodeweb",
    description:
      "Web platform for a local coding education initiative in Kashmir, built to be clean and beginner-friendly.",
    points: [
      "Platform for a local Kashmir coding school",
      "Works well on slow or limited connections",
      "Clean beginner-friendly UI",
    ],
    tags: ["React", "Vite", "HTML5", "CSS3"],
    role: "Frontend, visual system, responsive implementation",
    stack: ["React", "Vite", "HTML5", "CSS3", "JavaScript"],
    details:
      "A public-facing website for a local coding education initiative. It presents courses and learning intent in a simple interface, with a focus on beginner clarity and fast loading.",
    highlights: [
      "Beginner-friendly page hierarchy",
      "Responsive layout for mobile-first access",
      "Clean marketing-style sections without excess weight",
    ],
    architecture: [
      "Vite-powered React frontend",
      "Static page sections and optimized assets",
      "CSS-driven responsive layout",
    ],
  },
];

const ProjectsPage = () => {
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(
    null,
  );

  useEffect(() => {
    const revealItems = document.querySelectorAll(".projects-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item, index) => {
      (item as HTMLElement).style.setProperty("--reveal-index", `${index}`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("projects-modal-open", Boolean(activeProject));

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("projects-modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeProject]);

  const closeDetails = () => {
    setActiveProject(null);
  };

  return (
    <div className="projects-page">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="projects-main">
            <section className="projects-hero">
              <a
                href="/#work"
                className="projects-back projects-reveal"
                data-cursor="disable"
              >
                Back to work
              </a>
              <p className="projects-hero-kicker projects-reveal">
                Source-ready builds
              </p>
              <h1 className="projects-reveal">
                Projects<span>Archive</span>
              </h1>
              <p className="projects-hero-copy projects-reveal">
                A fuller pass through the things I have built, with live links,
                repositories, implementation notes, and the tools behind each
                project.
              </p>
              <div className="projects-hero-metrics projects-reveal">
                <span>{projects.length} builds</span>
                <span>Live links</span>
                <span>Source code</span>
              </div>
            </section>

            <section className="projects-grid" aria-label="Project archive">
              {projects.map((project, index) => (
                <article
                  className="projects-card projects-reveal"
                  key={project.name}
                >
                  <div className="projects-card-media">
                    <img src={project.image} alt={`${project.name} preview`} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="projects-card-body">
                    <div className="projects-card-header">
                      <h2>{project.name}</h2>
                      <div className="projects-card-actions">
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.name}`}
                          data-cursor="disable"
                        >
                          <MdOpenInNew />
                        </a>
                        <a
                          href={project.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.name} source`}
                          data-cursor="disable"
                        >
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                    <p className="projects-card-desc">{project.description}</p>
                    <ul>
                      {project.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="projects-card-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button
                      className="projects-details-button"
                      type="button"
                      onClick={() => setActiveProject(project)}
                      data-cursor="disable"
                    >
                      <span>Project details</span>
                      <MdReadMore />
                    </button>
                  </div>
                </article>
              ))}
            </section>
          </main>
        </div>
      </div>
      {activeProject && (
        <div
          className="projects-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="projects-modal-title"
        >
          <button
            className="projects-modal-backdrop"
            type="button"
            aria-label="Close project details"
            onClick={closeDetails}
          />
          <article className="projects-modal-panel">
            <button
              className="projects-modal-close"
              type="button"
              onClick={closeDetails}
              aria-label="Close project details"
              data-cursor="disable"
            >
              <MdClose />
            </button>
            <div className="projects-modal-media">
              <img
                src={activeProject.image}
                alt={`${activeProject.name} expanded preview`}
              />
            </div>
            <div className="projects-modal-content">
              <p className="projects-modal-kicker">{activeProject.role}</p>
              <h2 id="projects-modal-title">{activeProject.name}</h2>
              <p className="projects-modal-desc">{activeProject.details}</p>

              <div className="projects-modal-section">
                <h3>Tech stack used</h3>
                <div className="projects-modal-stack">
                  {activeProject.stack.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>

              <div className="projects-modal-columns">
                <div className="projects-modal-section">
                  <h3>Highlights</h3>
                  <ul>
                    {activeProject.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="projects-modal-section">
                  <h3>Build details</h3>
                  <ul>
                    {activeProject.architecture.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="projects-modal-actions">
                <a
                  href={activeProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                >
                  <MdOpenInNew />
                  Visit live
                </a>
                <a
                  href={activeProject.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                >
                  <FaGithub />
                  View source
                </a>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
