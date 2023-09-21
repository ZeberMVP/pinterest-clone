import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PinValidator } from "@/lib/validators/pin";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, description, image } = PinValidator.parse(body);

    await db.pin.create({
      data: {
        title,
        description,
        userId: session.user.id,
        image,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response(
      "Could not post the pin at this time, please try again later.",
      {
        status: 500,
      },
    );
  }
}
