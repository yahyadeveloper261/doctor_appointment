import Hero from "../components/home/Hero";

import Specialties from "../components/home/Specialties";
import FeaturedDoctors from "../components/home/FeaturedDoctors";
import HowItWorks from "../components/home/HowItWorks";
import CTA from "../components/home/CTA";
export default function Home() {
  return (
    <>
      <Hero />

      <Specialties />
      <FeaturedDoctors />
      <HowItWorks />
      <CTA />
    </>
  );
}
