"use server";

import { createClient } from "@/utils/supabase/server";

const getUsersDocuments = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("owner_id", user.data.user?.id);

  if (error) {
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((doc) => {
    return {
      documentId: doc.id,
      title: doc.title,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
    };
  });
};

export { getUsersDocuments };
