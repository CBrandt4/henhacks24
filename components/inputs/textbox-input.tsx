"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { trpc } from "@/lib/trpc/trpc_client";
import { TextInputProps } from "./input-props";

export default function SentenceCompletion({ inputHandler }: TextInputProps) {
  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <Input
        type="text"
        placeholder="Type a sentence"
        onBlur={(e) => {
          inputHandler(e.target.value);
        }}
      />
    </div>
  );
}
