import slugify from "slugify";
import prisma from "@/lib/prisma";

import { Prisma } from "@/prisma/generated/client";
import { uploadProductImage } from "@/lib/cloudinaryUpload";
import { deleteImage } from "@/lib/cloudinaryDelete";

export const getAllAdminSubCategories = async () => {
  const categories = await prisma.category.findMany({
    where: {
      parentId: {
        not: null,
      },
      isDeleted: false,
    },
  });
  return categories;
};

export const getAllAdminMainCategories = async () => {
  const mainCategories = await prisma.category.findMany({
    where: {
      parentId: null,
      isDeleted: false,
    },
  });
  return mainCategories;
};

export const getAllAdminCatWithSubs = async () => {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
      isDeleted: false,
    },
    include: {
      subCategories: {
        where: { isDeleted: false },
      },
    },
  });
  return categories;
};

export const addCategory = async (categoryData: FormData) => {
  const name = categoryData.get("name") as string;
  const parent = categoryData.get("parent") as string;

  const uppCaseNameLtr = name.charAt(0).toUpperCase();
  const nameWithoutfirstLtr = name.slice(1, name.length);
  const uppCaseName = uppCaseNameLtr.concat("", nameWithoutfirstLtr);

  const slug = slugify(name, {
    replacement: "-",
    lower: true,
    strict: true,
    locale: "uk",
  });

  // Adding more main categories
  // let parentId: number | null = null;
  // let parentCategory: Category | null;

  const parentCategory = await prisma.category.findUnique({
    where: { slug: parent },
  });

  if (!parentCategory || parentCategory.isDeleted) {
    throw new Error(`Категория ${slug} не найдена`);
  }

  // Adding more main categories
  // if (parent !== "main") {
  //   parentCategory = await prisma.category.findUnique({
  //     where: { slug: parent },
  //   });

  //   if (!parentCategory) {
  //     throw new Error(`Категория ${slug} не найдена`);
  //   }

  //   parentId = parentCategory.id;
  // }

  try {
    const newCategory = await prisma.category.create({
      data: {
        name: uppCaseName,
        slug,
        parentId: parentCategory.id,
      },
    });
    return newCategory;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new Error("Такая подкатегория уже существует");
      }
    }
    throw err;
  }
};

export const deleteCategory = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      subCategories: true,
      products: true,
    },
  });

  if (category && category.subCategories.length > 0) {
    throw new Error("У категории есть подкатегории. Удаление невозможно.");
  } else if (category && category.products.length > 0) {
    throw new Error("У категории есть товары. Удаление невозможно.");
  }

  try {
    const deletedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        isDeleted: true,
      },
    });

    return deletedCategory;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        throw new Error("Такая категория/подкатегория не существует.");
      }
    }
    throw err;
  }
};

export const getAllAdminProdWithCats = async () => {
  const products = await prisma.product.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
    },
  });
  return products;
};

export const getAdminProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      category: true,
    },
  });

  if (!product || product.isDeleted) return null;

  return product;
};

export const addProduct = async (productData: FormData) => {
  const name = productData.get("name") as string;
  const description = productData.get("description") as string;
  const categoryId = Number(productData.get("categoryId"));
  const qty = Number(productData.get("qty"));
  const unit = productData.get("unit") as string;
  const price = Number(productData.get("price"));
  const images = productData.getAll("images[]") as File[];

  const imagesAmount = images.length;
  const ImgIdArray: string[] = [];

  for (let i = 0; i < imagesAmount; i += 1) {
    const file = images[i];

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudinaryImageId = (await uploadProductImage(buffer)) as string;
    ImgIdArray.push(cloudinaryImageId);
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        sku: "FI",
        categoryId,
        qty,
        unit,
        price,
        images: ImgIdArray,
      },
    });

    const stringId = String(newProduct.id).padStart(4, "0");
    const formattedSku = `FI-${stringId}`;

    const updatedProduct = await prisma.product.update({
      where: { id: newProduct.id },
      data: {
        sku: formattedSku,
      },
    });
    return updatedProduct;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        await deleteImage(ImgIdArray);
        throw new Error("Товар с таким названием уже существует");
      } else if (err.code === "P2003") {
        await deleteImage(ImgIdArray);
        throw new Error("Подкатегория товара не существует");
      }
    }
    throw err;
  }
};

export const deleteProduct = async (productId: number) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) throw new Error("Такого товара не существует");

  const timestamp = Date.now();

  try {
    const deletedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        isDeleted: true,
        sku: `${product.sku}-deleted-${timestamp}`,
        name: `${product.name} (Удаленный ${timestamp})`,
        images: [],
      },
    });

    await deleteImage(product.images);

    return deletedProduct;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        throw new Error("Такого товара не существует");
      }
    }
    throw err;
  }
};

export const updateProduct = async (productData: FormData) => {
  const id = Number(productData.get("id"));
  const description = productData.get("description") as string;
  const categoryId = Number(productData.get("categoryId"));
  const qty = Number(productData.get("qty"));
  const unit = productData.get("unit") as string;
  const price = Number(productData.get("price"));

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        description,
        categoryId,
        qty,
        unit,
        price,
      },
    });

    return updatedProduct;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        throw new Error("Такого товара не существует");
      } else if (err.code === "P2002") {
        throw new Error("Обновление уникального поля невозможно");
      }
    }
    throw err;
  }
};
