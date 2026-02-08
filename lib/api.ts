import { cache } from "react";

import dbConnect from "./connectDB";
import PlantsCategories from "@/modelsDB/plantsCategories";

export const getAllPlantsCategories = cache(async () => {
  await dbConnect();
  try {
    const plantsCategoriesData = await PlantsCategories.find(
      {},
      { _id: 0 }
    ).sort({
      label: 1,
    });
    const plantsCategories = JSON.parse(JSON.stringify(plantsCategoriesData));
    return plantsCategories;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    else {
      console.log(err);
    }
  }
});
