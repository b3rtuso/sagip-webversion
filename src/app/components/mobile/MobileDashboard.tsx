import { Link } from "react-router";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Flame, 
  Droplets, 
  Car, 
  Mountain,
  Heart,
  AlertTriangle,
  Phone,
  Shield,
  Bell,
  TrendingUp,
  MapPin,
  FileText
} from "lucide-react";

export function MobileDashboard() {
  const emergencyTypes = [
    { 
      icon: Flame, 
      label: "Fire", 
      color: "bg-red-500 hover:bg-red-700",
      type: "fire"
    },
    { 
      icon: Droplets, 
      label: "Flood", 
      color: "bg-blue-500 hover:bg-blue-700",
      type: "flood"
    },
    { 
      icon: Car, 
      label: "Accident", 
      color: "bg-orange-500 hover:bg-orange-700",
      type: "accident"
    },
    { 
      icon: Mountain, 
      label: "Landslide", 
      color: "bg-yellow-500 hover:bg-yellow-700",
      type: "landslide"
    },
    { 
      icon: Heart, 
      label: "Medical", 
      color: "bg-pink-500 hover:bg-pink-700",
      type: "medical"
    },
    { 
      icon: AlertTriangle, 
      label: "Other", 
      color: "bg-gray-600 hover:bg-gray-700",
      type: "other"
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      title: "Heavy Rainfall Advisory",
      time: "2 hours ago",
      priority: "high"
    },
    {
      id: 2,
      title: "Flood Watch - Low-lying Areas",
      time: "4 hours ago",
      priority: "medium"
    }
  ];

  const safetyTips = [
    "Keep emergency contact numbers readily available",
    "Prepare an emergency kit with essentials",
    "Know your evacuation routes and centers"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
              <Shield className="h-7 w-7 text-blue-900" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold"> SendResQPls</h1>
              <p className="text-blue-100 text-sm">Emergency Response</p>
            </div>
          </div>
          <Link to="/dashboard/alerts" className="relative">
            <Bell className="h-6 w-6 text-white" />
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{recentAlerts.length}</span>
            </div>
          </Link>
        </div>

        <h2 className="text-white text-2xl font-bold mb-2">
          Welcome Back, Berto Batumbakal!
        </h2>
        <p className="text-blue-100 text-sm">
          Stay safe and report emergencies quickly
        </p>
      </div>

      <div className="px-6 pt-6 pb-6">
        {/* Emergency Quick Actions */}
        <Card className="bg-white shadow-lg border-0 mb-6">
          <CardContent className="p-5">
            <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Quick Emergency Report
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {emergencyTypes.map((emergency) => {
                const Icon = emergency.icon;
                return (
                  <Link 
                    key={emergency.type} 
                    to={`/dashboard/report?type=${emergency.type}`}
                  >
                    <button
                      className={`${emergency.color} text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 w-full transition-all shadow-md hover:shadow-lg active:scale-95`}
                    >
                      <Icon className="h-8 w-8" />
                      <span className="text-xs font-semibold">{emergency.label}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Report Button */}
        <Link to="/dashboard/report">
          <Button className="w-full h-16 bg-red-500 hover:bg-red-700 text-white text-lg font-bold shadow-xl mb-6 rounded-2xl">
            <FileText className="mr-3 h-7 w-7" />
            Report New Incident
          </Button>
        </Link>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link to="/dashboard/tracking">
            <Card className="bg-gradient bg-blue-500 hover:bg-blue-700 border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold text-sm">Track Reports</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/hotline">
            <Card className="bg-gradient bg-orange-500 hover:bg-orange-700 border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <Phone className="h-8 w-8 text-white mx-auto mb-2" />
                <p className="text-white font-bold text-sm">Emergency Hotline</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Alerts */}
        <Card className="bg-white shadow-md border-0 mb-6">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Recent Alerts
              </h3>
              <Link to="/dashboard/alerts" className="text-blue-900 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <Bell className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                  </div>
                  <Badge className={`${alert.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'} text-white text-xs`}>
                    {alert.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="bg-blue-50 border-blue-200 shadow-sm mb-6">
          <CardContent className="p-5">
            <h3 className="text-blue-900 font-bold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Tips
            </h3>
            <ul className="space-y-2">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-900">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Emergency Hotlines */}
        <Card className="bg-red-50 border-red-200 shadow-sm">
          <CardContent className="p-5">
            <h3 className="text-red-900 font-bold mb-3 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Hotlines
            </h3>
            <div className="space-y-2">
              <a href="tel:911" className="flex justify-between items-center p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <span className="font-bold">Emergency</span>
                <span className="text-2xl font-bold">911</span>
              </a>
              <a href="tel:043XXXXXXX" className="flex justify-between items-center p-3 bg-white border-2 border-red-300 text-red-900 rounded-lg hover:bg-red-50 transition-colors">
                <span className="font-semibold">MDRRMO Balayan</span>
                <span className="font-bold">(043) XXX-XXXX</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}