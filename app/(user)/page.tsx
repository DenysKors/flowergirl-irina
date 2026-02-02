import SectionHero from "@/components/SectionHero/SectionHero";
import SectionAbout from "@/components/SectionAbout/SectionAbout";
import SectionCatalog from "@/components/SectionCatalog/SectionCatalog";

export default function MainPage() {
  return (
    <main>
      <SectionHero />
      <SectionAbout />
      <SectionCatalog />
    </main>
  );
}
