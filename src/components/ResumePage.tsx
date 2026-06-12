import { useEffect } from "react";
import "./styles/ResumePage.css";

const ResumePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="resume-page">
      <a href="/" className="resume-back" data-cursor="disable">
        ← Back to site
      </a>

      <div className="resume-paper">
        <div className="resume-header">
          <h1>Ahm</h1>
          <p className="resume-tagline">
            Full Stack Developer (self-proclaimed)
          </p>
          <div className="resume-contact">
            <span>19 years old</span>
            <span className="resume-dot" />
            <span>Pampore, Kashmir</span>
            <span className="resume-dot" />
            <span>Available for hire (please)</span>
          </div>
        </div>

        <div className="resume-section">
          <h2>Education</h2>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3>YouTube University</h3>
              <span className="resume-date">2022 – Present</span>
            </div>
            <p className="resume-item-desc">
              Pursued a Bachelor's in Stack Overflow Copy-Pasting with a minor
              in "it works on my machine." Graduated top of my class (I was the
              only student).
            </p>
          </div>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3>Stack Overflow</h3>
              <span className="resume-date">2021 – Present</span>
            </div>
            <p className="resume-item-desc">
              Doctorate in Ctrl+C / Ctrl+V Engineering. Thesis: "Why Does This
              Work and How Do I Make It Stop Breaking."
            </p>
          </div>
        </div>

        <div className="resume-section">
          <h2>Experience</h2>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3>Professional Bug Creator</h3>
              <span className="resume-date">2022 – Present</span>
            </div>
            <p className="resume-item-desc">
              Created thousands of bugs across multiple projects. Most of them
              were unintentional. My record is fixing 3 bugs and creating 7 in
              the same commit.
            </p>
          </div>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3>CEO of Copy-Paste Inc.</h3>
              <span className="resume-date">2021 – 2022</span>
            </div>
            <p className="resume-item-desc">
              Successfully copied code from 47 different tutorials and pasted
              them into a single project. The project crashed. We pivoted.
            </p>
          </div>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3>Freelance "I Know Someone Who Codes"</h3>
              <span className="resume-date">2020 – Present</span>
            </div>
            <p className="resume-item-desc">
              Everyone's go-to tech support. Fixed their WiFi, installed their
              printers, and explained why their fridge is not "hacked." Somehow
              this led to building actual websites.
            </p>
          </div>
        </div>

        <div className="resume-section">
          <h2>Skills</h2>
          <div className="resume-skills">
            <span className="resume-skill">React</span>
            <span className="resume-skill">Next.js</span>
            <span className="resume-skill">Node.js</span>
            <span className="resume-skill">TypeScript</span>
            <span className="resume-skill">Firebase</span>
            <span className="resume-skill">Tailwind</span>
            <span className="resume-skill">Git</span>
            <span className="resume-skill">Git Push --Force</span>
            <span className="resume-skill">Stack Overflow</span>
            <span className="resume-skill">Googling Errors</span>
            <span className="resume-skill">Blaming CSS</span>
            <span className="resume-skill">Ignoring TypeScript Errors</span>
            <span className="resume-skill">console.log()</span>
            <span className="resume-skill">Procrastination</span>
          </div>
        </div>

        <div className="resume-section">
          <h2>Certifications</h2>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3>Certified Google Search User</h3>
              <span className="resume-date">2020</span>
            </div>
            <p className="resume-item-desc">
              Passed the rigorous exam of searching "how to center a div" for
              the 10,000th time.
            </p>
          </div>
          <div className="resume-item">
            <div className="resume-item-header">
              <h3>Stack Overflow Contributer (Question Asker)</h3>
              <span className="resume-date">2021</span>
            </div>
            <p className="resume-item-desc">
              Asked 200+ questions. Got 3 upvotes. Still counting.
            </p>
          </div>
        </div>

        <div className="resume-footer">
          <p>
            References available upon request (mostly my mom who says I'm very
            smart).
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
