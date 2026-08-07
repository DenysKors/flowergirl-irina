export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh font-heading text-center text-text bg-background">
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        ⚙️ На сайті ведуться технічні роботи.
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#666" }}>
        Ми оновлюємо сайт, щоб зробити його ще краще. А поки за новинками
        завітайте в наш{" "}
        <a
          className="link-base"
          href="https://www.tiktok.com/@flowergirl_irina?_r=1&_t=ZS-93WY1ZeQmiF"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          title="TikTok"
        >
          TikTok
        </a>
      </p>
    </div>
  );
}
