'use client'

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 30 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onSuccess: (query) => {
        return query;
      },
      onError: (error) => {
        const isDev = process.env.NODE_ENV === 'development';
        if (isDev) {
          console.log(`🚫 Query error: `, {
            message: error?.message,
            stack: error?.stack,
          });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        const isDev = process.env.NODE_ENV === 'development';
        if (isDev) {

          console.log(`🚫 Mutation error: `, {
            message: error?.message,
            stack: error?.stack,
          });
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
