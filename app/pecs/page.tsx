"use client";

import PecsInput from "@/components/inputs/pecs-input";
import { trpc } from "@/lib/trpc/trpc_client";

export default function Page() {
  const completer = trpc.generative.completeSentence.useMutation();

  return (
    <PecsInput
      inputHandler={(sentence: string) =>
        completer.mutate(sentence, {
          onSuccess: (result) => console.log(result),
          onError: (error) => console.error(error),
        })
      }
    />
  );
}
