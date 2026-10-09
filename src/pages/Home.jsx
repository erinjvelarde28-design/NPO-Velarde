import { Link } from "react-router-dom";
import { siteInfo } from "../data/siteInfo.js";
import hero from "../assets/images/hero.svg";
import medical from "../assets/images/medical.svg";
import disaster from "../assets/images/disaster.svg";
import community from "../assets/images/community.svg";

// Maps the imageKey in siteInfo.js to the actual image file
const images = { medical, disaster, community };

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="badge">Non-profit organization</span>
            <h1>{siteInfo.tagline}</h1>
            <p>{siteInfo.mission}</p>
            <div className="hero__actions">
              <a href="#help" className="btn btn--primary">Get involved</a>
              <Link to="/about" className="btn btn--ghost">Learn about us</Link>
            </div>
          </div>
          <img className="hero__image" src={hero} alt="Volunteers delivering medical help" />
        </div>
      </section>

      {/* ---------- IMPACT NUMBERS ---------- */}
      <section className="stats">
        <div className="container stats__grid">
          {siteInfo.stats.map((s) => (
            <div key={s.label} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- WHAT WE DO ---------- */}
      <section className="section">
        <div className="container">
          <h2 className="section__title">What we do</h2>
          <p className="section__lead">
            Three programs, one goal: keeping people healthy and safe.
          </p>
          <div className="cards">
            {siteInfo.programs.map((p) => (
              <article key={p.title} className="card">
                <img src={images[p.imageKey]} alt="" />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WAYS TO HELP ---------- */}
      <section id="help" className="section section--alt">
        <div className="container">
          <h2 className="section__title">How you can help</h2>
          <div className="cards">
            {siteInfo.waysToHelp.map((w) => (
              <article key={w.title} className="card card--simple">
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CALL TO ACTION ---------- */}
      <section className="cta">
        <div className="container">
          <h2>Be there when someone needs help most.</h2>
          <p>Reach out to donate, volunteer, or request assistance.</p>
          <a className="btn btn--light" href={`mailto:${siteInfo.email}`}>
            {siteInfo.email}
          </a>
        </div>
      </section>
    </>
  );
}
