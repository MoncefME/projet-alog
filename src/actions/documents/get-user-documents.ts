"use server";

import { createClient } from "@/utils/supabase/server";

const getUsersDocuments = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("user_docs")
    .select(
      `
    document_id,
    user_id,
    liked,
    owner,
    ...documents (
      id,
      created_at,
      title
    )
  `
    )
    .eq("user_id", user.data.user?.id)
    .order("created_at", { referencedTable: "documents", ascending: true });

  if (error) {
    throw error;
  }
  return data.map((doc) => {
    return {
      document_id: doc.document_id,
      user_id: doc.user_id,
      liked: doc.liked,
      owner: doc.owner,
      created_at: doc.created_at,
      title: doc.title,
    };
  });
};

export { getUsersDocuments };
