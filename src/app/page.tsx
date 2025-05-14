// src/app/page.tsx
import HeroSection from "../../components/HeroSection";
import FeaturesSection from "../../components/FeatureSection";
import TestimonialSlider from "../../components/TestimonialSlider";
import HeroSec2 from "../../components/HeroSec2";
import ConnectCTA from "../../components/connectCTA";
import AutoScrollGallery from "../../components/PhotoGallery";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroSec2 />
      <FeaturesSection />
      <ConnectCTA />
      {/* Auto Scrolling Image Gallery */}
      <AutoScrollGallery />

      {/* Testimonial Slider */}
      <TestimonialSlider />
    </>
  );
}
