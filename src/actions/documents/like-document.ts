"use server";

import { createClient } from "@/utils/supabase/server";

const likeDocument = async (document_id: string) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data: data_1, error: error_1 } = await supabase
    .from("user_docs")
    .select("liked")
    .eq("document_id", document_id)
    .eq("user_id", user.data.user?.id);

  const newLikedStatus = data_1 ? !data_1[0]?.liked : true;
  const { data, error } = await supabase
    .from("user_docs")
    .update({ liked: newLikedStatus })
    .eq("document_id", document_id)
    .eq("user_id", user.data.user?.id)
    .select();

  if (error) {
    console.error("Error updating document:", error);
    throw error;
  }

  return data;
};

export { likeDocument };
