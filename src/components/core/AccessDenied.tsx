import { BanIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

export const AccessDenied = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <BanIcon color="red" size={70} />
      <h1 className="text-4xl font-bold">Access Denied</h1>
      <p>You don't have access to this room</p>
      <div className="flex items-center gap-4">
        <Link href={"/"}>Go back to home</Link>
        <HomeIcon />
      </div>
    </div>
  );
};
