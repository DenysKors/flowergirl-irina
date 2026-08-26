// import { getAnalytics } from "@/lib/api";

export default async function Analytics() {
  // const analyticsData = await getAnalytics();
  return (
    <section className="w-full h-full">
      <h1 className="mb-2 font-heading lg:text-3xl uppercase text-center text-text">
        Аналитика
      </h1>
      {/* <div className="w-max flex flex-col justify-self-center gap-2 lg:gap-4">
        <div className="p-2 flex-1 text-center bg-gray-100 rounded-xl">
          <p className="font-text font-bold text-xs lg:text-xl">
            Товаров &#171;Растения&#187;
          </p>
          <p className="font-text font-bold text-xs lg:text-xl">
            всего:{" "}
            <span className="font-text font-bold text-base lg:text-2xl text-center">
              {analyticsData?.plantsAmount}
            </span>
            , из них &#171;нет в наличии&#187;:{" "}
            <span className="font-text font-bold text-base lg:text-2xl text-center">
              {analyticsData?.plantsZeroQtyAmnt}
            </span>
          </p>
        </div>
        <div className="p-2 flex-1 text-center bg-gray-100 rounded-xl">
          <p className="font-text font-bold text-xs lg:text-xl">
            Товаров &#171;Защита растений&#187;
          </p>
          <p className="font-text font-bold text-xs lg:text-xl">
            всего:{" "}
            <span className="font-text font-bold text-base lg:text-2xl text-center">
              {analyticsData?.protectionAmount}
            </span>
            , из них &#171;нет в наличии&#187;:{" "}
            <span className="font-text font-bold text-base lg:text-2xl text-center">
              {analyticsData?.protectionZeroQtyAmnt}
            </span>
          </p>
        </div>
        <div className="p-2 flex-1 text-center bg-gray-100 rounded-xl">
          <p className="font-text font-bold text-xs lg:text-xl">
            Товаров &#171;Вспомагательные материалы&#187;
          </p>
          <p className="font-text font-bold text-xs lg:text-xl">
            всего:{" "}
            <span className="font-text font-bold text-base lg:text-2xl text-center">
              {analyticsData?.suppliesAmount}
            </span>
            , из них &#171;нет в наличии&#187;:{" "}
            <span className="font-text font-bold text-base lg:text-2xl text-center">
              {analyticsData?.suppliesZeroQtyAmnt}
            </span>
          </p>
        </div>
      </div> */}
    </section>
  );
}
