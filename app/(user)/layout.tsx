import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

type UserLayoutProps = {
  children: React.ReactNode;
};

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
