import { siteInfo } from "../data/siteInfo.js";
import profile from "../assets/images/pic.jpg";

export default function About() {
  const { about } = siteInfo;

  return (
    <>
      {/* ---------- PAGE HEADER ---------- */}
      <section className="page-header">
        <div className="container">
          <h1>About Me</h1>
          <p>The person and the purpose behind {siteInfo.name}.</p>
        </div>
      </section>

      {/* ---------- MY STORY ---------- */}
      <section className="section">
        <div className="container about__grid">
          <img className="about__photo" src={profile} alt={about.personName} />
          <div>
            <h2>{about.personName}</h2>
            <p className="about__role">{about.personRole}</p>
            {about.story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MISSION & VISION ---------- */}
      <section className="section section--alt">
        <div className="container about__mv">
          <div className="card card--simple">
            <h3>Our Mission</h3>
            <p>{siteInfo.mission}</p>
          </div>
          <div className="card card--simple">
            <h3>Our Vision</h3>
            <p>{about.vision}</p>
          </div>
        </div>
      </section>

      {/* ---------- VALUES ---------- */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">What I believe in</h2>
          <div className="cards cards--four">
            {about.values.map((v) => (
              <article key={v.title} className="card card--simple">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
