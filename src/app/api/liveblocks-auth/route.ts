import { createClient } from "@/utils/supabase/server";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  const supbase = createClient();

  const userId = (await supbase.auth.getUser()).data.user?.id;
  console.log("userId", userId);
  if (!userId) {
    return new Response("User not found", { status: 404 });
  }
  const { data, error } = await supbase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(`user-${userId}`, {
    userInfo: {
      name: data?.full_name,
      picture:
        data?.avatar_url || "https://avatars.githubusercontent.com/MoncefME",
      color: "#85EED6",
    },
  });

  session.allow(`terra-app:docs:*`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
