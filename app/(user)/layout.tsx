import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

import { getAllUserSubCats } from "@/lib/api";

type UserLayoutProps = {
  children: React.ReactNode;
};

export default async function UserLayout({ children }: UserLayoutProps) {
  const { plantsCatsSlugArr, protectionCatsArr, suppliesCatsArr } =
    await getAllUserSubCats();

  return (
    <>
      <Header
        plantsCatsSlugArr={plantsCatsSlugArr}
        protectionCatsArr={protectionCatsArr}
        suppliesCatsArr={suppliesCatsArr}
      />
      {children}
      <Footer />
    </>
  );
}
