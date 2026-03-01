import Image from "next/image";

import Logo from "@/assets/images/Logo.png";

type LoginLayputProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayputProps) {
  return (
    <>
      <header className="mx-auto w-full max-w-7xl py-2 px-1 md:py-3 flex items-center justify-center border-b border-b-border-gray">
        <Image
          src={Logo}
          width={80}
          height={80}
          priority
          className="md:w-40 md:h-40 inline-block lg:w-50 lg:h-50"
          alt="Flowergirl Irina Logo"
        />
      </header>
      {children}
    </>
  );
}
