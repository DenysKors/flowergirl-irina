"use client";

import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const productDeleteSchema = Yup.object().shape({
  code: Yup.string()
    .min(6, "Должно быть 6 символов")
    .max(6, "Должно быть 6 символов")
    .matches(/^[0-9\-]*$/, "Только цифры")
    .required("Поле обязательно"),
});

export default function ProductDelete({ productType }) {
  const handleSubmit = async (values, { resetForm }) => {
    if (productType === "plant" && values.code.charAt(0) !== "1") {
      return toast.error("Код не соответствует категории товара");
    } else if (productType === "protection" && values.code.charAt(0) !== "2") {
      return toast.error("Код не соответствует категории товара");
    } else if (productType === "supplies" && values.code.charAt(0) !== "3") {
      return toast.error("Код не соответствует категории товара");
    }

    const response = await fetch("/api/delete-product", {
      method: "DELETE",
      body: JSON.stringify({ productType, code: values.code }),
    });
    if (response.ok) {
      resetForm();
      toast.success("Товар удален");
    } else if (response.status === 404) {
      toast.error("Товар не найден");
    } else toast.error("Ошибка при удалении, повторите снова");
  };

  return (
    <Formik
      initialValues={{
        code: "",
      }}
      validationSchema={productDeleteSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <label className="mb-4 flex flex-col gap-1 font-heading">
            Код товара:
            <Field
              className="p-1 w-full font-text text-text bg-background border-b border-b-main"
              type="text"
              name="code"
              maxLength="6"
            />
          </label>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="code"
            component="div"
          />
          <button
            className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
            type="submit"
            aria-label="delete product"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Удаление" : "Удалить товар"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
