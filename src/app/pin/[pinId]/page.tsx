import Comments from "@/components/Comments";
import GoBackButton from "@/components/GoBackButton";
import Navbar from "@/components/Navbar";
import UserTag from "@/components/UserTag";
import { db } from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    pinId: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const page = async ({ params }: PageProps) => {
  const pin = await db.pin.findFirst({
    where: {
      id: params.pinId,
    },
    include: {
      user: true,
    },
  });

  if (!pin) {
    return notFound();
  }

  return (
    <>
      <Navbar activeTab="" />
      <GoBackButton />
      <div className="mx-auto rounded-2xl p-3 md:p-12 md:px-24 lg:px-36 xl:w-2/3">
        <div className="flex flex-col rounded-2xl shadow-lg md:flex-row md:space-x-10">
          <div>
            <Image
              src={pin.image}
              alt={pin.title}
              width={500}
              height={400}
              className="max-h-[1000px] rounded-2xl"
            />
          </div>
          <div className="mt-4 flex-1">
            <UserTag user={pin.user} />
            <h2 className="mt-4 text-[30px] font-bold">{pin.title}</h2>
            <h2 className="mt-6">{pin.description}</h2>
            <Comments pinId={pin.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
