import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";

export const DashboardLayout = () => (
  <div className="min-h-screen bg-transparent lg:flex">
    <Sidebar />
    <div className="flex min-h-screen flex-1 flex-col">
      <Header />
      <main className="flex-1 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  </div>
);