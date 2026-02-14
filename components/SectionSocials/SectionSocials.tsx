export default function SectionSocials() {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  return (
    <section className="bg-main">
      <div className="container lg:flex lg:justify-between lg:gap-4">
        <div className="py-8 sm:flex">
          <div className="flex gap-x-4 lg:px-0 lg:max-w-none">
            <svg className="ml-auto sm:ml-0 w-7 h-7 shrink-0 fill-background md:w-8 md:h-8">
              <use href={`${baseUrl}/icons.svg#icon-chat`}></use>
            </svg>
            <div className="max-w-4xl">
              <p className="mb-1.5 font-heading text-xl md:text-2xl lg:text-3xl text-background">
                <strong>Раді допомогти вам</strong>
              </p>
              <p className="font-text text-base md:text-lg lg:text-xl text-background">
                Переходьте в соціальні мережі щоб подивитися корисні поради або
                отримати індивідуальну консультацію
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-7xl mr-auto ml-auto pr-8 pl-8 lg:px-0 pb-8 lg:pb-0 lg:pr-0 lg:max-w-none self-center">
          <div className="flex justify-center gap-2 lg:gap-3 lg:justify-end">
            <a
              className="p-2 rounded-full transition-colors bg-background hover:bg-slate-300"
              href="https://www.tiktok.com/@flowergirl_irina?_r=1&_t=ZS-93WY1ZeQmiF"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              title="TikTok"
            >
              <svg className="w-7 h-7 fill-main md:w-8 md:h-8">
                <use href={`${baseUrl}/icons.svg#icon-tiktok`}></use>
              </svg>
            </a>
            <a
              className="p-2 rounded-full transition-colors bg-background hover:bg-slate-300"
              href="https://www.instagram.com/flowergirl_irina?utm_source=qr&igsh=MTN6aXlhcWljbmM5Yg=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg className="w-7 h-7 fill-main md:w-8 md:h-8">
                <use href={`${baseUrl}/icons.svg#icon-instagram`}></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
