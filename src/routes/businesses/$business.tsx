import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/businesses/$business")({
  beforeLoad: () => {
    throw redirect({ to: "/portfolio" });
  },
});
