"use server";

import { createClient } from "@/utils/supabase/server";

interface DocumentData {
  title: string;
}

const createDocument = async ({ title }: DocumentData) => {
  const supabase = createClient();

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not found.");
  }

  const { data: data_document, error: error_document } = await supabase
    .from("documents")
    .insert({
      title,
    })
    .select();

  if (error_document) {
    throw new Error("Error creating document.");
  }

  const { id } = data_document[0];
  const { data: data_colabs, error: error_colabs } = await supabase
    .from("user_docs")
    .insert({
      document_id: id,
      user_id: user.user.id,
      liked: false,
      owner: true,
    });

  if (error_colabs) {
    throw new Error("Error creating user-doc relationship.");
  }

  return data_document;
};

export { createDocument };
