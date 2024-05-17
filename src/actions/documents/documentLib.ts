"use server";

import { createClient } from "@/utils/supabase/server";

interface DocumentData {
  title: string;
  userId: string;
}

const createDocument = async ({ title }: DocumentData) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase.from("documents").insert({
    title,
    userId: user.data.user?.id,
  });
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
    .eq("userId", user.data.user?.id);

  return [
    {
      documentId: "1",
      title: "Document 1",
      createdAt: "2022-10-10",
      updatedAt: "2022-10-10",
    },
    {
      documentId: "2",
      title: "Document 2",
      createdAt: "2022-10-10",
      updatedAt: "2022-10-10",
    },
    {
      documentId: "3",
      title: "Document 3",
      createdAt: "2022-10-10",
      updatedAt: "2022-10-10",
    },
    {
      documentId: "4",
      title: "Document 4",
      createdAt: "2022-10-10",
      updatedAt: "2022-10-10",
    },
    {
      documentId: "6",
      title: "Document 3",
      createdAt: "2022-10-10",
      updatedAt: "2022-10-10",
    },
    {
      documentId: "8",
      title: "Document 4",
      createdAt: "2022-10-10",
      updatedAt: "2022-10-10",
    },
    {
      documentId: "11",
      title: "Document 3",
      createdAt: "2022-10-10",
      updatedAt: "2022-10-10",
    },
    {
      documentId: "10",
      title: "Document 4",
      createdAt: "2022-10-10",
      updatedAt: "2022-10-10",
    },
  ];
};

const deleteDocument = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  return data;
};

export { createDocument, getUsersDocuments, deleteDocument };
