import { db } from "@/lib/db";
import PinTile from "./PinTile";
import { Pin } from "@prisma/client";

const PinList = async () => {
  const pins = await db.pin.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    // <div className="mx-auto flex w-11/12 flex-wrap justify-evenly space-y-2">
    <div className="p-3">
      <div className="mx-auto mb-4 mt-7 columns-2 space-y-6 px-2 md:columns-3 md:px-5 lg:columns-4 xl:columns-5">
        {pins.map((pin: Pin) => (
          <div key={pin.id}>
            <PinTile image={pin.image} title={pin.title} pinId={pin.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinList;
