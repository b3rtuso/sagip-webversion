import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Shield } from "lucide-react";

export function MobileSplash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center px-6">
      <div className="animate-pulse">
        <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center mb-6 shadow-2xl">
          <Shield className="h-20 w-20 text-blue-900" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold text-white text-center mb-3">
         SendResQPls
      </h1>
      
      <p className="text-blue-100 text-center text-lg mb-2">
        Disaster Reporting and
      </p>
      <p className="text-blue-100 text-center text-lg">
        Emergency Assistance
      </p>
      
      <div className="mt-12">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}