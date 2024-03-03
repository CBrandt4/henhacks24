"use client";

import SentenceCompletion from "@/components/inputs/textbox-input";
import { trpc } from "@/lib/trpc/trpc_client";
import { useCallback } from "react";

export default function Page() {
  const completer = trpc.generative.completeSentence.useMutation();

  return (
    <SentenceCompletion
      inputHandler={(sentence: string) =>
        completer.mutate(sentence, {
          onSuccess: (result) => console.log(result),
          onError: (error) => console.error(error),
        })
      }
    />
  );
}
