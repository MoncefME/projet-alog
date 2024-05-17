import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <div className="w-1/2">
      <Card className="w-full">
        <CardHeader>
          <Link href="/home">
            <CardTitle className="flex items-center justify-center gap-4 text-3xl">
              <Image src="/logo.png" width={35} height={35} alt="logo" />
              Login
            </CardTitle>
          </Link>
        </CardHeader>
        <CardContent>
          {/* Login Form */}
          <LoginForm />
        </CardContent>
      </Card>
      <div className="mt-4 space-x-4 text-center text-sm text-white">
        <span>Don&apos;t have an account?</span>
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
