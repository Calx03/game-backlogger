import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad(ctx) {
    if (!ctx.context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth/login",
      });
    }
  },
});

function Index() {
  return (
    <div className="p-2">
      <h3>Index</h3>
    </div>
  );
}
