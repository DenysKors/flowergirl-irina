"use client";

import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

export default function AddProductForm({ productCategories }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allCategoriesValue = productCategories.map((item) => item.value);

  const handleSubmit = async (values, { resetForm }) => {
    if (values.images.length > 3) {
      return toast.error("Добавлено больше 3 фото");
    }

    const categoriesAmount = values.category.length;
    const categoriesArray = [];

    for (let i = 0; i < categoriesAmount; i += 1) {
      let categoriesObj = productCategories.find(
        (cat) => cat.value === values.category[i]
      );
      categoriesArray.push(categoriesObj);
    }

    const productType = searchParams.get("type");

    const productData = new FormData();
    productData.append("productType", productType);
    productData.append("title", values.title);
    productData.append("description", values.description);
    productData.append("category", JSON.stringify(categoriesArray));
    [...values.images].forEach((image) => {
      productData.append("image", image);
    });
    productData.append("qty", values.qty);
    productData.append("price", values.price);

    const response = await fetch("/api/add-product", {
      method: "POST",
      body: productData,
    });
    if (response.ok) {
      resetForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Товар добавлен");
      router.push("/dashboard/analytics/");
    } else toast.error("Ошибка при добавлении, повторите снова");
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        category: [""],
        images: null,
        blobImages: [],
        qty: 0,
        price: 0,
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string()
          .max(50, "Название слишком длинное")
          .required("Название обязательно"),
        description: Yup.string().required("Описание обязательно"),
        category: Yup.array()
          .of(
            Yup.string().test("valid", "Категория не выбрана", (val) => {
              if (allCategoriesValue.includes(val)) return true;
              return false;
            })
          )
          .required("Категория обязательна"),
        images: Yup.mixed().required("Фото обязательно"),
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
          <label className="mb-4 flex flex-col gap-1 font-text font-bold">
            Название:
            <Field
              className="p-1 w-full md:w-165 font-text text-text bg-background border-b border-b-main"
              type="text"
              name="title"
              maxLength="50"
            />
          </label>
          <ErrorMessage
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="title"
            component="div"
          />
          <label className="mb-4 flex flex-col gap-1 font-text font-bold">
            Описание:
            <Field
              className="p-1 w-full md:w-112.5 lg:w-162.5 font-text border border-border-gray rounded-b-md resize-none"
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
          <p className="mb-2.5 font-text font-bold">Категория:</p>
          <FieldArray name="categories">
            {() => (
              <>
                {values.category &&
                  values.category.length > 0 &&
                  values.category.map((_, index, arr) => (
                    <div key={index}>
                      <Field
                        className="outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
                        as="select"
                        name={`category.${index}`}
                      >
                        <option value="default" hidden>
                          Выберите категорию
                        </option>
                        {productCategories.map((item) => {
                          return (
                            <option value={item.value} key={item.value}>
                              {item.label}
                            </option>
                          );
                        })}
                      </Field>
                      <ErrorMessage
                        className="mb-2.5 font-text text-sm md:text-base text-red-500"
                        name="category"
                        component="div"
                      />
                    </div>
                  ))}
              </>
            )}
          </FieldArray>
          <p className="mb-2.5 mt-4 font-text font-bold">Фото, макс. 3шт:</p>
          <Field name="images">
            {() => (
              <input
                className="block w-full text-xs text-gray-500
    file:mr-2 file:py-1 file:px-2
    file:rounded-full file:border-0
    file:text-xs file:font-semibold
    file:bg-blue-50 file:text-text
    hover:file:bg-blue-100"
                type="file"
                multiple
                accept="image/*, .png, .jpeg, .gif, .webp"
                onChange={(event) => {
                  setFieldValue("images", event.currentTarget.files);
                  values.blobImages.length = 0;
                  [...event.currentTarget.files].forEach((file, idx) =>
                    setFieldValue(
                      `blobImages.${idx}`,
                      URL.createObjectURL(file)
                    )
                  );
                }}
              />
            )}
          </Field>
          <div className="mt-1.5 mb-3.5 w-full flex flex-wrap gap-2">
            {values.images ? (
              values.blobImages.map((image, index) => (
                <div className="w-47.5 h-84.75 md:w-60 md:h-107" key={index}>
                  <Image
                    className="w-47.5 h-84.75 object-cover object-center md:w-60 md:h-107"
                    src={image}
                    width={190}
                    height={339}
                    alt={index}
                  />
                </div>
              ))
            ) : (
              <div className="w-47.5 h-84.75 md:w-60 md:h-107">
                <Image
                  className="w-47.5 h-84.75 md:w-60 md:h-107 object-cover object-center"
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
            className="mb-2.5 font-text text-sm md:text-base text-red-500"
            name="images"
            component="div"
          />
          <label className="mb-4 flex flex-col gap-1 font-text font-bold">
            Кол-во:
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
          <label className="mb-4 flex flex-col gap-1 font-text font-bold">
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
            aria-label="Добавить товар"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Сохранение" : "Сохранить товар"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
// .box {
//   margin-bottom: 15px;

//   display: flex;
//   flex-wrap: wrap;
//   justify-content: flex-start;
//   gap: 30px;
// }

// .categoryLabel {
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   font-size: var(--font-size-footer);
//   font-family: var(--font-nunito-regular);
// }

// .optionBox {
//   margin-bottom: 15px;

//   width: 100%;

//   display: flex;
//   justify-content: flex-start;
//   gap: 20px;
// }

// .thumb {
//   width: 210px;
//   height: 196px;
// }

// @media screen and (min-width: 768px) {
//   .optionBox {
//     width: 360px;
//   }

//   .thumb {
//     width: 250px;
//     height: 232px;
//   }
