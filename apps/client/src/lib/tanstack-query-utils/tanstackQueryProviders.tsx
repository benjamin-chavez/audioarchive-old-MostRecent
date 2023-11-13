// apps/client/src/components/providers.tsx

'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

// const queryClient = new QueryClient();

export default function TanstackQueryProviders({ children }: LayoutProps) {
  // const [client] = useState(new QueryClient());
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider
      // client={queryClient}
      // client={client}
      client={queryClient}
    >
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
