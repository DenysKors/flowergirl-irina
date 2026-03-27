"use client";

import toast from "react-hot-toast";
import * as Yup from "yup";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Modal from "../ModalRoot/ModalRoot";

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

export default function ProductUpdate({ currentProducts }) {
  const [products, setProducts] = useState(currentProducts);
  const [productData, setProductData] = useState(null);
  const [filterCode, setFilterCode] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setProducts(currentProducts);
  }, [currentProducts]);

  const filteredProducts = products.filter((product) => {
    if (filterCode === "") {
      return true;
    } else {
      return product.code === filterCode;
    }
  });

  const handleFilterChange = (evt) => {
    setFilterCode(evt.target.value);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const newValues = {
      code: productData.code,
      price: values.price,
      qty: values.qty,
    };
    const response = await fetch("/api/update-product", {
      method: "PATCH",
      body: JSON.stringify(newValues),
    });
    if (response.ok) {
      resetForm();
      setisModalOpen(false);
      setProductData(null);
      toast.success("Товар обновлен");
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.refresh();
    } else toast.error("Ошибка при обновлении, повторите снова");
  };

  return (
    <>
      {products && (
        <div className="mb-4 w-full flex justify-center flex-row">
          <input
            className="w-60 lg:max-w-60 border-main border px-3 py-0.5 rounded-md "
            name="code"
            type="text"
            pattern="^[0-9\-]*$"
            placeholder="Поиск по артикулу"
            maxLength={6}
            onChange={handleFilterChange}
          />
        </div>
      )}
      <ul className="flex flex-wrap justify-center gap-2.5">
        {products &&
          filteredProducts.map(({ code, title, category, price, qty }) => (
            <li
              className="p-1 w-60 lg:max-w-60 flex flex-col justify-between border border-gray-300 rounded-lg"
              key={code}
            >
              <div className="flex flex-col gap-2">
                <p className="font-heading text-main md:text-lg lg:text-xl wrap-anywhere">
                  {title}
                </p>
                <p className="text-sm md:text-base text-text wrap-anywhere">
                  {`Арт. ${code}`}
                </p>
                <p className="text-sm md:text-base text-text wrap-anywhere">
                  {`Категория: ${category.reduce((accum, item, idx) => {
                    if (idx === 0) {
                      return accum + item.label;
                    } else {
                      return accum + ", " + item.label;
                    }
                  }, "")}`}
                </p>
                <p className="text-sm md:text-base break-all text-text">
                  {`Цена: ${price} грн`}
                </p>
                <p className="text-sm md:text-base break-all text-text">
                  {`Кол-во: ${qty} шт`}
                </p>
              </div>
              <button
                className="button ms-auto cursor-pointer"
                type="button"
                aria-label="обновить"
                title="обновить"
                onClick={() => {
                  setProductData({ code, title, price, qty });
                  setisModalOpen(true);
                }}
              >
                <svg className="w-6 h-6 fill-border-gray hover:fill-red-500">
                  <use href="/icons.svg#icon-refresh"></use>
                </svg>
              </button>
            </li>
          ))}
      </ul>
      {isModalOpen && productData && (
        <Modal onClose={() => setisModalOpen(false)} isModalOpen isSelfClose>
          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="font-heading text-xl text-center">
              Обновление товара
            </h3>
            <Formik
              initialValues={productData}
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
          </div>
        </Modal>
      )}
    </>
  );
}
