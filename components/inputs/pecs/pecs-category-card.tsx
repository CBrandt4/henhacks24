"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Category } from "@/lib/schema/category";
import Image from "next/image";
import { useState } from "react";

export default function PecsCategoryCard({
  category,
  categoryClicked,
}: {
  category: Category;
  categoryClicked: (category: Category) => void;
}) {
  const [src, setSrc] = useState<string>("/images/" + category.name + ".png");
  return (
    <Card
      className="flex size-32 flex-col bg-green-300 p-2 hover:opacity-80"
      onClick={() => categoryClicked(category)}
    >
      <CardContent className="relative grow p-0">
        <Image
          fill
          src={src}
          alt={category.name}
          className="max-h-32 max-w-32"
          onError={() => setSrc("/images/placeholder.svg")}
        />
      </CardContent>
      <CardFooter className="justify-center p-0">
        <p>{category.name}</p>
      </CardFooter>
    </Card>
  );
}
