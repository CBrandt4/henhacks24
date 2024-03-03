"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PecsItem } from "@/lib/schema/pecs-item";
import Image from "next/image";
import { useState } from "react";

export default function PecsItemCard({
  item,
  itemClicked,
}: {
  item: PecsItem;
  itemClicked?: (item: PecsItem) => void;
}) {
  const [src, setSrc] = useState<string>("/images/" + item.word + ".png");
  return (
    <Card
      className="flex size-32 shrink-0 flex-col p-2 hover:opacity-80"
      onClick={() => itemClicked?.(item)}
    >
      <CardContent className="relative grow p-0">
        <Image
          fill
          src={src}
          alt={item.word}
          className="max-h-32 max-w-32"
          onError={() => setSrc("/images/placeholder.svg")}
        />
      </CardContent>
      <CardFooter className="justify-center p-0">
        <p>{item.word}</p>
      </CardFooter>
    </Card>
  );
}
