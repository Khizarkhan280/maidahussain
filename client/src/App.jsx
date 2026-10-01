import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Contact from "./components/Contact.jsx";
import Discover from "./components/Discover.jsx";
import Footer from "./components/Footer.jsx";
import Policies from "./components/Policies.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Contact />
      {/* <Discover /> */}
      <Policies />
      <Footer />
    </>
  );
}
