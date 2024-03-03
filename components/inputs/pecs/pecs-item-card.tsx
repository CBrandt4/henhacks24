"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PecsItem } from "@/lib/schema/pecs-item";
import Image from "next/image";

export default function PecsItemCard({
  item,
  itemClicked,
}: {
  item: PecsItem;
  itemClicked?: (item: PecsItem) => void;
}) {
  return (
    <Card
      className="flex size-32 flex-col p-2"
      onClick={() => itemClicked?.(item)}
    >
      <CardContent className="relative grow p-0">
        <Image
          fill
          src={"/400.svg"}
          alt={item.word}
          className="max-h-32 max-w-32"
        />
      </CardContent>
      <CardFooter className="justify-center p-0">
        <p>{item.word}</p>
      </CardFooter>
    </Card>
  );
}
