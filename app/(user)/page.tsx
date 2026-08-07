import SectionHero from "@/components/SectionHero/SectionHero";
import SectionAbout from "@/components/SectionAbout/SectionAbout";
import SectionCatalog from "@/components/SectionCatalog/SectionCatalog";
import SectionSocials from "@/components/SectionSocials/SectionSocials";

export const metadata = {
  icons: {
    other: [
      {
        rel: "preload",
        as: "image",
        url: "/images/bg-hero.jpg",
        fetchPriority: "high",
      },
    ],
  },
};

export default function MainPage() {
  return (
    <main>
      <SectionHero />
      <SectionAbout />
      <SectionCatalog />
      <SectionSocials />
    </main>
  );
}
