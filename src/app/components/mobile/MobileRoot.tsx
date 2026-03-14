import { Outlet, Link, useLocation } from "react-router";
import { Home, FileText, Bell, User } from "lucide-react";

export function MobileRoot() {
  const location = useLocation();

  const navigation = [
    { name: "Home", path: "/dashboard", icon: Home },
    { name: "Report", path: "/dashboard/report", icon: FileText },
    { name: "Alerts", path: "/dashboard/alerts", icon: Bell },
    { name: "Profile", path: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? "text-blue-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className={`text-xs mt-1 ${isActive ? "font-semibold" : ""}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}