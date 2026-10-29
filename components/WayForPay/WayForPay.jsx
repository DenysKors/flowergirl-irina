"use client";

import Script from "next/script";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { useBasketStore } from "@/store/basketStore";

export default function WayForPay({ setIsFetching, isFetching, localState }) {
  const basketProducts = useBasketStore((state) => state.products);
  const basketTotalPrice = useBasketStore((state) => state.totalPrice);
  const basketCustomerData = useBasketStore((state) => state.customerData);
  const router = useRouter();

  const handlePayment = async () => {
    if (localState.lastName.trim() === "")
      return toast.error("Додайте Прізвище");

    if (localState.firstName.trim() === "") return toast.error("Додайте Ім'я");

    const numericValue = localState.phoneNumber.replace(/[^0-9]/g, "");

    if (numericValue?.length !== 12)
      return toast.error("Недостатня кількість цифр. Перевірте номер телефону");

    if (localState.postLocation === "")
      return toast.error("Виберіть відділення або поштомат Нової Пошти");

    try {
      setIsFetching(true);
      const products = basketProducts.map((prod) => {
        return {
          id: prod.id,
          price: prod.price,
          qty: prod.userQty,
        };
      });
      const response = await fetch("/api/add-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerData: basketCustomerData,
          products,
          totalPrice: basketTotalPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      }
      const {
        merchantAccount,
        merchantSignature,
        amount,
        orderDate,
        orderRef,
        productData,
      } = data;

      if (basketTotalPrice !== Number(amount)) {
        setIsFetching(false);
        return alert("Сума замовлення не співпадає. Сформуйте кошик знову.");
      }

      localStorage.setItem("pending_order_ref", orderRef);

      const productName = productData.map((item) => item.name);
      const productPrice = productData.map((item) => Number(item.price));
      const productCount = productData.map((item) => Number(item.qty));

      const wayforpay = new window.Wayforpay();

      wayforpay.run(
        {
          merchantAccount,
          merchantDomainName: process.env.NEXT_PUBLIC_SITE_URL,
          authorizationType: "SimpleSignature",
          merchantSignature: merchantSignature,
          orderReference: orderRef,
          orderDate: orderDate,
          amount: amount,
          currency: "UAH",
          productName,
          productPrice,
          productCount,
          clientFirstName: basketCustomerData.firstName,
          clientLastName: basketCustomerData.surName,
          clientPhone: basketCustomerData.phoneNumber,
          language: "UA",
          serviceUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/wayforpay/callback`,
        },
        function (response) {
          const orderReference = response.orderReference;
          router.push(`/payment/success?ref=${orderReference}`);
        },
        function () {
          localStorage.removeItem("pending_order_ref");
        },
        async function () {}
      );
    } catch (error) {
      console.error("Помилка платежу:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <Script
        id="widget-wfp-script"
        language="javascript"
        type="text/javascript"
        src="https://secure.wayforpay.com/server/pay-widget.js"
        strategy="lazyOnload"
      />
      <button
        className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
        type="button"
        disabled={isFetching}
        onClick={handlePayment}
      >
        {isFetching ? "Завантаження..." : "Сплатити замовлення"}
      </button>
    </>
  );
}
