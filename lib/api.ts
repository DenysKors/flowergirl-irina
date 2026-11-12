import slugify from "slugify";
import prisma from "@/lib/prisma";

import { cache } from "react";
import { Prisma, OrderStatus, PaymentType} from "@/prisma/generated/client";
import { uploadProductImage } from "@/lib/cloudinaryUpload";
import { deleteImage } from "@/lib/cloudinaryDelete";
import { PRODUCT_PAGINATION_LIMIT } from "@/constants/pagination";
import { CreateOrderPayload } from "@/types/types";
import { prepaidOrderTemplate } from "@/services/prepaidOrderTemplate";
// import { hashPassword} from "@/lib/utils";
import { verifyPassword } from "@/lib/utils";

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

export const getAllUserSubCats = cache(async () => {
  const [plantsCats, protectionCats, suppliesCats] = await Promise.all([
    prisma.category.findMany({
      where: {
        parentId: 1,
      },
    }),
    prisma.category.findMany({
      where: {
        parentId: 2,
      },
    }),
    prisma.category.findMany({
      where: {
        parentId: 3,
      },
    }),
  ]);
  const plantsCatsSlugArr = plantsCats.map((item) => item.slug);
  const protectionCatsArr = protectionCats.map((item) => item.slug);
  const suppliesCatsArr = suppliesCats.map((item) => item.slug);

  return {
    plantsCatsSlugArr,
    protectionCatsArr,
    suppliesCatsArr,
  };
});

export const getAllUserCategWithSubs = async () => {
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

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getUserFilterProducts = async (
  categories: string[] | [],
  page: number
) => {
  const skip = (page - 1) * PRODUCT_PAGINATION_LIMIT;

  const whereCondiiton: any = { isDeleted: false };

  if (categories.length > 0) {
    whereCondiiton.category = {
      slug: { in: categories },
    };
  }

  const orderByCondition: any = { createdAt: "asc" };

  try {
    const [userProducts, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: whereCondiiton,
        orderBy: orderByCondition,
        take: PRODUCT_PAGINATION_LIMIT,
        skip: skip,
        include: {
          category: true,
        },
      }),
      prisma.product.count({
        where: whereCondiiton,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / PRODUCT_PAGINATION_LIMIT);

    const products = userProducts.map((prod) => ({
      ...prod,
      price: prod.price.toNumber(),
    }));

    return {
      products,
      pagination: { totalCount, totalPages },
    };
  } catch (err) {
    throw err;
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const getUserProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      category: true,
    },
  });

  if (!product || product.isDeleted) return null;

  const serializedProduct = {
    ...product,
    price: product.price.toNumber(),
  };
  return serializedProduct;
};

export const getAdminProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      category: true,
    },
  });

  if (!product || product.isDeleted) return null;

  const serializedProduct = {
    ...product,
    price: product.price.toNumber(),
  };

  return serializedProduct;
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

export const getAdminAnalytics = async () => {
  const [
    totalProducts,
    outOfStockProducts,
    // ordersAmount,
    // newOrders,
  ] = await Promise.all([
    prisma.product.count({
      where: { isDeleted: false },
    }),
    prisma.product.count({
      where: {
        qty: 0,
        isDeleted: false,
      },
    }),
    // prisma.order.count({
    //   where: {
    //     OR: [
    //       {
    //         status: "pending",
    //         paymentType: "postpaid",
    //       },
    //       // {
    //       //   status: "paid",
    //       //   paymentType: "prepaid",
    //       // },
    //       {
    //         status: "pending",
    //         paymentType: "prepaid",
    //       },
    //     ],
    //   },
    // }),
  ]);

  return {
    totalProducts,
    outOfStockProducts,
    // ordersAmount,
    // newOrders,
  };
};

export const getSearchProducts = async (query: string, page: number) => {
  const skip = (page - 1) * PRODUCT_PAGINATION_LIMIT;

  const escaped = query.replace(/[\\%_]/g, "\\$&");
  const pattern = `%${escaped}%`;
  try {
    const where = Prisma.sql`
    isDeleted = 0 AND (
      name LIKE CONVERT(${pattern} USING utf8mb4) COLLATE utf8mb4_unicode_ci
      OR description LIKE CONVERT(${pattern} USING utf8mb4) COLLATE utf8mb4_unicode_ci
    )`;

    const [idRows, countRows] = await Promise.all([
      prisma.$queryRaw<{ id: number }[]>`
      SELECT id FROM products
      WHERE ${where}
      ORDER BY qty DESC, id DESC
      LIMIT ${PRODUCT_PAGINATION_LIMIT} OFFSET ${skip}`,
      prisma.$queryRaw<{ total: bigint }[]>`
      SELECT COUNT(*) AS total FROM products
      WHERE ${where}`,
    ]);

    const totalCount = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.ceil(totalCount / PRODUCT_PAGINATION_LIMIT);

    const userProducts = await prisma.product.findMany({
      where: { id: { in: idRows.map((r) => r.id) } },
      include: { category: true },
      orderBy: [{ qty: "desc" }, { id: "desc" }],
    });

    const products = userProducts.map((prod) => ({
      ...prod,
      price: prod.price.toNumber(),
    }));

    return { products, pagination: { totalCount, totalPages } };

    // const whereCondition = {
    //   isDeleted: false,
    //   OR: [{ name: { contains: query } }, { description: { contains: query } }],
    // };

    // try {
    //   const [userProducts, totalCount] = await Promise.all([
    //     prisma.product.findMany({
    //       where: whereCondition,
    //       include: {
    //         category: true,
    //       },
    //       take: PRODUCT_PAGINATION_LIMIT,
    //       skip: skip,
    //       orderBy: { createdAt: "desc" },
    //     }),
    //     prisma.product.count({ where: whereCondition }),
    //   ]);

    //   const totalPages = Math.ceil(totalCount / PRODUCT_PAGINATION_LIMIT);

    //   const products = userProducts.map((prod) => ({
    //     ...prod,
    //     price: prod.price.toNumber(),
    //   }));

    //   return {
    //     products,
    //     pagination: { totalCount, totalPages },
    //   };
  } catch (err) {
    throw err;
  }
};

export const addOrder = async (order: CreateOrderPayload) => {
  order.products.forEach((prod) => {
    if (prod.qty <= 0) {
      throw new Error(`Некоректна кількість товару ID ${prod.id}`);
    }
  });
  const newPrepaidOrder = await prepaidOrderTemplate(order);
  return newPrepaidOrder;
};

export const getAdminOrders = async (
  query: string,
  page: number,
  limit: number,
  rawStatus: OrderStatus | null
) => {
  const skip = (page - 1) * limit;

  const andConditions: Prisma.OrderWhereInput[] = [];

  if (query) {
    const escaped = query.replace(/[\\%_]/g, "\\$&");
    const pattern = `%${escaped}%`;

    const matched = await prisma.$queryRaw<{ id: number }[]>`
    SELECT id FROM orders
    WHERE publicId          LIKE CONVERT(${pattern} USING utf8mb4) COLLATE utf8mb4_unicode_ci
       OR customerFirstName LIKE CONVERT(${pattern} USING utf8mb4) COLLATE utf8mb4_unicode_ci
       OR customerSurName   LIKE CONVERT(${pattern} USING utf8mb4) COLLATE utf8mb4_unicode_ci
       OR customerPhone     LIKE CONVERT(${pattern} USING utf8mb4) COLLATE utf8mb4_unicode_ci`;

    andConditions.push({ id: { in: matched.map((r) => r.id) } });
  }


  andConditions.push({ paymentType: PaymentType.prepaid });
 
   andConditions.push({
       NOT: [
        {
         status: "pending",
         paymentType: "prepaid",
        },
       ],
    });


  if (rawStatus) {
    andConditions.push({ status: rawStatus as OrderStatus });
  }

  const whereCondition: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  try {
    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where: whereCondition,
        take: limit,
        skip,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      }),
      prisma.order.count({ where: whereCondition }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    return { orders, pagination: { totalCount, totalPages } };
  } catch (err) {
    throw err;
  }
};

export const updateOrderStatus = async (orderData: {
  orderId: string;
  newStatus: OrderStatus;
}) => {
  const id = parseInt(orderData.orderId);

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: orderData.newStatus,
      },
      select: {
        id: true,
        status: true,
      },
    });

    return updatedOrder;
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

export const getAdminOrderById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { publicId: id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) return null;

  const serializedOrder = {
    ...order,
    amount: order.amount.toNumber(),
    items: order.items.map((item) => ({
      ...item,
      price: item.price.toNumber(),
      total: item.total.toNumber(),
      product: {
        ...item.product,
        price: item.product.price.toNumber(),
      },
    })),
  };
  return serializedOrder;
};

export const checkPaidOrderStatus = async (orderReference: string) => {
  const order = await prisma.order.findUnique({
    where: {
      orderRef: orderReference,
    },
    select: {
      status: true,
      publicId: true,
      amount: true,
    },
  });

  if (!order || order.status === "cancelled") {
    throw new Error("Замовлення не знайдено");
  }

  return {
    status: order.status,
    publicId: order.publicId,
    amount: order.amount.toNumber(),
  };
};

// export const createUser = async () => {
//   const adminEmail = "irina.flowergirl@gmail.com";

//   const existingAdmin = await prisma.user.findUnique({
//     where: { email: adminEmail },
//   });

//   if (!existingAdmin) {
//     const hashedPassword = hashPassword("qazwsxedc455");

//     const admin = await prisma.user.create({
//       data: {
//         email: adminEmail,
//         passwordHash: hashedPassword,
//         firstName: "Ірина",
//         surName: "Ляховольська",
//         role: Role.ADMIN,
//         isActive: true,
//       },
//     });
//     console.log(`✅ Единственный администратор успешно создан: ${admin.email}`);
//   }
// };

export const getUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (!user) {
    throw new Error("Логін або пароль вказано невірно");
  }

  const isVerified = verifyPassword(password, user.passwordHash);

  if (!isVerified) {
    throw new Error("Логін або пароль вказано невірно");
  }

  if (!user.isActive) {
    throw new Error("Обліковий запис деактивовано.");
  }

  return {
    firstName: user.firstName,
    surName: user.surName,
    role: user.role,
  };
};