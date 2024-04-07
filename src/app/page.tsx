import dynamic from "next/dynamic";

const DynamicHero = dynamic(() => import("@components/Hero"), {
  ssr: false,
});

const DynamicModel = dynamic(() => import("@components/Model"), {
  ssr: false,
});

import Highlights from "@components/Highlights";
import NavBar from "@components/NavBar";
import Features from "@components/Features";
import HowItWorks from "@components/HowItWorks";
import Footer from "@components/Footer";

function App() {
  return (
    <main className="bg-black">
      <NavBar />
      <DynamicHero />
      <Highlights />
      <DynamicModel />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}

export default App;
