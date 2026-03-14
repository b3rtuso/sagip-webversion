import { Bell, AlertTriangle, Droplets, Wind, Info, Shield } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export function MobileAlerts() {
  const alerts = [
    {
      id: 1,
      type: "weather",
      icon: Droplets,
      title: "Heavy Rainfall Advisory",
      description: "Expect moderate to heavy rainfall in the next 6-12 hours. Stay alert for possible flooding in low-lying areas.",
      priority: "high",
      time: "2 hours ago",
      color: "bg-blue-600"
    },
    {
      id: 2,
      type: "flood",
      icon: Droplets,
      title: "Flood Watch - Low-lying Areas",
      description: "Water levels rising in Barangay Durungao and Barangay Dao. Residents are advised to monitor updates and prepare for possible evacuation.",
      priority: "medium",
      time: "4 hours ago",
      color: "bg-blue-500"
    },
    {
      id: 3,
      type: "typhoon",
      icon: Wind,
      title: "Tropical Depression Approaching",
      description: "A tropical depression is expected to enter the Philippine Area of Responsibility. Monitor updates from PAGASA.",
      priority: "high",
      time: "6 hours ago",
      color: "bg-orange-600"
    },
    {
      id: 4,
      type: "evacuation",
      icon: AlertTriangle,
      title: "Evacuation Advisory",
      description: "Preemptive evacuation recommended for residents in coastal barangays. Proceed to designated evacuation centers.",
      priority: "critical",
      time: "8 hours ago",
      color: "bg-red-600"
    },
    {
      id: 5,
      type: "info",
      icon: Info,
      title: "COVID-19 Safety Protocols",
      description: "Remember to observe health protocols at evacuation centers: wear masks, maintain distance, and sanitize regularly.",
      priority: "low",
      time: "12 hours ago",
      color: "bg-green-600"
    },
    {
      id: 6,
      type: "weather",
      icon: Wind,
      title: "Strong Wind Warning",
      description: "Strong winds expected in the area. Secure loose objects and avoid going near trees and old structures.",
      priority: "medium",
      time: "1 day ago",
      color: "bg-yellow-600"
    }
  ];

  const evacuationCenters = [
    { name: "Balayan Municipal Gymnasium", barangay: "Poblacion" },
    { name: "Barangay Dao Covered Court", barangay: "Dao" },
    { name: "Durungao Elementary School", barangay: "Durungao" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "border-red-500";
      case "high": return "border-orange-500";
      case "medium": return "border-yellow-500";
      case "low": return "border-green-500";
      default: return "border-gray-500";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <Shield className="h-6 w-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">
              Alerts & Advisories
            </h1>
          </div>
        </div>
        <p className="text-blue-100 text-sm">
          Stay informed with the latest updates from MDRRMO
        </p>
      </div>

      {/* Evacuation Centers Quick Access */}
      <div className="px-6 py-4 bg-red-50 border-b-4 border-red-300">
        <h3 className="text-red-900 font-bold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Evacuation Centers
        </h3>
        <div className="space-y-2">
          {evacuationCenters.map((center, index) => (
            <div key={index} className="bg-white p-3 rounded-lg border-l-4 border-red-500">
              <p className="text-sm font-bold text-gray-900">{center.name}</p>
              <p className="text-xs text-gray-600">Barangay {center.barangay}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="px-6 py-4 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-900 font-semibold">All Notifications</h3>
          <Badge variant="outline" className="text-xs">{alerts.length} alerts</Badge>
        </div>

        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <Card 
              key={alert.id} 
              className={`bg-white shadow-sm hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(alert.priority)}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`h-12 w-12 rounded-full ${alert.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {alert.title}
                      </h4>
                      <Badge className={`${getPriorityBadge(alert.priority)} text-white text-xs flex-shrink-0`}>
                        {alert.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Bell className="h-3 w-3" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Important Notice */}
      <div className="px-6 pb-6">
        <Card className="bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-semibold mb-1">
                  Stay Connected
                </p>
                <p className="text-xs text-blue-800">
                  Enable push notifications to receive real-time alerts and emergency updates from MDRRMO.
                  Your safety is our priority.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
