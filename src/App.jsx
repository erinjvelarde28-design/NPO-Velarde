import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* To add a new page: create it in src/pages, then add a <Route> here
              and a link in src/components/Navbar.jsx */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}
