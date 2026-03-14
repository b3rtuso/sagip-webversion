import { Link, useNavigate } from "react-router";
import { User, Mail, Phone, MapPin, LogOut, ChevronRight, Bell, Lock, Shield, FileText, Award } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function MobileProfile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 pt-12 pb-8">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center mb-3 shadow-lg">
            <User className="h-12 w-12 text-blue-900" />
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">
            Maria Santos
          </h1>
          <Badge className="bg-white text-blue-900 mb-2 font-semibold">
            Verified Resident
          </Badge>
          <p className="text-blue-100 text-sm">
            Member since March 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-4">
        {/* Contact Information */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-blue-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm font-medium text-gray-900">maria.santos@email.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="text-sm font-medium text-gray-900">0917-123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Address</p>
                  <p className="text-sm font-medium text-gray-900">Barangay Poblacion, Balayan, Batangas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Statistics */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Report Statistics
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">5</div>
                <div className="text-xs text-blue-700 mt-1">Total Reports</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-900">2</div>
                <div className="text-xs text-orange-700 mt-1">Pending</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900">3</div>
                <div className="text-xs text-green-700 mt-1">Resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-0">
            <Link to="/dashboard/tracking">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">My Reports</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </Link>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Notification Settings</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Change Password</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card className="bg-green-50 border-green-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Verified Account</h3>
                <p className="text-xs text-green-700 mt-1">
                  Your contact information has been verified by MDRRMO
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Application Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">App Version</span>
                <span className="font-medium text-gray-900">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Login</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card className="bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-blue-900 mx-auto mb-2" />
            <h3 className="font-semibold text-blue-900 mb-1">Sagip Balayan</h3>
            <p className="text-xs text-blue-700 mb-2">
              Disaster Reporting and Emergency Assistance
            </p>
            <p className="text-xs text-blue-600">
              MDRRMO - Municipal Disaster Risk Reduction<br />
              and Management Office<br />
              Balayan, Batangas
            </p>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Help & Support</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-blue-900 hover:underline">
                How to Report an Incident
              </button>
              <button className="w-full text-left text-sm text-blue-900 hover:underline">
                Privacy Policy
              </button>
              <button className="w-full text-left text-sm text-blue-900 hover:underline">
                Terms of Service
              </button>
              <button className="w-full text-left text-sm text-blue-900 hover:underline">
                Contact MDRRMO
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>

        <div className="pb-6"></div>
      </div>
    </div>
  );
}
