import LinkBack from "@/components/LinkBack/LinkBack";
import SectionFilters from "@/components/SectionFilters/SectionFilters";

export const metadata = {
  title: "Каталог рослин. Квіткова крамниця Flowergirl-irina",
};

export default function PlantsPage() {
  return (
    <main className="container">
      <LinkBack />
      Plants page
      <SectionFilters />
    </main>
  );
}
