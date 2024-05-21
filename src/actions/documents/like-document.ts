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
    .from("user_docs")
    .update({ liked: true })
    .eq("user_id", user.data.user?.id)
    .eq("document_id", document_id)
    .select();

  console.log("edit data", data);
  if (error) {
    console.error("Error updating document:", error);
    throw error;
  }

  return data;
};

export { likeDocument };
