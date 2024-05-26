import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import ProfileForm from "@/components/home/ProfileForm";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/login");
  }

  return (
    <nav className="flex h-20 w-full items-center justify-between border-b-4 border-b-slate-600 bg-slate-800 px-20 py-2  text-white">
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" alt="Terra App" width={45} height={45} />
        <p className="hidden text-2xl font-bold md:block lg:block">Terra App</p>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <form action="/api/auth/signout" method="POST">
            <Button
              variant="destructive"
              type="submit"
              className="flex items-center gap-4 text-base"
            >
              <p className="hidden lg:block">Logout</p>
              <LogOut />
            </Button>
          </form>
        ) : null}
        {user && <ProfileForm user={user} />}
      </div>
    </nav>
  );
};

export default Navbar;
