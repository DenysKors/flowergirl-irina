export default function Footer() {
  return (
    <footer className="bg-violet-800">
      <div className="container pt-8 pb-6 lg:pt-7 lg:pb-5">
        <div className="py-8 flex justify-between items-center gap-4 flex-col sm:flex-row text-sm">
          <h3 className="text-background">Умови оплати та доставки</h3>
          <h3 className="text-background">Контактна інформація</h3>
        </div>
        <div className="text-center">
          <p className="text-xs md:text-base text-background">
            &copy; 2026 Ірочка Хазяйка
          </p>
          <p className="text-xs md:text-base text-background">
            Design&Dev by DanExplorer
          </p>
        </div>
      </div>
    </footer>
  );
}
