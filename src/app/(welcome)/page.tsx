import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Image from "next/image";
import Link from "next/link";

const WelcomeScreen = () => {
  const words = [
    {
      text: "Share",
      className: " underline",
    },
    {
      text: "files",
    },
    {
      text: "&",
      className: "text-blue-500  dark:text-blue-500",
    },
    {
      text: "Collaboarate",
      className: " underline",
    },
    {
      text: "with",
    },
    {
      text: "Terra ...",
      className: "text-blue-500  dark:text-blue-500",
    },
  ];
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-200">
      <Image
        src="/logo.png"
        width={100}
        height={100}
        alt="logo"
        className="delay-show opacity-0 transition-opacity duration-2000 ease-in-out"
      />
      <TypewriterEffectSmooth words={words} />
      <Link
        href="/login"
        className="delay-show w-1/4 rounded-md border-2  border-blue-700 bg-blue-500 px-4 py-2 text-center text-2xl font-semibold text-white opacity-0 transition-opacity duration-2000 ease-in-out hover:bg-blue-600"
      >
        Login
      </Link>
    </div>
  );
};

export default WelcomeScreen;
