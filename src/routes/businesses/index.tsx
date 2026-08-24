import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/businesses/")({
  beforeLoad: () => {
    throw redirect({ to: "/portfolio", statusCode: 301 });
  },
});
