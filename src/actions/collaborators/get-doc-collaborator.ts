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

  const { data, error: errorUserDocs }: { data: any; error: any } =
    await supabase
      .from("user_docs")
      .select(
        `
      user_id,
      profiles (
        id,
        full_name,
        email
      )
    `
      )
      .eq("document_id", document_id);

  if (errorUserDocs) {
    console.error(errorUserDocs);
    throw new Error("Error retrieving document collaborators.");
  }

  console.log(data[0].profiles, "-a-a-aa-");

  const collaborators = data.map((doc: any) => ({
    id: doc.user_id,
    username: doc.profiles.full_name,
    email: doc.profiles.email,
    role: doc.user_id === user.user.id ? "Owner" : "Collaborator",
  }));

  return collaborators;
};

export { getDocCollaborator };
