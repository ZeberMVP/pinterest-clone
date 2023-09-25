"use client";

import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.push("/")}
      className="ml-8 mt-8"
    >
      <ArrowLeft />
    </Button>
  );
};

export default GoBackButton;
