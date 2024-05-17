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

  console.log("data->", data);
  if (data) {
    const { error, data: dda } = await supabase.from("profiles").insert({
      id: data.user?.id,
      full_name,
      email,
      updated_at: new Date(),
    });

    if (error) {
      console.log(error);
    } else {
      console.log("data->", dda);
    }
  } else {
    console.log("No data found");
  }

  revalidatePath("/", "layout");
  redirect("/home");
}
