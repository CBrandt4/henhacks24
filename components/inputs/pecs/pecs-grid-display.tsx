"use client";

import { CategoryWithPecsItems } from "@/lib/database/categories";
import PecsCategoryCard from "./pecs-category-card";
import PecsItemCard from "./pecs-item-card";
import { useEffect, useState } from "react";
import { Category } from "@/lib/schema/category";
import { PecsItem } from "@/lib/schema/pecs-item";
import { Button } from "@/components/ui/button";
import { SendHorizontalIcon, Trash2Icon } from "lucide-react";

export default function PecsItemGridDisplay({
  items,
  homescreen,
  itemClicked,
  clearSentenceItems,
  submitSentenceItems,
}: {
  items: CategoryWithPecsItems[];
  homescreen: PecsItem[];
  itemClicked: (item: PecsItem) => void;
  clearSentenceItems: () => void;
  submitSentenceItems: () => void;
}) {
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedItems, setSelectedItems] = useState<PecsItem[]>([]);
  useEffect(() => {
    setSelectedItems(
      category === null
        ? [...homescreen]
        : items
            .find((i) => i.id === category.id)!
            .pecsItemCategories.map((item) => item.pecsItem),
    );
  }, [category, items, homescreen]);
  return (
    <div className="grid grid-cols-4 grid-rows-3 items-center justify-center gap-6 px-6 md:grid-cols-8">
      {selectedItems.slice(0, 18).map((item) => (
        <PecsItemCard key={item.id} item={item} itemClicked={itemClicked} />
      ))}

      <div className="col-span-2 col-end-5 row-span-3 row-start-1 grid grid-cols-subgrid grid-rows-subgrid items-center justify-center gap-4 md:col-end-9">
        <Button
          variant="destructive"
          icon={<Trash2Icon />}
          className="aspect-square h-32 grow rounded-[1.75rem]"
          onClick={() => clearSentenceItems()}
        >
          Clear
        </Button>
        <Button
          variant="default"
          icon={<SendHorizontalIcon />}
          className="aspect-square h-32 grow rounded-[1.75rem]"
          onClick={() => submitSentenceItems()}
        >
          Submit
        </Button>
        {!!category ? (
          <PecsCategoryCard
            category={{
              id: -1,
              name: "Home",
            }}
            categoryClicked={() => setCategory(null)}
          />
        ) : null}
        {items.map((i) => {
          if (category && category.id === i.id) {
            return null;
          } else {
            return (
              <PecsCategoryCard
                key={i.id}
                category={i}
                categoryClicked={setCategory}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
