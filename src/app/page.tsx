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
import { Tutorials } from "@/components/Tutorials";
import { BlogTeaser } from "@/components/BlogTeaser";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ as FAQ_DATA } from "@/data/site";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd} />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <FeaturedShop />
        <BrowseByAnimal />
        <Reviews />
        <HowItWorks />
        <Compatibility />
        <Tutorials />
        <CustomCommission />
        <About />
        <BlogTeaser />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
