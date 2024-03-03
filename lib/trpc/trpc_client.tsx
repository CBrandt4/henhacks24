"use client";

import { TRPCClientErrorLike, httpBatchLink } from "@trpc/client";
import { AppRouter } from "./trpc_procedures";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import {
  MutateOptions,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "sonner";
import env from "../env/public_env";

export const trpc = createTRPCReact<AppRouter>({});

export default function TrpcProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/v11/ssr
           **/
          url: `${env.NEXT_PUBLIC_TRPC_API_URL}/api`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

export function createQueryToasts<
  TData,
  TError extends TRPCClientErrorLike<any>,
  TVariables,
  TContext,
>(
  loadingText: string = "Executing query...",
  successText: string = "Successfully executed query",
  failureText: string = "An unexpected error occurred",
  options?: MutateOptions<TData, TError, TVariables, TContext>
): MutateOptions<TData, TError, TVariables, TContext> {
  const loading = toast.loading(loadingText);
  return {
    onSettled: (data, error, variables, context) => {
      toast.dismiss(loading);
      options?.onSettled?.(data, error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      try {
        // call success function first so the success message doesn't show if the success function throws an error
        options?.onSuccess?.(data, variables, context);
        toast.success(successText);
      } catch (e) {
        toast.error(failureText, {
          description: e instanceof Error ? e.message : `${e}`,
        });
      }
    },
    onError: (error, variables, context) => {
      toast.error(failureText, {
        description: error.shape.message ?? error.message,
      });
      options?.onError?.(error, variables, context);
    },
  };
}
