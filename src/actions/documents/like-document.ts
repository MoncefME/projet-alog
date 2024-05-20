"use server";

import { createClient } from "@/utils/supabase/server";

interface DocumentData {
  document_id: string;
}

const likeDocument = async ({ document_id }: DocumentData) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("use_docs")
    .update({
      liked: true,
    })
    .eq("document_id", document_id)
    .eq("user_id", user.data.user?.id);

  if (error) {
    throw new Error("Error creating document.");
    return;
  }

  return data;
};

export { likeDocument };
