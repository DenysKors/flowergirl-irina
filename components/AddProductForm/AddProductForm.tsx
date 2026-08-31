"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import * as Yup from "yup";
import imageCompression from "browser-image-compression";

import { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import type { Category } from "@/prisma/generated/client";
import { PRODUCT_UNITS } from "@/constants/units";

interface FormValues {
  name: string;
  description: string;
  categoryId: "";
  image1: Blob | null;
  blobImage1: string | null;
  image2: Blob | null;
  blobImage2: string | null;
  image3: Blob | null;
  blobImage3: string | null;
  qty: number;
  unit: string;
  price: number;
}

interface FormAction {
  resetForm: () => void;
}

export default function AddProductForm({
  subCategories,
}: {
  subCategories: Category[];
}) {
  const inputPhoto1Ref = useRef<HTMLInputElement>(null);
  const inputPhoto2Ref = useRef<HTMLInputElement>(null);
  const inputPhoto3Ref = useRef<HTMLInputElement>(null);
  const allCategoriesId = subCategories.map((item) => item.id);

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormAction
  ) => {
    const productData = new FormData();
    productData.append("name", values.name);
    productData.append("description", values.description);
    productData.append("categoryId", values.categoryId);
    productData.append("qty", values.qty.toString());
    productData.append("unit", values.unit);
    productData.append("price", values.price.toString());

    if (!values.image1) return toast.error("Добавьте главное фото");
    productData.append("images[]", values.image1);

    if (values.image2) productData.append("images[]", values.image2);
    if (values.image3) productData.append("images[]", values.image3);

    const response = await fetch("/api/add-product", {
      method: "POST",
      body: productData,
    });

    if (response.ok) {
      resetForm();
      if (inputPhoto1Ref.current) {
        inputPhoto1Ref.current.value = "";
      }
      if (inputPhoto2Ref.current) {
        inputPhoto2Ref.current.value = "";
      }
      if (inputPhoto3Ref.current) {
        inputPhoto3Ref.current.value = "";
      }
      toast.success("Товар добавлен");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const errData = await response.json();
      toast.error(errData);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        categoryId: "",
        image1: null,
        blobImage1: null,
        image2: null,
        blobImage2: null,
        image3: null,
        blobImage3: null,
        qty: 0,
        price: 0,
        unit: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .max(50, "Название слишком длинное")
          .required("Название обязательно"),
        description: Yup.string().required("Описание обязательно"),
        categoryId: Yup.number()
          .test("valid", "Категория не выбрана", (val) => {
            if (val && allCategoriesId.includes(val)) return true;
            return false;
          })
          .required("Категория/подкатегория обязательна"),
        image1: Yup.mixed<File>().required("Главное фото обязательно"),
        unit: Yup.string().required("Поле обязательно"),
        qty: Yup.number()
          .integer("Количество должно быть целым числом")
          .moreThan(0, "Количество должно быть больше 0")
          .required("Количество обязательно"),
        price: Yup.number()
          .integer("Цена должна быть целым числом")
          .moreThan(0, "Цена должна быть больше 0")
          .required("Цена обязательна"),
      })}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <label className="mb-4 flex flex-col gap-1 font-heading">
            Название:
            <Field
              className="p-1 w-full font-text text-text bg-background border-b border-b-main"
              type="text"
              name="name"
              maxLength="50"
            />
          </label>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="name"
            component="div"
          />
          <label className="mb-4 flex flex-col gap-1 font-heading">
            Описание:
            <Field
              className="p-1 w-full font-text border border-border-gray rounded-b-md resize-none"
              component="textarea"
              name="description"
              rows="10"
            />
          </label>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="description"
            component="div"
          />
          <p className="mb-2.5 font-heading">Категория:</p>
          <Field
            className="mb-4 outline-none focus:outline-none text-text font-text bg-background ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10"
            id="category"
            as="select"
            name="categoryId"
          >
            <option value="default" hidden>
              Выберите подкатегорию
            </option>
            {subCategories.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Field>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="categoryId"
            component="div"
          />
          <label className="mb-4 flex flex-col gap-1.5 font-heading">
            Кол-во:
            <div>
              <Field
                className="p-1.5 max-w-25 bg-background border-b border-b-main"
                type="number"
                name="qty"
              />
            </div>
          </label>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="qty"
            component="div"
          />
          <p className="mb-2.5 font-heading">Ед. изм.:</p>
          <Field
            className="mb-4 outline-none focus:outline-none text-text font-text bg-background ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10"
            id="unit"
            as="select"
            name="unit"
          >
            <option value="default" hidden>
              Выбор...
            </option>
            {Object.values(PRODUCT_UNITS).map((unit) => {
              return (
                <option value={unit} key={unit}>
                  {unit}
                </option>
              );
            })}
          </Field>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="unit"
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
          <div className="w-full flex flex-wrap gap-2">
            <div>
              <p className="mt-6 mb-1.5 max-w-100 flex flex-col gap-1 font-text">
                Фото 1 (главное):
              </p>
              <Field name="image1">
                {() => (
                  <input
                    ref={inputPhoto1Ref}
                    className="block w-full text-xs text-gray-500
    file:mr-2 file:py-1 file:px-2
    file:rounded-full file:border-0
    file:text-xs file:font-semibold
    file:bg-blue-50 file:text-text
    hover:file:bg-blue-100"
                    type="file"
                    accept="image/*, .png, .jpeg, .jpg, .webp"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const files = event.currentTarget.files;
                      if (!files) return;
                      if (files.length > 0) {
                        imageCompression(files[0], {
                          maxSizeMB: 1.5,
                        }).then((blob: Blob) => {
                          setFieldValue("image1", blob);
                        });
                        setFieldValue(
                          "blobImage1",
                          URL.createObjectURL(files[0])
                        );
                      }
                    }}
                  />
                )}
              </Field>
              <div className="mt-1.5">
                {values.image1 ? (
                  <div className="w-47.5 h-84.75 md:w-60 md:h-107">
                    <Image
                      className="w-47.5 h-84.75 object-cover object-center md:w-60 md:h-107"
                      src={values.blobImage1 ? values.blobImage1 : ""}
                      width={190}
                      height={339}
                      alt="preview"
                    />
                  </div>
                ) : (
                  <div className="w-47.5 h-84.75 md:w-60 md:h-107">
                    <Image
                      className="w-47.5 h-84.75 md:w-60 md:h-107"
                      src="/no-image-placeholder.png"
                      width={190}
                      height={339}
                      alt="No image"
                      priority
                    />
                  </div>
                )}
              </div>
              <ErrorMessage
                className="font-text text-sm md:text-base text-red-500"
                name="image1"
                component="div"
              />
            </div>
            <div>
              <p className="mt-6 mb-1.5 max-w-100 flex flex-col gap-1 font-text">
                Фото 2 (опционально):
              </p>
              <Field name="image2">
                {() => (
                  <input
                    ref={inputPhoto2Ref}
                    className="block w-full text-xs text-gray-500
    file:mr-2 file:py-1 file:px-2
    file:rounded-full file:border-0
    file:text-xs file:font-semibold
    file:bg-blue-50 file:text-text
    hover:file:bg-blue-100"
                    type="file"
                    accept="image/*, .png, .jpeg, .jpg, .webp"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const files = event.currentTarget.files;
                      if (!files) return;
                      if (files && files.length > 0) {
                        imageCompression(files[0], {
                          maxSizeMB: 1.5,
                        }).then((blob: Blob) => {
                          setFieldValue("image2", blob);
                        });
                        setFieldValue(
                          "blobImage2",
                          URL.createObjectURL(files[0])
                        );
                      }
                    }}
                  />
                )}
              </Field>
              <div className="mt-1.5">
                {values.image2 ? (
                  <div className="w-47.5 h-84.75 md:w-60 md:h-107">
                    <Image
                      className="w-47.5 h-84.75 object-cover object-center md:w-60 md:h-107"
                      src={values.blobImage2 ? values.blobImage2 : ""}
                      width={190}
                      height={339}
                      alt="preview"
                    />
                  </div>
                ) : (
                  <div className="w-47.5 h-84.75 md:w-60 md:h-107">
                    <Image
                      className="w-47.5 h-84.75 md:w-60 md:h-107"
                      src="/no-image-placeholder.png"
                      width={190}
                      height={339}
                      alt="No image"
                      priority
                    />
                  </div>
                )}
              </div>
              <ErrorMessage
                className="font-text text-sm md:text-base text-red-500"
                name="image2"
                component="div"
              />
            </div>
            <div>
              <p className="mt-6 mb-1.5 max-w-100 flex flex-col gap-1 font-text">
                Фото 3 (опционально):
              </p>
              <Field name="image3">
                {() => (
                  <input
                    ref={inputPhoto3Ref}
                    className="block w-full text-xs text-gray-500
    file:mr-2 file:py-1 file:px-2
    file:rounded-full file:border-0
    file:text-xs file:font-semibold
    file:bg-blue-50 file:text-text
    hover:file:bg-blue-100"
                    type="file"
                    accept="image/*, .png, .jpeg, .jpg, .webp"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const files = event.currentTarget.files;
                      if (!files) return;
                      if (files && files.length > 0) {
                        imageCompression(files[0], {
                          maxSizeMB: 1.5,
                        }).then((blob: Blob) => {
                          setFieldValue("image3", blob);
                        });
                        setFieldValue(
                          "blobImage3",
                          URL.createObjectURL(files[0])
                        );
                      }
                    }}
                  />
                )}
              </Field>
              <div className="mt-1.5">
                {values.image3 ? (
                  <div className="w-47.5 h-84.75 md:w-60 md:h-107">
                    <Image
                      className="w-47.5 h-84.75 object-cover object-center md:w-60 md:h-107"
                      src={values.blobImage3 ? values.blobImage3 : ""}
                      width={190}
                      height={339}
                      alt="preview"
                    />
                  </div>
                ) : (
                  <div className="w-47.5 h-84.75 md:w-60 md:h-107">
                    <Image
                      className="w-47.5 h-84.75 md:w-60 md:h-107"
                      src="/no-image-placeholder.png"
                      width={190}
                      height={339}
                      alt="No image"
                      priority
                    />
                  </div>
                )}
              </div>
              <ErrorMessage
                className="font-text text-sm md:text-base text-red-500"
                name="image3"
                component="div"
              />
            </div>
          </div>
          <button
            className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
            type="submit"
            aria-label="Добавить товар"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Сохранение..." : "Сохранить товар"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
