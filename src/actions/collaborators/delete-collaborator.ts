"use server";

import { createClient } from "@/utils/supabase/server";

const deleteCollaborator = async (document_id: string, user_id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_docs")
    .delete()
    .eq("document_id", document_id)
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
  }

  return data;
};

export { deleteCollaborator };
