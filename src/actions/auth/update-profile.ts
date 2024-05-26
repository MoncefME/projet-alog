"use server";
import { createClient } from "@/utils/supabase/server";

const updateProfile = async ({ full_name }: { full_name: string | null }) => {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();
  try {
    const { error } = await supabase.from("profiles").upsert({
      id: user.user?.id || "",
      full_name,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
  } catch (error) {
    console.error("Error updating profile", error);
  }
};

export default updateProfile;
