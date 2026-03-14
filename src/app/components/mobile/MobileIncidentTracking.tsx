import { Link } from "react-router";
import { AlertTriangle, MapPin, Clock, Shield, CheckCircle, Eye } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { mockIncidents } from "../../data/mockData";

export function MobileIncidentTracking() {
  // Filter user's submitted incidents
  const userIncidents = mockIncidents.slice(0, 5);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "reported":
        return { 
          label: "Pending", 
          color: "bg-gray-500",
          icon: AlertTriangle,
          description: "Report received, awaiting verification"
        };
      case "investigating":
        return { 
          label: "Verified", 
          color: "bg-blue-500",
          icon: Eye,
          description: "Report verified by MDRRMO"
        };
      case "responding":
        return { 
          label: "Team Dispatched", 
          color: "bg-orange-500",
          icon: Shield,
          description: "Response team en route to location"
        };
      case "resolved":
        return { 
          label: "Resolved", 
          color: "bg-green-500",
          icon: CheckCircle,
          description: "Incident has been resolved"
        };
      case "closed":
        return { 
          label: "Closed", 
          color: "bg-gray-400",
          icon: CheckCircle,
          description: "Case closed"
        };
      default:
        return { 
          label: status, 
          color: "bg-gray-500",
          icon: AlertTriangle,
          description: ""
        };
    }
  };

  const getPriorityColor = (priority: string) => {
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
              Track Reports
            </h1>
          </div>
        </div>
        <p className="text-blue-100 text-sm">
          Monitor the status of your submitted reports
        </p>
      </div>

      {/* Status Legend */}
      <div className="px-6 py-4 bg-white border-b">
        <h3 className="text-gray-900 font-semibold mb-3 text-sm">Status Guide</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Pending", color: "bg-gray-500" },
            { label: "Verified", color: "bg-blue-500" },
            { label: "Team Dispatched", color: "bg-orange-500" },
            { label: "Resolved", color: "bg-green-500" },
          ].map((status) => (
            <div key={status.label} className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${status.color}`}></div>
              <span className="text-xs text-gray-700">{status.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Incidents List */}
      <div className="px-6 py-4 space-y-4">
        {userIncidents.length > 0 ? (
          userIncidents.map((incident) => {
            const statusInfo = getStatusInfo(incident.status);
            const StatusIcon = statusInfo.icon;

            return (
              <Link key={incident.id} to={`/dashboard/tracking/${incident.id}`}>
                <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-base mb-2">
                          {incident.title}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${statusInfo.color} text-white text-xs`}>
                            {statusInfo.label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {incident.type}
                          </Badge>
                        </div>
                      </div>
                      <div className={`h-12 w-12 rounded-full ${getPriorityColor(incident.priority)} flex items-center justify-center flex-shrink-0`}>
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {incident.description}
                    </p>

                    {/* Location & Time */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>Barangay {incident.location.barangay}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(incident.reportedAt).toLocaleDateString()} at{' '}
                          {new Date(incident.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Status Progress */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full ${statusInfo.color} flex items-center justify-center flex-shrink-0`}>
                          <StatusIcon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900">
                            Current Status: {statusInfo.label}
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {statusInfo.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Updates Counter */}
                    {incident.updates.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600">
                          {incident.updates.length} update{incident.updates.length !== 1 ? 's' : ''} available
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })
        ) : (
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No Reports Yet</p>
              <p className="text-sm text-gray-400 mt-1">Your submitted reports will appear here</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
