"use server";

import { createClient } from "@/utils/supabase/server";

interface DocumentData {
  document_id: string;
}

const getDocCollaborator = async ({ document_id }: DocumentData) => {
  const supabase = createClient();

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not found.");
  }

  const { data: collaborators, error: error_collaborators } = await supabase
    .from("user_docs")
    .select(
      `
      document_id,
      user_id,
      owner,
      profiles: user_id (email, full_name)
      `
    )
    .eq("document_id", document_id)
    .order("owner", { ascending: false });

  if (error_collaborators) {
    console.error("Error getting collaborators:", error_collaborators);
    // throw new Error("Error getting collaborators.");
  }

  return collaborators?.map((collaborator: any) => {
    return {
      document_id: collaborator.document_id,
      user_id: collaborator.user_id,
      owner: collaborator.owner,
      email: collaborator.profiles.email,
      full_name: collaborator.profiles.full_name,
    };
  });
};

export { getDocCollaborator };
