import type { MetadataRoute } from "next";

import { getAllAdminProdWithCats } from "@/lib/api";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllAdminProdWithCats();
  return [
    { url: "https://www.flowergirl-irina.com" },
    { url: "https://www.flowergirl-irina.com/catalog" },
    ...products.map((p) => ({
      url: `https://www.flowergirl-irina.com/catalog/${p.id}`,
      lastModified: p.updatedAt,
    })),
  ];
}
