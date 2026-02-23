import { getAnalytics } from "@/lib/api";

export default async function Analytics() {
  const analyticsData = await getAnalytics();
  return (
    <section className="w-full h-full">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Аналитика
      </h1>
      <div className="flex flex-col justify-center gap-2 lg:gap-4">
        <div className="p-1 flex-1 text-center">
          <strong className="font-text text-xs lg:text-xl">
            Товаров категории &#171;Растения&#187;
          </strong>
          <p className="font-text font-bold text-center">
            {analyticsData?.plantsAmount}
          </p>
        </div>
        <div className="p-1 flex-1 text-center">
          <strong className="font-text text-xs lg:text-xl">
            Товаров категории &#171;Защита растений&#187;
          </strong>
          <p className="font-text font-bold text-center">
            {analyticsData?.protectionAmount}
          </p>
        </div>
        <div className="p-1 flex-1 text-center">
          <strong className="font-text text-xs lg:text-xl">
            Товаров категории &#171;Вспомагательные материалы&#187;
          </strong>
          <p className="font-text font-bold text-center">
            {analyticsData?.suppliesAmount}
          </p>
        </div>
      </div>
    </section>
  );
}
