import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import ProfileForm from "@/app/home/profile-form";
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
    console.error("User not found");
  }

  console.log(user);

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-blue-200 px-20 py-2">
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" alt="Terra App" width={40} height={40} />
        <p className="text-2xl font-bold">Terra App</p>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <Button variant="destructive">
            <Link href="/logout" className="flex items-center gap-4 text-base">
              Logout
              <LogOut />
            </Link>
          </Button>
        ) : (
          <Button variant="default">
            <Link href="/login" className="flex items-center gap-4 text-base">
              Login
              <LogIn />
            </Link>
          </Button>
        )}
        {user && <ProfileForm user={user} />}
      </div>
    </nav>
  );
};

export default Navbar;
