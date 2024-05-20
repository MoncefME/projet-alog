import { Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex h-14 w-full items-center justify-center gap-8 bg-slate-300 ">
      <p>&copy; Terra App</p>
      <p className="flex items-center gap-2">
        Projet ALOG SIL1 2023-2024
        <Link href="https://github.com/MoncefME/projet-alog">
          <Github size={20} />
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
