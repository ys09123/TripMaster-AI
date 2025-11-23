import Hero from "./components/custom/Hero"
import AboutSection from "./components/custom/AboutSection";
import FeatureSection from "./components/custom/Features";
import { useEffect } from "react";
import Footer from "./components/custom/Footer";

function App() {
  useEffect(() => {
    const handleUnload = () => {
      // Clear only what you need
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('userData');
      // Or clear all
      // localStorage.clear();
    };

    // Use 'unload' instead of 'beforeunload' for better reliability
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero />
      <AboutSection />
      <FeatureSection/>
      <Footer />
    </>
  )
}

export default App
