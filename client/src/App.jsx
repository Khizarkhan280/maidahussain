import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Contact from "./components/Contact.jsx";
// import Discover from "./components/Discover.jsx";
import Footer from "./components/Footer.jsx";
import Policies from "./components/Policies.jsx";
import { useLayoutEffect } from "react";

// Jump back to the top whenever the page (route) changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Home: everything */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Contact />
              {/* <Discover /> */}
              <Policies />
            </>
          }
        />

        {/* Contact Us page: only Contact + Policies (Navbar and Footer are shared above/below) */}
        <Route
          path="/contact"
          element={
            <>
              <Contact />
              <Policies />
            </>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}