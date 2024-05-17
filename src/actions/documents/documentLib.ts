"use server";

import { createClient } from "@/utils/supabase/server";

interface DocumentData {
  title: string;
}

const createDocument = async ({ title }: DocumentData) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase.from("documents").insert({
    title,
    owner_id: user.data.user?.id,
  });

  if (error) {
    throw new Error("Error creating document.");
    return;
  }

  return data;
};

const checkAccess = async (
  userId: string,
  documentId: string
): Promise<Boolean> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_docs")
    .select("*")
    .eq("document_id", documentId)
    .eq("user_id", userId);

  if (error) {
    throw new Error("Error fetching document.");
  }

  if (!data) {
    throw new Error("Document not found.");
  }

  return data.length > 0;
};

const getUsersDocuments = async () => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("owner_id", user.data.user?.id);

  if (error) {
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((doc) => {
    return {
      documentId: doc.id,
      title: doc.title,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
    };
  });
};

const deleteDocument = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Error deleting document.");
  }

  return data;
};

export { createDocument, getUsersDocuments, deleteDocument, checkAccess };
