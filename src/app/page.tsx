import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { TelegramBanner } from "@/components/TelegramBanner";
import { PackGrid } from "@/components/PackGrid";
import { BrowseByAnimal } from "@/components/BrowseByAnimal";
import { Reviews } from "@/components/Reviews";
import { HowItWorks } from "@/components/HowItWorks";
import { Compatibility } from "@/components/Compatibility";
import { CustomCommission } from "@/components/CustomCommission";
import { About } from "@/components/About";
import { Tutorials } from "@/components/Tutorials";
import { BlogTeaser } from "@/components/BlogTeaser";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <TelegramBanner />
        <PackGrid />
        <BrowseByAnimal />
        <Reviews />
        <HowItWorks />
        <Compatibility />
        <CustomCommission />
        <About />
        <Tutorials />
        <BlogTeaser />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
