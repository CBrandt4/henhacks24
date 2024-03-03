"use client";
import { PecsItem } from "@/lib/schema/pecs-item";
import { useState } from "react";
import { TextInputProps } from "../input-props";
import { CategoryWithPecsItems } from "@/lib/database/categories";
import PecsItemCard from "./pecs-item-card";
import PecsItemGridDisplay from "./pecs-grid-display";

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
      <div className="w-full p-6">
        <div className="flex w-full items-center justify-start gap-4 rounded-[1.75rem] border-2 border-border p-1">
          {sentenceItems.map((item) => (
            <PecsItemCard key={item.id} item={item} />
          ))}
        </div>
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
