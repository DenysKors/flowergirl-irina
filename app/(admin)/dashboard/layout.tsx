import Image from "next/image";

import Logo from "@/assets/images/Logo.png";

import NavDashboard from "@/components/NavDashboard/NavDashboard";
// import { signOut } from "@/auth";
type DashboardLayputProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayputProps) {
  return (
    <>
      <header className="w-full max-w-7xl py-2 px-1 md:py-3 flex items-center justify-between">
        <Image
          src={Logo}
          width={50}
          height={50}
          priority
          className="md:w-15 md:h-15 inline-block lg:w-18 lg:h-18"
          alt="Flowergirl Irina Logo"
        />
        <p className="ml-3 font-heading text-main uppercase text-sm md:text-xl">
          Панель адміністратора
        </p>
        <form
          action={async () => {
            "use server";
            // await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            aria-label="Выйти"
            title="Выйти"
            className="button cursor-pointer"
          >
            <svg className="w-6 h-6 fill-main">
              <use href="/icons.svg#icon-sign-out"></use>
            </svg>
          </button>
        </form>
      </header>
      <main className="w-full max-w-7xl py-2 px-1 md:py-3 flex flex-row bg-background">
        <aside className="pt-2 rounded-tl-xs bg-main lg:pt-5 lg:rounded-tl-xl">
          <NavDashboard />
        </aside>
        {children}
      </main>
    </>
  );
}
