import { About } from "@/app/homesections/About/About";
import { Destinations } from "@/app/homesections/Destinations/Destinations";
import { Events } from "@/app/homesections/Events/Events";
import { Experiences } from "@/app/homesections/Experiences/Experiences";
import { Faq } from "@/app/homesections/Faq/Faq";
import { Footer } from "@/app/homesections/Footer/Footer";
import { Hero } from "@/app/homesections/Hero/Hero";
import { HiddenPlaces } from "@/app/homesections/HiddenPlaces/HiddenPlaces";
import { HowItWorks } from "@/app/homesections/HowItWorks/HowItWorks";
import { Journal } from "@/app/homesections/Journal/Journal";
import { LocalGuides } from "@/app/homesections/LocalGuides/LocalGuides";
import { Rentals } from "@/app/homesections/Rentals/Rentals";
import { Stays } from "@/app/homesections/Stays/Stays";
import { Testimonials } from "@/app/homesections/Testimonials/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Destinations />
      <About />
      <HiddenPlaces />
      <Experiences />
      <Stays />
      <Rentals />
      <HowItWorks />
      <LocalGuides />
      <Testimonials />
      <Journal />
      <Events />
      <Faq />
      <Footer />
    </main>
  );
}
