"use client";

import toast from "react-hot-toast";
import { useState } from "react";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// const updateProdSchema = Yup.object().shape({
//   code: Yup.string(),
//   price: Yup.number()
//     .integer("Цена должна быть целым числом")
//     .moreThan(0, "Цена должна быть больше 0")
//     .required("Цена обязательна"),
//   qty: Yup.number()
//     .positive("Кол-во должно быть больше или равно 0")
//     .required("Кол-во обязательно"),
// });

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
        price: productData.price,
        sell_status: productData.sell_status,
      });
    } else if (response.status === 404) {
      setCode("");
      toast.error("Товар не найден");
    } else toast.error("Ошибка поиска, повторите снова");
  };

  //   const handleSubmit = async (values, { resetForm }) => {
  //     const response = await fetch("/api/update-product", {
  //       method: "PATCH",
  //       body: JSON.stringify(values),
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       resetForm();
  //       setCode("");
  //       setProduct(null);
  //       toast.success("Товар оновлений");
  //     } else toast.error("Помилка при збереженні, повторіть знову");
  //   };
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
      {/* {product && (
        <Formik
          initialValues={product}
          validationSchema={updateProdSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <label className={styles.label}>
                Ціна:
                <div>
                  <Field
                    className={styles.inputNumber}
                    type="number"
                    name="price"
                  />
                  <span>грн.</span>
                </div>
              </label>
              <ErrorMessage
                className={styles.error}
                name="price"
                component="div"
              />
              <p className={styles.title}>Статус:</p>
              <div className={styles.box}>
                {Object.values(SELL_STATUS_ENUMS).map((status, index) => {
                  return (
                    <label key={index} className={styles.categoryLabel}>
                      <Field type="radio" name="sell_status" value={status} />
                      {status}
                    </label>
                  );
                })}
              </div>
              <ErrorMessage
                className={styles.error}
                name="category"
                component="div"
              />
              <button
                className={styles.button}
                type="submit"
                aria-label="delete product"
                disabled={isSubmitting}
              >
                Оновити товар
              </button>
            </Form>
          )}
        </Formik>
      )} */}
    </>
  );
}
