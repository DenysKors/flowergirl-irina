"use client";

import toast from "react-hot-toast";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = {
  label: "",
  value: "",
};

const categorySchema = Yup.object().shape({
  label: Yup.string()
    .max(25, "Название слишком длинное")
    .matches(
      /^[а-яієїґ'()\s]+$/,
      "Только маленькие буквы, между словами используйте пробел"
    )
    .required("Название обязательно"),
  value: Yup.string()
    .max(25, "Значение слишком длинное")
    .matches(/^[a-z]+$/, "Только маленькие буквы, слитно без пробелов")
    .required("Значение обязательно"),
});

export default function AddCategoryForm({ categoryType = "" }) {
  const router = useRouter();

  const handleSubmit = async (values, { resetForm }) => {
    if (categoryType === "") return toast.error("Выберите вид товара");

    const newCategory = {
      label: values.label.trim(),
      value: values.value.trim(),
    };
    const categoryData = new FormData();
    categoryData.append("categoryType", categoryType);
    categoryData.append("category", JSON.stringify(newCategory));

    const response = await fetch("/api/add-category", {
      method: "POST",
      body: categoryData,
    });

    if (response.ok) {
      resetForm();
      toast.success("Категория добавлена");
      router.push("/dashboard/analytics/");
    } else {
      const errData = await response.json();
      toast.error(errData);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={categorySchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <label className="mb-4 flex flex-col gap-1 font-heading">
            Название (по-украински):
            <Field
              className="p-1 w-full font-text text-text bg-background border-b border-b-main"
              type="text"
              name="label"
              maxLength="25"
            />
          </label>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="label"
            component="div"
          />
          <label className="mb-4 flex flex-col gap-1 font-heading">
            Значение (перевод названия на английский):
            <Field
              className="p-1 w-full font-text text-text bg-background border-b border-b-main"
              type="text"
              name="value"
              maxLength="25"
            />
          </label>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="value"
            component="div"
          />
          <button
            className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
            type="submit"
            aria-label="Добавить товар"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Сохранение" : "Сохранить категорию"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
