"use server";

import { createClient } from "@/utils/supabase/server";

interface DocumentData {
  title: string;
}

const likeDocument = async ({ title }: DocumentData) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("documents")
    .update({
      title,
      owner_id: user.data.user?.id,
    })
    .eq("id", user.data.user?.id);

  if (error) {
    throw new Error("Error creating document.");
    return;
  }

  return data;
};

export { likeDocument };
