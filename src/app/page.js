import HeroSection from "@/components/hero-section";
import TopBanner from "@/components/top-side-banner";

export default function Home() {
  return (
    <>
      <div className="container mx-auto h-auto w-screen flex flex-col  ">
        {/* top side banner section */}
        <TopBanner />
        {/* Hero Section */}
        <HeroSection />
      </div>
    </>
  );
}
