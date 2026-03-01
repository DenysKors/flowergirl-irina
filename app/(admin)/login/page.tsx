import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn, auth } from "../../auth";

export default async function LoginPage() {
  const session = await auth();

  if (!!session?.user) return redirect(`/dashboard/analytics`);
  return (
    <main className="mt-10 lg:mt-20 container flex items-center justify-center">
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", formData);
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`/error?error=AccessDenied`);
            } else throw error;
          }
        }}
      >
        <label
          className="mb-5 lg:mb-10 flex flex-col font-text"
          htmlFor="email"
        >
          Email
          <input
            className="w-full md:w-80 outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
            name="email"
            id="email"
          />
        </label>
        <label className="flex flex-col font-text" htmlFor="password">
          Password
          <input
            className="w-full md:w-80 outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
            name="password"
            id="password"
          />
        </label>
        <div className="flex items-center justify-center">
          <button
            className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
            type="submit"
            aria-label="sing-in"
            title="Увійти"
          >
            Увійти
          </button>
        </div>
      </form>
    </main>
  );
}
