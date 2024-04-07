import Highlights from "@components/Highlights";
import NavBar from "@components/NavBar";
import Features from "@components/Features";
import HowItWorks from "@components/HowItWorks";
import Footer from "@components/Footer";

import dynamic from "next/dynamic";

const DynamicModel = dynamic(() => import("@components/Model"), {
  ssr: false,
  suspense: true,
  loading: () => <div className="h-screen">Loading...</div>,
});

const DynamicHero = dynamic(() => import("@components/Hero"), {
  ssr: false,
  suspense: true,
  loading: () => <div className="h-screen">Loading...</div>,
});

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
