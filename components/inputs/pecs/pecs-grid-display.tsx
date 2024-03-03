"use client";

import { CategoryWithPecsItems } from "@/lib/database/categories";
import PecsCategoryCard from "./pecs-category-card";
import PecsItemCard from "./pecs-item-card";
import { useEffect, useState } from "react";
import { Category } from "@/lib/schema/category";
import { PecsItem } from "@/lib/schema/pecs-item";

export default function PecsItemGridDisplay({
  items,
  homescreen,
  itemClicked,
}: {
  items: CategoryWithPecsItems[];
  homescreen: PecsItem[];
  itemClicked: (item: PecsItem) => void;
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
    <div className="grid w-full grid-cols-7 grid-rows-3 items-center justify-center gap-4 p-6">
      {selectedItems.slice(0, 18).map((item) => (
        <div key={item.id} className="flex justify-center">
          <PecsItemCard item={item} itemClicked={itemClicked} />
        </div>
      ))}

      <div className="items-around col-auto col-end-8 row-span-4 row-start-1 grid grid-rows-subgrid justify-center gap-4">
        {!!category ? (
          <PecsCategoryCard
            category={{
              id: -1,
              name: "Back",
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
