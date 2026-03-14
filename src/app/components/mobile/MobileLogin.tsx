import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

export function MobileLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation for demo
    if (username && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 text-center">
        <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-xl">
          <Shield className="h-16 w-16 text-blue-900" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Sagip Balayan
        </h1>
        <p className="text-blue-100 text-sm">
          Disaster Reporting and Emergency Assistance
        </p>
      </div>

      {/* Login Form */}
      <div className="flex-1 bg-white rounded-t-3xl px-6 pt-8 pb-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-base font-semibold"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-900 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-xs text-gray-500">
              MDRRMO - Municipal Disaster Risk Reduction and Management Office
              <br />
              Balayan, Batangas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}