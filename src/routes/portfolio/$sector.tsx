import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio/$sector")({
  beforeLoad: () => {
    throw redirect({ to: "/portfolio" });
  },
});
