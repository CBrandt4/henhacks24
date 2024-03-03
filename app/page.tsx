import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MonitorPlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Card>
      <CardContent className="flex h-full flex-col items-center justify-center gap-8 px-20">
        <h1 className="text-3xl">ChitChat</h1>
        <p>Hi! Welcome to ChitChat!</p>
        <Image
          src="/penguin.png"
          alt="ChitChat logo"
          width={200}
          height={200}
        />
        <Link href="/pecs">
          <Button
            icon={<MonitorPlayIcon />}
            variant="default"
            className="text-gray-300"
          >
            Get Started!
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
