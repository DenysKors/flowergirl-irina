import { cache } from "react";
import { webhookCallback } from "grammy";

import dbConnect from "./connectDB";
import PlantsCategories from "@/modelsDB/plantsCategories";
import Plant from "../modelsDB/plant";

import { bot } from "@/services/telegram";
import { PRODUCT_PAGINATION_LIMIT } from "../constants/pagination";

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

  bot.api.sendMessage(chat_id, "You have an order");
  console.log({
    userName,
    userPhone,
    userRegion,
    userTown,
    userPostcode,
    userComment,
    userProducts,
    totalPrice,
  });
  return "";
};

export default webhookCallback(bot, "next-js");
