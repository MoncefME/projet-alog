"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface SignupFormData {
  email: string;
  password: string;
  full_name: string;
}

export async function signup({ email, password, full_name }: SignupFormData) {
  const supabase = createClient();

  const signUpData = {
    email,
    password,
    full_name,
  };

  const { error, data } = await supabase.auth.signUp(signUpData);

  if (error) {
    redirect("/error");
  }

  if (data) {
    const { error } = await supabase.from("profiles").insert({
      id: data.user?.id,
      full_name,
      email,
    });

    if (error) {
      console.log(error);
    }
  }

  revalidatePath("/", "layout");
  redirect("/home");
}
