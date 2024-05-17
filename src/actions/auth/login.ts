"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface LoginFormData {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginFormData) {
  const supabase = createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      status: error.status,
      message: error.message || "An error occurred",
    };
  }

  revalidatePath("/", "layout");
  redirect("/home");
}
