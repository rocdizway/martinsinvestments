import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & { variant?: "solid" | "outline" };

export function GoldLink({ variant = "solid", children, ...props }: Props) {
  const base =
    "group inline-flex items-center gap-3 px-8 py-4 text-[0.75rem] tracking-[0.2em] uppercase transition-all duration-500";
  const styles =
    variant === "solid"
      ? "bg-gold text-primary-foreground hover:bg-gold-soft"
      : "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10";

  return (
    <Link {...props} className={`${base} ${styles}`}>
      {children}
      <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}
