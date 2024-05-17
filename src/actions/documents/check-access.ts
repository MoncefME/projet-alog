"use server";

import { createClient } from "@/utils/supabase/server";

const checkAccess = async (
  userId: string,
  documentId: string
): Promise<Boolean> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_docs")
    .select("*")
    .eq("document_id", documentId)
    .eq("user_id", userId);

  if (error) {
    throw new Error("Error fetching document.");
  }

  if (!data) {
    throw new Error("Document not found.");
  }

  return data.length > 0;
};

export { checkAccess };
