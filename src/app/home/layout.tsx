import { Footer, Navbar } from "@/components/core";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center  justify-between bg-gray-50">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
