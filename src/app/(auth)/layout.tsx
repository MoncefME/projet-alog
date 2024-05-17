interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-500 to-slate-800">
      {children}
    </div>
  );
};

export default AuthLayout;
