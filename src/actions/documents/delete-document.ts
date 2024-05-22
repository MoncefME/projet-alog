"use server";

import { createClient } from "@/utils/supabase/server";

const deleteDocument = async (document_id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("documents")
    .delete()
    .eq("id", document_id);

  if (error) {
    console.error(error);
  }

  return data;
};

export { deleteDocument };
