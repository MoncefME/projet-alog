import { checkAccess } from "@/actions/documents";
import { createClient } from "@/utils/supabase/server";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  const supbase = createClient();
  const userId = (await supbase.auth.getUser()).data.user?.id;

  if (!userId) {
    return new Response("User not found", { status: 404 });
  }

  const { data, error } = await supbase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  const session = liveblocks.prepareSession(`user-${data.id}`, {
    userInfo: {
      name: data?.full_name,
      picture: "https://avatars.githubusercontent.com/MoncefME",
      color: "#85EED6",
    },
  });

  session.allow(`liveblocks:examples:*`, session.FULL_ACCESS);
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
