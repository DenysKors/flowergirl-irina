"use client";

import * as Yup from "yup";
import toast from "react-hot-toast";

import { useState, useRef } from "react";

import { qtySchema } from "@/app/schema/qtySchema";

type QtyCellProps = {
  id: number;
  value: number;
  onBlur: (id: number, qty: number, onDone: () => void) => void;
  isFetching?: boolean;
};

export function TableQtyCell({ id, value, onBlur, isFetching }: QtyCellProps) {
  const [draft, setDraft] = useState<string | null>(null); // null = не редактируем
  const cancelled = useRef(false);

  const record = () => {
    if (cancelled.current) {
      cancelled.current = false;
      setDraft(null);
      return;
    }
    if (draft === null) return;

    try {
      const qty = qtySchema.validateSync(draft);
      if (qty !== value) {
        onBlur(id, qty, () => setDraft(null));
        return;
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) toast.error(err.message);
    }
    setDraft(null);
  };
  // const [userQty, setUserQty] = useState(value?.toString() ?? "");

  // useEffect(() => {
  //   setUserQty(value?.toString() ?? "");
  // }, [value]);

  // const record = () => {
  //   try {
  //     const qty = qtySchema.validateSync(userQty);
  //     if (qty !== value) onBlur(id, qty, () => setUserQty(value.toString()));
  //   } catch (err) {
  //     if (err instanceof Yup.ValidationError) {
  //       toast.error(err.message);
  //     }
  //     setUserQty(value.toString());
  //   }
  // };

  return (
    <input
      id={id.toString()}
      type="number"
      min={0}
      value={draft ?? String(value)}
      disabled={isFetching}
      className="min-w-8 max-w-20 field-sizing-content text-center hover:border hover:rounded"
      onChange={(e) => setDraft(e.target.value)}
      onBlur={record}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
    />
  );
}
