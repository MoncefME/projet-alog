"use server";

import { createClient } from "@/utils/supabase/server";

const deleteDocument = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
  }

  return data;
};

export { deleteDocument };
