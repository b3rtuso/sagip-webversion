import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  FileText, 
  Users, 
  Package, 
  BarChart3,
  Menu,
  Bell,
  Settings,
  Send,
  FileBarChart,
  Shield
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

export function Root() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Incidents", path: "/incidents", icon: AlertTriangle },
    { name: "Dispatch", path: "/dispatch", icon: Send },
    { name: "Personnel", path: "/teams", icon: Users },
    { name: "Inventory", path: "/resources", icon: Package },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Reports", path: "/reports", icon: FileBarChart },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-blue-900 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className={`flex items-center p-4 border-b border-blue-800 ${sidebarOpen ? "justify-between" : "flex-col gap-2"}`}>
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <h1 className="text-lg font-bold"> SendResQPls</h1>
                  <p className="text-xs text-blue-200">MDRRMO System</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:bg-blue-800"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-900" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:bg-blue-800"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-800 text-white"
                    : "text-blue-100 hover:bg-blue-800/50"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-blue-900">
                SendResQPls - MDRRMO
              </h2>
              <p className="text-sm text-gray-500">Disaster Incident Reporting and Response Management System</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  3
                </Badge>
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 pl-3 border-l">
                <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  AD
                </div>
                {sidebarOpen && (
                  <div className="text-sm">
                    <p className="font-medium">Admin User</p>
                    <p className="text-gray-500 text-xs">Operations Chief</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
