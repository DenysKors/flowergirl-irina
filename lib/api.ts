import { cache } from "react";
import { convert } from "telegram-markdown-v2";

import dbConnect from "./connectDB";
import PlantsCategories from "@/modelsDB/plantsCategories";
import Plant from "../modelsDB/plant";

import { bot } from "@/app/bot";
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

  if (category === "") {
    await dbConnect();
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
    await dbConnect();
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
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
};
