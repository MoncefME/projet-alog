"use server";

import { createClient } from "@/utils/supabase/server";

interface CollaboratorData {
  document_id: string;
  email: string;
}

const addCollaborator = async ({ document_id, email }: CollaboratorData) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data: user_data, error: user_error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (user_error) {
    throw new Error("Error finding user.");
  }

  if (!user_data) {
    throw new Error("User not found.");
  }

  const { data: data_colabs, error: error_colabs } = await supabase
    .from("user_docs")
    .insert({
      document_id,
      user_id: user_data[0].id,
      liked: false,
    });

  if (error_colabs) {
    throw new Error("Error creating user-doc relationship.");
  }

  return data_colabs;
};
