"use server";

import { createClient } from "@/utils/supabase/server";

const checkAccess = async (userId: string, documentId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_docs")
    .select("*")
    .eq("document_id", documentId)
    .eq("user_id", userId);

  if (error) {
    return false;
  }

  if (!data) {
    return false;
  }

  return data.length > 0;
};

export { checkAccess };
