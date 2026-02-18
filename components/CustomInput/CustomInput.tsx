import { forwardRef } from "react";

type CustomInputProps = {
  label: string;
};

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label }, forwardedRef) => {
    return (
      <>
        <label
          className="flex flex-col font-text text-base"
          htmlFor="custom-input"
        >
          {label}
        </label>
        <input
          ref={forwardedRef}
          id="custom-input"
          className="w-full md:w-80 outline-none focus:outline-none font-text text-text text-base bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
          type="tel"
          name="phone"
          required
          maxLength={20}
        />
      </>
    );
  }
);
CustomInput.displayName = "CustomInput";
