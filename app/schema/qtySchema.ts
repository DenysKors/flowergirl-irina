import * as Yup from "yup";

export const qtySchema = Yup.number()
  .typeError("Введите число")
  .integer("Количество должно быть целым числом")
  .moreThan(-1, "Количество больше 0 или 0")
  .required("Количество обязательно");
