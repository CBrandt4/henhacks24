"use client";

import SpeechTranscriber from "@/components/inputs/speech-input";
import { trpc } from "@/lib/trpc/trpc_client";
import { useCallback } from "react";

export default function Page() {
  const completer = trpc.generative.completeSentence.useMutation();

  return (
    <SpeechTranscriber
      inputHandler={(sentence: string) =>
        completer.mutate(sentence, {
          onSuccess: (result) => console.log(result),
          onError: (error) => console.error(error),
        })
      }
    />
  );
}
