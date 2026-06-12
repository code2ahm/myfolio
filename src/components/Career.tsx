import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bot Developer</h4>
                <h5>Assister (Discord Bot)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built a robust all-in-one Discord bot with Discord.py. Features
              include advanced anti-nuke protection, automoderation, moderation
              tools, logging, autoroles, and 200+ utility commands serving
              active communities.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Backend Developer</h4>
                <h5>ASE — Aadil Sir's Endeavours</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Built a CMS-based role management system with React and Firebase,
              featuring Admin and Student dashboards for managing users, marks,
              fees, and study materials with secure authentication and real-time
              data handling.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Developer</h4>
                <h5>Atlas Coup</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Built a full-stack productivity and habit-tracking application
              using React, Vite, and Firebase. Features include five integrated
              tools, a custom Health Score algorithm, real-time sync, PWA
              support, and a dark-first UI with Framer Motion transitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
