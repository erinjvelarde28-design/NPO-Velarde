import { Link } from "react-router-dom";
import { siteInfo } from "../data/siteInfo.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <h3>{siteInfo.name}</h3>
          <p>{siteInfo.tagline}</p>
        </div>
        <div>
          <h4>Pages</h4>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/about">About</Link></p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>{siteInfo.email}</p>
          <p>{siteInfo.phone}</p>
          <p>{siteInfo.address}</p>
        </div>
      </div>
      <div className="footer__bottom">
        © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
