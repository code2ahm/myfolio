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
                <h4>Full Stack Developer</h4>
                <h5>Atlas Coup</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built a full-stack productivity and habit-tracking application
              using React, Vite, and Firebase. Features include user
              authentication, real-time data synchronization, goal management,
              habit tracking, and responsive UI.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Developer</h4>
                <h5>Assister (Discord Bot)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built a robust all-in-one Discord bot built with Discord.py.
              Feature include advanced anti-nuke protection, automoderation,
              moderation tools, logging, autoroles, and engaging fun features.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Developer</h4>
                <h5>ASE (Aadil Sir's Endeavours)</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Built a CMS-based app, ASE — Aadil Sir’s Endeavours, a role-based
              management system built with React and Firebase, featuring Admin
              and Student dashboards for managing users, marks, fees, and study
              materials with secure authentication and real-time data handling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
