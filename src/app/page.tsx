import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FeaturedShop } from "@/components/commerce/FeaturedShop";
import { BrowseByAnimal } from "@/components/BrowseByAnimal";
import { Reviews } from "@/components/Reviews";
import { HowItWorks } from "@/components/HowItWorks";
import { Compatibility } from "@/components/Compatibility";
import { CustomCommission } from "@/components/CustomCommission";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <FeaturedShop />
        <BrowseByAnimal />
        <Reviews />
        <HowItWorks />
        <Compatibility />
        <CustomCommission />
        <About />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
