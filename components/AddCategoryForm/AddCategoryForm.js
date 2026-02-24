"use client";

// import toast from "react-hot-toast";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";

// const initialValues = {
//   label: "",
//   value: "",
// };

// const stoneSchema = Yup.object().shape({
//   label: Yup.string()
//     .max(25, "Название слишком длинное")
//     .matches(
//       /^[а-яієїґ'()\s]+$/,
//       "Только маленькие буквы, между словами используйте пробел"
//     )
//     .required("Название обязательно"),
//   value: Yup.string()
//     .max(25, "Значение слишком длинное")
//     .matches(
//       /^[a-z\-]+$/,
//       "Только маленькие буквы, вместо пробелов используйте тире"
//     )
//     .required("Значение обязательно"),
// });

export default function AddCategoryForm({ productCategories }) {
  // const handleSubmit = async (values, { resetForm }) => {
  //   const stoneData = {
  //     name: values.name.trim(),
  //     value: values.value.trim(),
  //   };

  //   const response = await fetch("/api/add-stone", {
  //     method: "POST",
  //     body: JSON.stringify(stoneData),
  //   });
  //   if (response.ok) {
  //     resetForm();
  //     toast.success("Камінь збережений");
  //   } else if (response.status === 422) {
  //     const message = await response.json();
  //     toast.error(message);
  //   } else toast.error("Помилка при збереженні, повторіть знову");
  // };

  //   return (
  //     <Formik
  //       initialValues={initialValues}
  //       validationSchema={stoneSchema}
  //       onSubmit={handleSubmit}
  //     >
  //       {({ isSubmitting }) => (
  //         <Form>
  //           <label className={styles.lable}>
  //             Назва (українською):
  //             <Field
  //               className={styles.textField}
  //               type="text"
  //               name="name"
  //               maxLength="25"
  //             />
  //           </label>
  //           <ErrorMessage className={styles.error} name="name" component="div" />
  //           <label className={styles.lable}>
  //             Значення (переклад назви англійською):
  //             <Field
  //               className={styles.textField}
  //               type="text"
  //               name="value"
  //               maxLength="25"
  //             />
  //           </label>
  //           <ErrorMessage className={styles.error} name="value" component="div" />
  //           <button
  //             className={styles.button}
  //             type="submit"
  //             aria-label="add stone"
  //             disabled={isSubmitting}
  //           >
  //             Зберегти камінь
  //           </button>
  //         </Form>
  //       )}
  //     </Formik>
  //   );
  return "";
}
