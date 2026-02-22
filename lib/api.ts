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
import { BasketProduct } from "@/types/types";

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

export const getPlantByCode = cache(async (plantCode: number) => {
  await dbConnect();
  try {
    const plant = await Plant.findOne({ code: plantCode });
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

export const getProtectionByCode = cache(async (protectionCode: number) => {
  await dbConnect();
  try {
    const protection = await Protection.findOne({ code: protectionCode });
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

export const getSuppliesByCode = cache(async (suppliesCode: number) => {
  await dbConnect();
  try {
    const supplies = await Supplies.findOne({ code: suppliesCode });
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
  const userProducts = JSON.parse(productData);
  const totalPrice = JSON.parse(totalPriceData);

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
    // Add logic for decrease product stock quantity!!!!!
    // const updatedProduct = await Product.updateOne(
    //   { code: productData.code },
    //   { price: productData.price, sell_status: productData.sell_status }
    // );
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
};

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
