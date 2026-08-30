"use client";

import toast from "react-hot-toast";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { ProductWithCats, ProductToUpdate } from "@/types/types";
import type { Category } from "@/prisma/generated/client";
import { PRODUCT_UNITS } from "@/lib/constants";

interface FormAction {
  resetForm: () => void;
}

type UpdateProductFormProps = {
  product: ProductWithCats;
  productSubCategories: Category[];
};

export default function UpdateProductForm({
  product,
  productSubCategories,
}: UpdateProductFormProps) {
  const router = useRouter();

  const allCategoriesId = productSubCategories.map((item) => item.id);

  const handleSubmit = async (
    values: ProductToUpdate,
    { resetForm }: FormAction
  ) => {
    const productData = new FormData();

    if (!values.description) return toast.error("Добавьте описание");
    productData.append("description", values.description);
    productData.append("description", values.description);
    productData.append("id", product.id.toString());
    productData.append("categoryId", values.categoryId.toString());
    productData.append("qty", values.qty.toString());
    productData.append("unit", values.unit);
    productData.append("price", values.price.toString());

    const response = await fetch(`/api/update-product/${product.id}`, {
      method: "PATCH",
      body: productData,
    });
    if (response.ok) {
      resetForm();
      toast.success("Товар обновлен");
      router.push("/dashboard/products/");
    } else {
      const errData = await response.json();
      toast.error(errData);
    }
  };
  return (
    <>
      <div>
        <button
          className="mb-4 button flex items-center gap-2 font-text text-text text-sm bg-background cursor-pointer"
          type="button"
          aria-label="перейти назад"
          title="Назад"
          onClick={() => {
            router.back();
          }}
        >
          <svg className="h-4 w-4 lg:h-5 lg:w-5 fill-black">
            <use href="/icons.svg#icon-arrow-left"></use>
          </svg>
          к товарам
        </button>
      </div>
      <h2 className="mb-4 mx-auto max-w-xl font-heading text-main md:text-lg lg:text-xl wrap-anywhere text-left">
        {product.name}
      </h2>
      <Formik
        initialValues={product}
        enableReinitialize={true}
        validationSchema={Yup.object().shape({
          description: Yup.string()
            .max(50, "Название слишком длинное")
            .required("Название обязательно"),
          categoryId: Yup.number()
            .test("valid", "Категория не выбрана", (val) => {
              if (val && allCategoriesId.includes(val)) return true;
              return false;
            })
            .required("Подкатегория обязательна"),
          qty: Yup.number()
            .integer("Количество должно быть целым числом")
            .moreThan(-1, "Больше 0 или 0")
            .required("Количество обязательно"),
          unit: Yup.string().required("Поле обязательно"),
          price: Yup.number()
            .integer("Цена должна быть целым числом")
            .moreThan(0, "Цена должна быть больше 0")
            .max(1000000, "Цена больше 1млн.")
            .required("Цена обязательна"),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="mx-auto max-w-xl">
            <label className="mt-6 max-w-100 flex flex-col gap-1 font-text">
              Описание:
              <Field
                className="p-1 w-full font-text border border-border-gray rounded-b-md resize-none"
                component="textarea"
                name="description"
                rows="10"
              />
            </label>
            <ErrorMessage
              className="font-text text-sm md:text-base text-red-500"
              name="description"
              component="div"
            />
            <label
              htmlFor="category"
              className="mt-6 max-w-100 flex flex-col gap-1 font-text"
            >
              Подкатегория товара:
            </label>
            <Field
              className="outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
              id="category"
              as="select"
              name="categoryId"
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue("categoryId", evt.target.value)
              }
            >
              {productSubCategories.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage
              className="font-text text-sm md:text-base text-red-500"
              name="categoryId"
              component="div"
            />
            <div className="mt-6 flex gap-10">
              <div>
                <label className="max-w-25 flex flex-col gap-1 font-text">
                  Кол-во:
                  <Field
                    className="p-1.5 max-w-25 bg-background border-b border-b-main"
                    type="number"
                    name="qty"
                  />
                </label>
              </div>
              <div className="flex flex-col justify-between">
                <label
                  htmlFor="unit"
                  className="max-w-100 flex flex-col gap-1 font-text"
                >
                  Ед. изм.:
                </label>
                <Field
                  className="outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
                  id="unit"
                  as="select"
                  name="unit"
                >
                  {Object.values(PRODUCT_UNITS).map((unit) => {
                    return (
                      <option value={unit} key={unit}>
                        {unit}
                      </option>
                    );
                  })}
                </Field>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="w-25">
                <ErrorMessage
                  className="font-text text-sm md:text-base text-red-500"
                  name="qty"
                  component="div"
                />
              </div>
              <ErrorMessage
                className="font-text text-sm md:text-base text-red-500"
                name="unit"
                component="div"
              />
            </div>
            <label className="mt-6 max-w-35 flex flex-col gap-1 font-text">
              Цена:
              <div className="flex gap-2">
                <Field
                  className="p-1 max-w-25 bg-background border-b border-b-main"
                  type="number"
                  name="price"
                />
                <span className="font-text text-text self-end">грн.</span>
              </div>
            </label>
            <ErrorMessage
              className="font-text text-sm md:text-base text-red-500"
              name="price"
              component="div"
            />
            <button
              className="mt-10 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
              type="submit"
              aria-label="Обновить товар"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Обновление..." : "Обновить"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
