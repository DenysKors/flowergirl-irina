"use client";

export default function ClientOrderDate({ createdAt }: { createdAt: Date }) {
  return (
    <span>
      {new Intl.DateTimeFormat("uk-UA", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(createdAt))}
    </span>
  );
}
