"use server";

import { createClient } from "@/utils/supabase/server";

const editDocument = async (document_id: string, new_title: string) => {
  console.log("document_id", document_id);
  console.log("new_title", new_title);
  const supabase = createClient();

  const { data, error } = await supabase
    .from("documents")
    .update({
      title: new_title,
    })
    .eq("id", document_id);

  console.log("data from edit document", data, error);

  if (error) {
    console.error(error);
  }

  return data;
};

export { editDocument };
