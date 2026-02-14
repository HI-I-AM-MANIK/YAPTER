import NavigationSidebar from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex h-full w-20 z-30 flex-col fixed inset-y-0 left-0">
        <NavigationSidebar />
      </aside>

      {/* Main Content */}
      <main className="h-full md:pl-20">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
