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
    return { success: false, message: "User not found." };
  }

  const { data: user_data, error: user_error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (user_error || !user_data || user_data.length === 0) {
    return { success: false, message: "Collaborator not found." };
  }

  const { data: data_colabs, error: error_colabs } = await supabase
    .from("user_docs")
    .insert({
      document_id,
      user_id: user_data[0].id,
      liked: false,
      owner: false,
    })
    .select("*")
    .single();

  if (error_colabs) {
    return { success: false, message: "Error creating user-doc relationship." };
  }

  const { data: collaborator_details, error: collaborator_error } =
    await supabase
      .from("user_docs")
      .select("*, ...profiles(email, full_name)")
      .eq("document_id", document_id)
      .eq("user_id", user_data[0].id)
      .single();

  if (collaborator_error) {
    return { success: false, message: "Error fetching collaborator details." };
  }

  return { success: true, data: collaborator_details };
};

export { addCollaborator };
