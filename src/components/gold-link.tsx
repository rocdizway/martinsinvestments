import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  to: string;
  children: ReactNode;
  variant?: "solid" | "outline";
};

export function GoldLink({ to, variant = "solid", children }: Props) {
  const base =
    "group inline-flex items-center gap-3 px-8 py-4 text-[0.75rem] tracking-[0.2em] uppercase transition-all duration-500";
  const styles =
    variant === "solid"
      ? "bg-gold text-gold-foreground hover:bg-gold-soft"
      : "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10";

  return (
    <Link to={to as never} className={`${base} ${styles}`}>
      {children}
      <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}
