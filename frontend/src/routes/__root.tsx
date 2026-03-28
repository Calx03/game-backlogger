import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import '../styles.css';
import { AuthProvider, type AuthInterface } from '#/contexts/authContext';

interface RouteContext {
  auth: AuthInterface;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </AuthProvider>
  );
}
