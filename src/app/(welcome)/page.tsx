import Typewriter from "@/components/home/TypewriterTitle";
import Image from "next/image";
import Link from "next/link";

const WelcomeScreen = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Image src="/logo.png" width={100} height={100} alt="logo" />
      <Typewriter text="Welcome to Terra App" speed={50} />
      <Link href="/login">Login</Link>
    </div>
  );
};

export default WelcomeScreen;
