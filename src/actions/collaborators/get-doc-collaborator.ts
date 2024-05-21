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
    user_id,
    liked,
    owner,
    documents (
      id,
      created_at,
      title
    )
  `
    )
    .eq("document_id", document_id);

  if (error_collaborators) {
    throw new Error("Error getting collaborators.");
  }

  return collaborators.map((collaborator) => {
    return {
      documentId: collaborator.documents?.id,
      title: collaborator.documents?.title,
      createdAt: collaborator.documents?.created_at,
      liked: collaborator.liked,
      owner: collaborator.owner,
    };
  });
};

export { getDocCollaborator };
