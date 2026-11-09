import { Suspense } from "react";

import SuccessPrepaidOrder from "@/components/SuccessPrepaidOrder/SuccessPrepaidOrder";

export default function SuccessOrderPage() {
  return (
    <main className="container py-6">
      <Suspense>
        <SuccessPrepaidOrder />
      </Suspense>
    </main>
  );
}
