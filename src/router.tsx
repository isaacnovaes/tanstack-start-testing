import { QueryClient } from '@tanstack/react-query';
import {
    DefaultGlobalNotFound,
    createRouter as createTanStackRouter,
} from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { routeTree } from '@/routeTree.gen';

export function getRouter() {
    const queryClient = new QueryClient();

    const router = createTanStackRouter({
        routeTree,
        context: { queryClient },
        scrollRestoration: true,
        defaultPreload: 'intent',
        defaultPreloadStaleTime: 0,
        defaultNotFoundComponent: DefaultGlobalNotFound,
    });

    setupRouterSsrQueryIntegration({ router, queryClient });

    return router;
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof getRouter>;
    }
}
