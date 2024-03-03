"use client";

import { trpc } from "@/lib/trpc/trpc_client";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { TextInputProps } from "./input-props";
import PecsEditor from "./pecs/pecs-editor";

export default function PecsInput({ inputHandler }: TextInputProps) {
  const [categories, homescreen] = trpc.useQueries((t) => [
    t.categories.list(),
    t.pecsItems.homescreen(),
  ]);

  if (categories.status === "pending" || homescreen.status === "pending") {
    return (
      <div className="flex p-24">
        <Alert>
          <AlertTitle>Loading...</AlertTitle>
        </Alert>
      </div>
    );
  }
  if (categories.status === "error" || homescreen.status === "error") {
    return (
      <div className="flex p-24">
        {categories.error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{categories.error.message}</AlertDescription>
          </Alert>
        ) : null}
        {homescreen.error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{homescreen.error.message}</AlertDescription>
          </Alert>
        ) : null}
      </div>
    );
  }

  return (
    <PecsEditor
      items={categories.data}
      homescreen={homescreen.data}
      inputHandler={inputHandler}
    />
  );
}
