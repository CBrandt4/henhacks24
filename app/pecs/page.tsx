"use client";

import PecsInput from "@/components/inputs/pecs-input";
import { textToSpeech } from "@/lib/chatgpt";
import { trpc } from "@/lib/trpc/trpc_client";
import { useEffect } from "react";

export default function Page() {
  const completer = trpc.generative.completeSentence.useMutation();
  const textToSpeech = trpc.generative.textToSpeech.useMutation();

  return (
    <PecsInput
      inputHandler={(sentence: string) =>
        completer.mutate(sentence, {
          onSuccess: (result) =>
            textToSpeech.mutate("Hello from chatgpt", {
              onSuccess: (audioUrl) => {
                new Audio(audioUrl).play();
              },
              onError: (error) => console.error(error),
            }),
          onError: (error) => console.error(error),
        })
      }
    />
  );
}
