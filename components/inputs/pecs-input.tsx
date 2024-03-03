"use client";

import { listCategories } from "@/lib/database/categories";
import PecsEditor from "./pecs/pecs-editor";
import { TextInputProps } from "./input-props";
import { trpc } from "@/lib/trpc/trpc_client";
import { Alert } from "../ui/alert";

export default function PecsInput({ inputHandler }: TextInputProps) {
  const categories = trpc.categories.list.useQuery();
  const homescreen = trpc.pecsItems.homescreen.useQuery();

  if (categories.data && homescreen.data) {
    return (
      <PecsEditor
        items={categories.data}
        homescreen={homescreen.data}
        inputHandler={inputHandler}
      />
    );
  } else if (categories.error || homescreen.error) {
    return (
      <div>
        {categories.error ? (
          <Alert variant="destructive">Error: {categories.error.message}</Alert>
        ) : null}
        {homescreen.error ? (
          <Alert variant="destructive">Error: {homescreen.error.message}</Alert>
        ) : null}
      </div>
    );
  } else {
    return <Alert>Loading...</Alert>;
  }
}
