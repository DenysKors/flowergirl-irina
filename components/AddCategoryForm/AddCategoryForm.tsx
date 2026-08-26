"use client";

import toast from "react-hot-toast";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";

import type { Category } from "@/prisma/generated/client";

interface FormValues {
  name: string;
  parent: string;
}

interface FormAction {
  resetForm: () => void;
}

const initialValues = {
  name: "",
  parent: "",
};

export default function AddCategoryForm({
  mainCategories,
}: {
  mainCategories: Category[];
}) {
  const router = useRouter();

  const mainCatSlug = mainCategories.map((item) => item.slug);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormAction
  ) => {
    const categoryData = new FormData();
    categoryData.append("name", values.name.trim());
    categoryData.append("parent", values.parent);

    const response = await fetch("/api/add-category", {
      method: "POST",
      body: categoryData,
    });

    if (response.ok) {
      resetForm();
      toast.success("Подкатегория сохранена");
      router.refresh();
    } else {
      const errData = await response.json();
      toast.error(errData);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(25, "Название слишком длинное")
          .matches(
            /^[а-яієїґ'()\s]+$/,
            "Только маленькие буквы, между словами используйте пробел"
          )
          .required("Название обязательно"),
        parent: Yup.string()
          .test("valid", "Категория не выбрана", (val) => {
            if (val && mainCatSlug.includes(val)) return true;
            return false;
          })
          .required("Основная категория обязательна"),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <label className="mb-6 flex flex-col gap-1 font-heading">
            Название (по-украински):
            <Field
              className="p-1 w-full font-text text-text bg-background border-b border-b-main"
              type="text"
              name="name"
              maxLength="25"
            />
          </label>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="name"
            component="div"
          />
          <label className="mb-6 flex flex-col gap-1 font-heading">
            Основная категория:
            <Field
              className="outline-none focus:outline-none text-text font-text bg-background ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10"
              as="select"
              name="parent"
            >
              <option value="">Выберите зависимость</option>
              {mainCategories.map((item) => {
                return (
                  <option value={item.slug} key={item.slug}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
          </label>
          <ErrorMessage
            className="font-text text-sm md:text-base text-red-500"
            name="parent"
            component="div"
          />
          <button
            className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
            type="submit"
            aria-label="Добавить категорию"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Сохранение..." : "Сохранить подкатегорию"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
