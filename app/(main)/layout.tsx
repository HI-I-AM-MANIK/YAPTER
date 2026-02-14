import NavigationSidebar from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full bg-[#f9fafb] dark:bg-[#0f172a] transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="hidden md:flex h-full w-20 z-30 flex-col fixed inset-y-0 left-0 border-r border-zinc-200 dark:border-zinc-800">
        <NavigationSidebar />
      </aside>

      {/* Main Content */}
      <main className="h-full md:pl-20 transition-colors duration-300">
        <div className="h-full bg-white dark:bg-[#111827] text-black dark:text-white">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
