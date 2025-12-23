const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;


