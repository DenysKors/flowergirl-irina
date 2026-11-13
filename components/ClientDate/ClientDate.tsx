"use client";

type clientDateProps = {
  date: Date;
  className?: string;
}

export default function ClientDate({ date, className }: clientDateProps) {
  return (
    <span className={className}>
      {new Intl.DateTimeFormat("uk-UA", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date(date))}
    </span>
  );
}
