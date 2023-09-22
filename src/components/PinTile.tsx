"use client";

import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PinProps {
  pinId: string;
  title: string;
  image: string;
}

const Pin: FC<PinProps> = ({ pinId, title, image }) => {
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer before:absolute before:z-10 before:h-full before:w-full before:rounded-3xl before:opacity-50 hover:before:bg-gray-600"
      onClick={() => router.push("/pin/" + pinId)}
    >
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="relative 
        z-0 cursor-pointer rounded-3xl"
      />
    </div>
  );
};

export default Pin;
