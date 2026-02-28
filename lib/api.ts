import { cache } from "react";
import { convert } from "telegram-markdown-v2";

import dbConnect from "./connectDB";
import PlantsCategories from "@/modelsDB/plantsCategories";
import ProtectionCategories from "@/modelsDB/protectionCategories";
import SuppliesCategories from "@/modelsDB/suppliesCategories";
import Plant from "../modelsDB/plant";
import Protection from "@/modelsDB/protection";
import Supplies from "@/modelsDB/supplies";

import { bot } from "@/services/telegram";
import { PRODUCT_PAGINATION_LIMIT } from "../constants/pagination";
import { BasketProduct, Product } from "@/types/types";
import { uploadImage } from "@/lib/cloudinaryUpload";
import { deleteImage } from "@/lib/cloudinaryDelete";

export const getAllPlantsCategories = cache(async () => {
  await dbConnect();
  try {
    const plantsCategoriesData = await PlantsCategories.find({}, { _id: 0 })
      .sort({
        label: 1,
      })
      .lean();
    const plantsCategories = JSON.parse(JSON.stringify(plantsCategoriesData));
    return plantsCategories;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
});

export const getPlants = async (
  category: string | string[],
  page: string | string[]
) => {
  const paginationPage = Number(page);
  const skip = (paginationPage - 1) * PRODUCT_PAGINATION_LIMIT;
  await dbConnect();
  if (category === "") {
    try {
      const plants = await Plant.find({}, "", {
        skip,
        limit: PRODUCT_PAGINATION_LIMIT,
      })
        .sort({ title: 1 })
        .lean();

      const totalAmount = await Plant.countDocuments().lean();
      const plantsData = JSON.parse(
        JSON.stringify({
          plants,
          totalAmount,
        })
      );

      return plantsData;
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
      else {
        console.log(err);
      }
    }
  } else {
    try {
      const plants = await Plant.find(
        {
          $or: [{ "category.value": { $in: category } }],
        },
        "",
        {
          skip,
          limit: PRODUCT_PAGINATION_LIMIT,
        }
      )
        .sort({ title: 1 })
        .lean();

      const totalAmount = await Plant.countDocuments({
        $or: [{ "category.value": { $in: category } }],
      }).lean();
      const plantsData = JSON.parse(
        JSON.stringify({
          plants,
          totalAmount,
        })
      );

      return plantsData;
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
      else {
        console.log(err);
      }
    }
  }
};

export const getPlantByCode = cache(async (id: string) => {
  await dbConnect();
  try {
    const plant = await Plant.findOne({ code: id });
    return plant;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
});

export const getAllProtectionCategories = cache(async () => {
  await dbConnect();
  try {
    const protectionCategoriesData = await ProtectionCategories.find(
      {},
      { _id: 0 }
    )
      .sort({
        label: 1,
      })
      .lean();
    const protectionCategories = JSON.parse(
      JSON.stringify(protectionCategoriesData)
    );
    return protectionCategories;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
});

export const getProtection = async (
  category: string | string[],
  page: string | string[]
) => {
  const paginationPage = Number(page);
  const skip = (paginationPage - 1) * PRODUCT_PAGINATION_LIMIT;
  await dbConnect();
  if (category === "") {
    try {
      const protection = await Protection.find({}, "", {
        skip,
        limit: PRODUCT_PAGINATION_LIMIT,
      })
        .sort({ title: 1 })
        .lean();

      const totalAmount = await Protection.countDocuments().lean();
      const protectionData = JSON.parse(
        JSON.stringify({
          protection,
          totalAmount,
        })
      );

      return protectionData;
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
      else {
        console.log(err);
      }
    }
  } else {
    try {
      const protection = await Protection.find(
        {
          $or: [{ "category.value": { $in: category } }],
        },
        "",
        {
          skip,
          limit: PRODUCT_PAGINATION_LIMIT,
        }
      )
        .sort({ title: 1 })
        .lean();

      const totalAmount = await Protection.countDocuments({
        $or: [{ "category.value": { $in: category } }],
      }).lean();
      const protectionData = JSON.parse(
        JSON.stringify({
          protection,
          totalAmount,
        })
      );

      return protectionData;
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
      else {
        console.log(err);
      }
    }
  }
};

export const getProtectionByCode = cache(async (id: string) => {
  await dbConnect();
  try {
    const protection = await Protection.findOne({ code: id });
    return protection;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
});

export const getAllSuppliesCategories = cache(async () => {
  await dbConnect();
  try {
    const suppliesCategoriesData = await SuppliesCategories.find({}, { _id: 0 })
      .sort({
        label: 1,
      })
      .lean();
    const suppliesCategories = JSON.parse(
      JSON.stringify(suppliesCategoriesData)
    );
    return suppliesCategories;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
});

export const getSupplies = async (
  category: string | string[],
  page: string | string[]
) => {
  const paginationPage = Number(page);
  const skip = (paginationPage - 1) * PRODUCT_PAGINATION_LIMIT;
  await dbConnect();
  if (category === "") {
    try {
      const supplies = await Supplies.find({}, "", {
        skip,
        limit: PRODUCT_PAGINATION_LIMIT,
      })
        .sort({ title: 1 })
        .lean();

      const totalAmount = await Supplies.countDocuments().lean();
      const suppliesData = JSON.parse(
        JSON.stringify({
          supplies,
          totalAmount,
        })
      );

      return suppliesData;
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
      else {
        console.log(err);
      }
    }
  } else {
    try {
      const supplies = await Supplies.find(
        {
          $or: [{ "category.value": { $in: category } }],
        },
        "",
        {
          skip,
          limit: PRODUCT_PAGINATION_LIMIT,
        }
      )
        .sort({ title: 1 })
        .lean();

      const totalAmount = await Supplies.countDocuments({
        $or: [{ "category.value": { $in: category } }],
      }).lean();
      const suppliesData = JSON.parse(
        JSON.stringify({
          supplies,
          totalAmount,
        })
      );

      return suppliesData;
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
      else {
        console.log(err);
      }
    }
  }
};

export const getSuppliesByCode = cache(async (id: string) => {
  await dbConnect();
  try {
    const supplies = await Supplies.findOne({ code: id });
    return supplies;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
});

export const addOrder = async (orderData: FormData) => {
  const chat_id: string = process.env.BOT_CHAT_ID || "";

  const userName = orderData.get("name") as string;
  const userPhone = orderData.get("phone") as string;
  const userRegion = orderData.get("region") as string;
  const userTown = orderData.get("town") as string;
  const userPostcode = orderData.get("postcode") as string;
  const userComment = orderData.get("comment") as string;
  const productData = orderData.get("products") as string;
  const totalPriceData = orderData.get("totalPrice") as string;
  const userProducts: BasketProduct[] = JSON.parse(productData);
  const totalPrice: number = JSON.parse(totalPriceData);

  await dbConnect();

  const productsAmount = userProducts.length;

  for (let i = 0; i < productsAmount; i += 1) {
    const { code, userQty } = userProducts[i];

    if (code.charAt(0) === "1") {
      const plant = await Plant.findOne({ code });
      let updatedQty = plant.qty - userQty;
      if (updatedQty < 0) updatedQty = 0;
      await Plant.updateOne({ code }, { qty: updatedQty });
    } else if (code.charAt(0) === "2") {
      const protection = await Protection.findOne({ code });
      let updatedQty = protection.qty - userQty;
      if (updatedQty < 0) updatedQty = 0;
      await Protection.updateOne({ code }, { qty: updatedQty });
    } else if (code.charAt(0) === "3") {
      const supplies = await Supplies.findOne({ code });
      let updatedQty = supplies.qty - userQty;
      if (updatedQty < 0) updatedQty = 0;
      await Supplies.updateOne({ code }, { qty: updatedQty });
    }
  }

  const parsedProducts = userProducts.reduce(
    (prev: string, product: BasketProduct, idx: number) => {
      return (
        prev +
        `${idx + 1}.${product.title}
    - арт.${product.code}
    - кол-во: ${product.userQty}
    - цена: ${product.price}грн
    - сумма: ${product.sumPrice}грн
     `
      );
    },
    ""
  );

  const orderMarkdown = `
  # Новый заказ
  ${parsedProducts}
  # Всего: ${totalPrice}грн
  Фамилия, имя: ${userName}
  Моб.: ${userPhone}
  Область: ${userRegion}
  Город: ${userTown}
  Номер отделения: ${userPostcode}
  Комментарий: ${userComment}
  `;
  const telegramMarkdown = convert(orderMarkdown);

  try {
    bot.api.sendMessage(chat_id, telegramMarkdown, {
      parse_mode: "MarkdownV2",
    });
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
};

// Add search from other collections

export const getSearchedProducts = async (
  userSearchQuery: string,
  page: string | string[]
) => {
  const paginationPage = Number(page);
  const skip = (paginationPage - 1) * PRODUCT_PAGINATION_LIMIT;
  await dbConnect();

  try {
    const products = await Plant.find(
      {
        $text: { $search: userSearchQuery },
      },
      "",
      {
        skip,
        limit: PRODUCT_PAGINATION_LIMIT,
      }
    )
      .collation({ locale: "uk", strength: 1 })
      .sort({ title: 1 })
      .lean();

    const totalAmount = await Plant.countDocuments({
      $text: { $search: userSearchQuery },
    }).collation({ locale: "uk", strength: 1 });

    const productsData = JSON.parse(
      JSON.stringify({
        products,
        totalAmount,
      })
    );
    return productsData;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
};

export const getAnalytics = async () => {
  await dbConnect();
  try {
    const plantsAmount = await Plant.countDocuments();
    const protectionAmount = await Protection.countDocuments();
    const suppliesAmount = await Supplies.countDocuments();
    return {
      plantsAmount,
      protectionAmount,
      suppliesAmount,
    };
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */

export const addProduct = async (productData: FormData) => {
  const productType = productData.get("productType") as string;
  const title = productData.get("title") as string;
  const description = productData.get("description") as string;
  const categoryStr = productData.get("category") as string;
  const category = JSON.parse(categoryStr);
  const images = productData.getAll("image");
  const qty = Number(productData.get("qty"));
  const price = Number(productData.get("price"));

  const imagesAmount = images.length;
  const ImgIdArray: string[] = [];

  let code = "";
  if (productType === "plant") {
    code = `1-${Date.now().toString().slice(-4)}`;
  } else if (productType === "protection") {
    code = `2-${Date.now().toString().slice(-4)}`;
  } else if (productType === "supplies") {
    code = `3-${Date.now().toString().slice(-4)}`;
  }

  for (let i = 0; i < imagesAmount; i += 1) {
    const file: any = images[i];

    if (
      !(
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      )
    ) {
      throw new Error("Invalid File Type");
    }

    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;
    const cloudinaryImgId = (await uploadImage(fileUri)) as string;
    ImgIdArray.push(cloudinaryImgId);
  }

  const product: Product = {
    code,
    title,
    description,
    category,
    imagesUrl: ImgIdArray,
    qty,
    price,
  };

  await dbConnect();

  try {
    if (productType === "plant") {
      const createdProduct = await Plant.create(product);
      return createdProduct;
    } else if (productType === "protection") {
      const createdProduct = await Protection.create(product);
      return createdProduct;
    } else if (productType === "supplies") {
      const createdProduct = await Supplies.create(product);
      return createdProduct;
    }
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
};

export const addCategory = async (categoryData: FormData) => {
  const categoryType = categoryData.get("categoryType") as string;
  const categoryStr = categoryData.get("category") as string;
  const category = JSON.parse(categoryStr);

  await dbConnect();
  try {
    if (categoryType === "plant") {
      const createdCategory = await PlantsCategories.create(category);
      return createdCategory;
    } else if (categoryType === "protection") {
      const createdCategory = await ProtectionCategories.create(category);
      return createdCategory;
    } else if (categoryType === "supplies") {
      const createdCategory = await SuppliesCategories.create(category);
      return createdCategory;
    }
  } catch (err: any) {
    if (err?.code === 11000) {
      throw new Error("Категория уже существует");
    } else console.log(err);
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */

export const deleteCategory = async (categoryData: {
  productType: string;
  categoryLabel: string;
}) => {
  const { productType, categoryLabel } = categoryData;

  await dbConnect();

  if (productType === "plant") {
    const totalAmount = await Plant.countDocuments({
      $or: [{ "category.label": { $in: categoryLabel } }],
    }).lean();

    if (totalAmount > 0) {
      throw new Error(
        `В данной категории есть ${totalAmount} товара. Удаление невозможно.`
      );
    }

    const deletedCategory = await PlantsCategories.deleteOne({
      label: categoryLabel,
    });
    return deletedCategory;
  } else if (productType === "protection") {
    const totalAmount = await Protection.countDocuments({
      $or: [{ "category.label": { $in: categoryLabel } }],
    }).lean();

    if (totalAmount > 0) {
      throw new Error(
        `В данной категории есть ${totalAmount} товар(а). Удаление невозможно.`
      );
    }

    const deletedCategory = await ProtectionCategories.deleteOne({
      label: categoryLabel,
    });
    return deletedCategory;
  } else if (productType === "supplies") {
    const totalAmount = await Supplies.countDocuments({
      $or: [{ "category.label": { $in: categoryLabel } }],
    }).lean();

    if (totalAmount > 0) {
      throw new Error(
        `В данной категории есть ${totalAmount} товар(а). Удаление невозможно.`
      );
    }

    const deletedCategory = await SuppliesCategories.deleteOne({
      label: categoryLabel,
    });
    return deletedCategory;
  }
};

export const deleteProduct = async ({
  productType,
  code,
}: {
  productType: string;
  code: string;
}) => {
  await dbConnect();

  if (productType === "plant") {
    const product = await Plant.findOne({ code });

    if (!product) return { deletedCount: 0 };

    const { imagesUrl } = product;

    await deleteImage(imagesUrl);

    const result = await Plant.deleteOne({ code });
    return result;
  } else if (productType === "protection") {
    const product = await Protection.findOne({ code });

    if (!product) return { deletedCount: 0 };

    const { imagesUrl } = product;

    await deleteImage(imagesUrl);

    const result = await Protection.deleteOne({ code });
    return result;
  } else if (productType === "supplies") {
    const product = await Supplies.findOne({ code });

    if (!product) return { deletedCount: 0 };

    const { imagesUrl } = product;

    await deleteImage(imagesUrl);

    const result = await Supplies.deleteOne({ code });
    return result;
  }
};

export const getProductByCode = async (code: string) => {
  await dbConnect();

  if (code.charAt(0) === "1") {
    const plant = await Plant.findOne({ code });
    return plant;
  } else if (code.charAt(0) === "2") {
    const protection = await Protection.findOne({ code });
    return protection;
  } else if (code.charAt(0) === "3") {
    const supplies = await Supplies.findOne({ code });
    return supplies;
  } else return null;
};

export const updateProduct = async (productData: {
  code: string;
  price: number;
  qty: number;
}) => {
  const { code, price, qty } = productData;
  await dbConnect();

  if (code.charAt(0) === "1") {
    const updatedProduct = await Plant.updateOne({ code }, { price, qty });
    return updatedProduct;
  } else if (code.charAt(0) === "2") {
    const updatedProduct = await Protection.updateOne({ code }, { price, qty });
    return updatedProduct;
  } else if (code.charAt(0) === "3") {
    const updatedProduct = await Supplies.updateOne({ code }, { price, qty });
    return updatedProduct;
  }
};
