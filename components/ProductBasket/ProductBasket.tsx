"use client";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { InputMask } from "@react-input/mask";

import { CustomInput } from "../CustomInput/CustomInput";
import { useBasketStore } from "@/store/basketStore";

type ProductBasketProp = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductBasket({ onClose }: ProductBasketProp) {
  const basketProducts = useBasketStore((state) => state.products);
  const totalPrice = useBasketStore((state) => state.totalPrice);
  const removeProduct = useBasketStore((state) => state.removeProduct);
  const increaseQty = useBasketStore((state) => state.increaseUserQty);
  const decreaseQty = useBasketStore((state) => state.decreaseUserQty);
  const reset = useBasketStore((state) => state.reset);
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  const router = useRouter();

  const handleDecr = (code: string, userQty: number) => {
    if (userQty === 1) return;
    decreaseQty(code, userQty);
  };

  const handleIncr = (code: string, stock: number, userQty: number) => {
    if (userQty >= stock) return;
    increaseQty(code, userQty);
  };

  const handleAccept = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const userOrder = new FormData(evt.currentTarget);
    userOrder.append("products", JSON.stringify(basketProducts));
    userOrder.append("totalPrice", JSON.stringify(totalPrice));

    const response = await fetch("/api/add-order", {
      method: "POST",
      body: userOrder,
    });
    if (response.ok) {
      reset();
      onClose(false);
      toast.success("Замолення відправлено в обробку. Дякуємо!");
      router.refresh();
    } else toast.error("Помилка при збереженні, повторіть знову");
  };

  return (
    <>
      <h2 className="mb-5 font-heading text-text text-2xl lg:text-3xl">
        Кошик
      </h2>
      <div className="mb-5 p-1 border border-main rounded-sm md:p-2">
        {basketProducts.length === 0 && (
          <p className="font-text lg:text-xl text-center">
            Зараз кошик пустий, наповніть його!
          </p>
        )}
        {basketProducts.length > 0 &&
          basketProducts.map((product) => {
            return (
              <div
                className="mb-3 flex flex-row gap-1 justify-between border-b border-b-border-gray"
                key={product.code}
              >
                <div className="flex gap-2">
                  <CldImage
                    width={80}
                    height={143}
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-15 h-26.75 object-cover object-center md:w-20 md:h-35.75"
                  />
                  <div className="flex flex-col gap-1 justify-between">
                    <span className="font-heading text-main md:text-lg lg:text-xl">
                      {product.title}
                    </span>
                    <div className="w-min">
                      <div className="flex items-center border border-gray-900 content-justify bg-white rounded-lg">
                        <button
                          className="p-3 cursor-pointer"
                          type="button"
                          aria-label="зменшити кількість"
                          onClick={() =>
                            handleDecr(product.code, product.userQty)
                          }
                        >
                          <svg className="w-4.5 h-4.5">
                            <use href={`${baseUrl}/icons.svg#icon-minus`}></use>
                          </svg>
                        </button>
                        <span className="px-1 py-2 w-10 text-center">
                          {product.userQty}
                        </span>
                        <button
                          className="p-3 cursor-pointer"
                          type="button"
                          aria-label="збільшити кількість"
                          onClick={() =>
                            handleIncr(
                              product.code,
                              product.stock,
                              product.userQty
                            )
                          }
                        >
                          <svg className="w-4.5 h-4.5">
                            <use href={`${baseUrl}/icons.svg#icon-plus`}></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <button
                    className="button ms-auto p-2 mb-4 cursor-pointer"
                    type="button"
                    aria-label="видалити"
                    title="видалити"
                    onClick={() => removeProduct(product)}
                  >
                    <svg className="w-6 h-6 fill-border-gray hover:fill-red-500">
                      <use href={`${baseUrl}/icons.svg#icon-trash`}></use>
                    </svg>
                  </button>
                  <span className="font-text md:text-lg lg:text-xl">{`${product.sumPrice} грн`}</span>
                </div>
              </div>
            );
          })}
        {basketProducts.length > 0 && (
          <>
            <p className="text-right">
              <strong className="mb-3 font-text lg:text-xl">
                &#42;{`Всього: ${totalPrice} грн`}
              </strong>
            </p>
            <div>
              <form onSubmit={handleAccept}>
                <fieldset className="flex flex-col font-text">
                  Контактні дані для замовлення та відправки:
                  <div className="my-2.5">
                    <label className="flex flex-col font-text">
                      Прізвище та Ім&apos;я:
                      <input
                        className="w-full md:w-80 outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
                        type="text"
                        name="name"
                        autoComplete="false"
                        required
                        maxLength={30}
                      />
                    </label>
                  </div>
                  <div className="mb-2.5">
                    <InputMask
                      component={CustomInput}
                      showMask={true}
                      label="Номер телефону:"
                      mask="(___) ___-__-__"
                      replacement={{ _: /\d/ }}
                    />
                  </div>
                  <div className="my-2.5">
                    <label className="flex flex-col font-text">
                      Область:
                      <input
                        className="w-full md:w-80 outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
                        type="text"
                        name="region"
                        autoComplete="false"
                        required
                        maxLength={50}
                      />
                    </label>
                  </div>
                  <div className="my-2.5">
                    <label className="flex flex-col font-text">
                      Населений пункт:
                      <input
                        className="w-full md:w-80 outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
                        type="text"
                        name="town"
                        autoComplete="false"
                        required
                        maxLength={30}
                      />
                    </label>
                  </div>
                  <div className="my-2.5">
                    <label className="flex flex-col font-text">
                      Відділення/поштомат &#171;Нова пошта&#187;:
                      <input
                        className="w-full md:w-80 outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
                        type="text"
                        name="postcode"
                        autoComplete="false"
                        required
                        maxLength={20}
                      />
                    </label>
                  </div>
                  <div className="my-2.5">
                    <label className="flex flex-col font-text">
                      Коментар(за потреби):
                      <textarea
                        className="peer block w-full resize-none rounded-md border border-slate-200 bg-transparent p-2.5 leading-none text-text font-text outline-none ring ring-transparent transition-all duration-300 ease-in hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:outline-none focus:ring-slate-800/10"
                        name="comment"
                        rows={4}
                        maxLength={240}
                      ></textarea>
                    </label>
                  </div>
                </fieldset>
                <p className="text-text">
                  &#42;Загальна вартість без урахування вартості доставки
                  товару. Вартість доставки сплачується покупцем при отриманні
                  замовлення.
                </p>
                <button
                  className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
                  type="submit"
                >
                  Підтвердити замовлення
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
