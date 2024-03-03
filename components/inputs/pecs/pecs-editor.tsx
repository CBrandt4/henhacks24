"use client";
import { PecsItem } from "@/lib/schema/pecs-item";
import { useState } from "react";
import { TextInputProps } from "../input-props";
import { CategoryWithPecsItems } from "@/lib/database/categories";
import PecsItemCard from "./pecs-item-card";
import PecsItemGridDisplay from "./pecs-grid-display";
import { Button } from "@/components/ui/button";
import { SendHorizontalIcon, Trash2Icon } from "lucide-react";

export default function PecsEditor({
  items,
  homescreen,
  inputHandler,
}: {
  items: CategoryWithPecsItems[];
  homescreen: PecsItem[];
} & TextInputProps) {
  const [sentenceItems, setSentenceItems] = useState<PecsItem[]>([]);
  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <div className="flex h-32 w-full items-center justify-between gap-2 p-6 pb-0">
        <div className="flex size-full items-center justify-start gap-2 overflow-x-clip rounded-[1.75rem] border-2 border-border p-1">
          {sentenceItems.map((item) => (
            <PecsItemCard key={item.id} item={item} />
          ))}
        </div>
        <Button
          variant="destructive"
          icon={<Trash2Icon />}
          className="aspect-square h-32 grow"
          onClick={() => setSentenceItems([])}
        >
          Clear
        </Button>
        <Button
          variant="default"
          icon={<SendHorizontalIcon />}
          className="aspect-square h-32 grow"
          onClick={() => setSentenceItems([])}
        >
          Submit
        </Button>
      </div>
      <PecsItemGridDisplay
        items={items}
        homescreen={homescreen}
        itemClicked={(item: PecsItem) => {
          setSentenceItems([...sentenceItems, item]);
        }}
      />
    </div>
  );
}
