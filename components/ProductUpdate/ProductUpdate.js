"use client";

import toast from "react-hot-toast";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const updateProdSchema = Yup.object().shape({
  price: Yup.number()
    .integer("Цена должна быть целым числом")
    .moreThan(0, "Цена должна быть больше 0")
    .required("Цена обязательна"),
  qty: Yup.number()
    .integer("Количество должно быть целым числом")
    .moreThan(-1, "Количество должно быть больше или равно 0")
    .required("Кол-во обязательно"),
});

export default function ProductUpdate() {
  const [code, setCode] = useState("");
  const [product, setProduct] = useState(null);

  const handleClick = async () => {
    if (code.trim() === "") {
      return toast.error("Укажите код товара");
    } else if (product) setProduct(null);

    const response = await fetch(`/api/search-product-bycode/${code}`);

    if (response.ok) {
      toast.success("Товар найден");
      const productData = await response.json();
      setProduct({
        title: productData.title,
        price: productData.price,
        qty: productData.qty,
      });
    } else if (response.status === 404) {
      setCode("");
      toast.error("Товар не найден");
    } else toast.error("Ошибка поиска, повторите снова");
  };

  const handleSubmit = async (values, { resetForm }) => {
    const newValues = {
      code,
      price: values.price,
      qty: values.qty,
    };

    const response = await fetch("/api/update-product", {
      method: "PATCH",
      body: JSON.stringify(newValues),
    });
    if (response.ok) {
      resetForm();
      setCode("");
      setProduct(null);
      toast.success("Товар обновлен");
    } else toast.error("Ошибка при обновлении, повторите снова");
  };
  return (
    <>
      <div className="w-full flex justify-center flex-row">
        <input
          className="w-full border-main border px-3 py-0.5 rounded-l-md rounded-r-none border-r-0"
          type="text"
          pattern="^[0-9\-]*$"
          placeholder="Код товара"
          maxLength={6}
          value={code}
          onChange={(evt) => setCode(evt.target.value)}
        />
        <button
          className="flex items-center rounded-md rounded-l-none p-2.5 bg-main cursor-pointer"
          type="button"
          aria-label="поиск"
          title="Поиск"
          onClick={handleClick}
        >
          <svg className="h-3 w-3 md:w-6 md:h-6 fill-background">
            <use href="/icons.svg#icon-search"></use>
          </svg>
        </button>
      </div>
      {product && (
        <Formik
          initialValues={product}
          validationSchema={updateProdSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="mt-10">
              <h1 className="mb-4 font-heading text-main md:text-lg lg:text-xl">
                {values.title}
              </h1>
              <label className="mb-4 flex flex-col gap-1 font-heading">
                Количество:
                <div>
                  <Field
                    className="p-1.5 max-w-25 bg-background border-b border-b-main"
                    type="number"
                    name="qty"
                  />
                  <span>шт.</span>
                </div>
              </label>
              <ErrorMessage
                className="mb-2.5 font-text text-sm md:text-base text-red-500"
                name="qty"
                component="div"
              />
              <label className="mb-4 flex flex-col gap-1 font-heading">
                Цена:
                <div>
                  <Field
                    className="p-1.5 max-w-25 bg-background border-b border-b-main"
                    type="number"
                    name="price"
                  />
                  <span>грн.</span>
                </div>
              </label>
              <ErrorMessage
                className="mb-2.5 font-text text-sm md:text-base text-red-500"
                name="price"
                component="div"
              />
              <button
                className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
                type="submit"
                aria-label="delete product"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Сохранение" : "Сохранить изменения"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
