import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertTriangle, Shield } from "lucide-react";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login
    setTimeout(() => {
      if (username && password) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Please enter username and password");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white mb-4 shadow-lg">
            <Shield className="h-12 w-12 text-blue-900" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Sagip Balayan</h1>
          <p className="text-blue-200">Disaster Incident Reporting and Response Management System</p>
          <div className="mt-2 text-sm text-blue-300">
            Municipal Disaster Risk Reduction and Management Office
          </div>
          <div className="text-xs text-blue-400 mt-1">
            Balayan, Batangas
          </div>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">System Login</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Enter your credentials to access the system</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-yellow-300 bg-yellow-900/30 rounded-lg p-3">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-xs">For emergency hotline: Call 911 or (043) XXX-XXXX</p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-blue-300">
          © 2026 Municipal Government of Balayan, Batangas. All rights reserved.
        </div>
      </div>
    </div>
  );
}
