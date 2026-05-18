import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";

export const DashboardLayout = () => (
  <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black text-gray-900 dark:text-white dark:text-black">
    <Sidebar />
    <div className="flex flex-1 flex-col overflow-hidden relative">
      <Header />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
);