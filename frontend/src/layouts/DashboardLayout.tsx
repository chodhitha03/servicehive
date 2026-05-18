import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";

export const DashboardLayout = () => (
  <div className="flex h-screen overflow-hidden bg-gray-50/50 dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-500/30">
    <Sidebar />
    <div className="flex flex-1 flex-col overflow-hidden relative">
      <Header />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto max-w-6xl p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
);