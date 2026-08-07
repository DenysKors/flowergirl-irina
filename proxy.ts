// import NextAuth from "next-auth";
import { NextResponse, NextRequest } from "next/server";
// import { authConfig } from "@/app/auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: "/dashboard/:path*",
// };

export function proxy(request: NextRequest) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const { pathname, searchParams } = request.nextUrl;

  // Имя куки и секретное значение (можно вынести в .env)
  const COOKIE_NAME = "bypass_maintenance";
  const SECRET_TOKEN = process.env.MAINTENANCE_TOKEN || "flowergirl123";

  // 1. Исключения для системных файлов Next.js и самой страницы техработ
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Если режим техработ ВЫКЛЮЧЕН — просто удаляем куку (если она была) и пропускаем пользователя
  if (!isMaintenance) {
    if (request.cookies.has(COOKIE_NAME)) {
      const response = NextResponse.next();
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
    return NextResponse.next();
  }

  // 3. Проверяем, есть ли секретный токен в URL (например: ?preview=mysecret123)
  if (searchParams.get("preview") === SECRET_TOKEN) {
    const response = NextResponse.next();
    // Ставим куку на 1 день, чтобы не вводить токен при каждом переходе по страницам
    response.cookies.set(COOKIE_NAME, "true", {
      maxAge: 60 * 60 * 24, // 24 часа
      path: "/",
      httpOnly: true,
      secure: true,
    });
    return response;
  }

  // 4. Проверяем, авторизован ли уже админ через куки
  const hasBypassCookie = request.cookies.get(COOKIE_NAME)?.value === "true";

  // 5. Если техработы включены, а токена или куки нет — показываем заглушку
  if (isMaintenance && !hasBypassCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
