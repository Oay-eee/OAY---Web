import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSuggestedFriends } from "@/data"; // Import your Prisma function

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const suggestedFriends = await getSuggestedFriends(session.user.id);
    return NextResponse.json(suggestedFriends);
  } catch (err) {
    console.error("Error fetching suggested friends:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
