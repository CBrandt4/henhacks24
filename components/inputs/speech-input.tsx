"use client";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { MicIcon, MicOffIcon, RefreshCcwIcon } from "lucide-react";
import dynamic from "next/dynamic";
import React, { use, useEffect } from "react";
import { Alert } from "../ui/alert";

// organize-imports-disable-next-line
import "regenerator-runtime/runtime";
// organize-imports-disable-next-line
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { TextInputProps } from "./input-props";

const textVariants = cva("text-base", {
  variants: {
    variant: {
      stopped: "font-bold",
      listening: "italic",
    },
  },
  defaultVariants: {
    variant: "stopped",
  },
});

function SpeechRecognitionComponent({ inputHandler }: TextInputProps) {
  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  useEffect(() => {
    if (finalTranscript) inputHandler(finalTranscript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <Alert variant="destructive">
        Your browser does not support speech recognition. Best results are with
        Chrome or Firefox desktop.
      </Alert>
    );
  } else if (!isMicrophoneAvailable) {
    return <Alert variant="destructive">Microphone is not available</Alert>;
  }

  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <p>Microphone: {listening ? "on" : "off"}</p>
      <div className="flex items-center justify-start gap-4">
        <Button
          variant="default"
          icon={
            listening ? (
              <MicOffIcon className="size-6" />
            ) : (
              <MicIcon className="size-6" />
            )
          }
          onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();
            } else {
              SpeechRecognition.startListening();
            }
          }}
        >
          {listening ? "Stop" : "Start"}
        </Button>
        <Button
          variant="destructive"
          className="group"
          onClick={() => resetTranscript()}
        >
          <RefreshCcwIcon className="size-6 mr-2 duration-500 group-hover:-rotate-[360deg]" />
          Reset
        </Button>
      </div>
      <p
        className={textVariants({
          variant: listening ? "listening" : "stopped",
        })}
      >
        {transcript}
      </p>
    </div>
  );
}

// export it with SSR disabled
const SpeechTranscriber = dynamic(
  () => Promise.resolve(SpeechRecognitionComponent),
  {
    ssr: false,
  }
);
export default SpeechTranscriber;
