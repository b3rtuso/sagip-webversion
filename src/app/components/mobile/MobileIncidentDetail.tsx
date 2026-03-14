import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MapPin, Clock, User, AlertTriangle, CheckCircle, Shield, Eye } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { mockIncidents, mockTeams } from "../../data/mockData";

export function MobileIncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const incident = mockIncidents.find(i => i.id === id);
  const assignedTeam = incident?.assignedTeam 
    ? mockTeams.find(t => t.id === incident.assignedTeam)
    : null;

  if (!incident) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Report not found</p>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "reported":
        return { 
          label: "Pending Verification", 
          color: "bg-gray-500",
          icon: AlertTriangle
        };
      case "investigating":
        return { 
          label: "Verified - Under Review", 
          color: "bg-blue-500",
          icon: Eye
        };
      case "responding":
        return { 
          label: "Response Team Dispatched", 
          color: "bg-orange-500",
          icon: Shield
        };
      case "resolved":
        return { 
          label: "Incident Resolved", 
          color: "bg-green-500",
          icon: CheckCircle
        };
      default:
        return { 
          label: status, 
          color: "bg-gray-500",
          icon: AlertTriangle
        };
    }
  };

  const statusInfo = getStatusInfo(incident.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 pt-12 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-white mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center gap-3 mb-3">
          <div className={`h-16 w-16 rounded-full ${getPriorityColor(incident.priority)} flex items-center justify-center shadow-lg`}>
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <Badge className={`${getPriorityColor(incident.priority)} text-white mb-2`}>
              {incident.priority.toUpperCase()} PRIORITY
            </Badge>
            <h1 className="text-white text-xl font-bold">
              {incident.title}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-white text-blue-900">
            {incident.type}
          </Badge>
          <span className="text-blue-100 text-sm">Report ID: {incident.id}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-4">
        {/* Current Status */}
        <Card className={`${statusInfo.color} border-0 shadow-md`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <StatusIcon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-xs font-semibold mb-1">Current Status</p>
                <p className="text-white text-lg font-bold">{statusInfo.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Details */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Report Details
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {incident.description}
            </p>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location
            </h3>
            <div className="space-y-1">
              <p className="text-sm font-bold text-blue-900">
                Barangay {incident.location.barangay}
              </p>
              <p className="text-sm text-blue-700">
                {incident.location.address}
              </p>
              {incident.location.coordinates && (
                <p className="text-xs text-blue-600 mt-2">
                  GPS Coordinates: {incident.location.coordinates.lat.toFixed(4)}, {incident.location.coordinates.lng.toFixed(4)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reporter Information */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Reporter Information</h3>
            <div className="flex items-center gap-3 mb-3 bg-gray-50 p-3 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {incident.reportedBy.name}
                </p>
                <p className="text-xs text-gray-600">{incident.reportedBy.contact}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>
                Reported on {new Date(incident.reportedAt).toLocaleDateString()} at{' '}
                {new Date(incident.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Response Team */}
        {assignedTeam && (
          <Card className="bg-green-50 border-green-200 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Response Team Assigned
              </h3>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <p className="font-bold text-green-900 mb-1">{assignedTeam.name}</p>
                <p className="text-sm text-green-700 mb-2">
                  {assignedTeam.members} members • Specialization: {assignedTeam.specialization}
                </p>
                <p className="text-xs text-green-600">
                  Contact: {assignedTeam.contact}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Response Updates Timeline */}
        {incident.updates.length > 0 && (
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Response Timeline</h3>
              <div className="space-y-4">
                {incident.updates.map((update, index) => (
                  <div key={update.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`h-10 w-10 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                        <div className={`h-3 w-3 ${index === 0 ? 'bg-white' : 'bg-blue-600'} rounded-full`}></div>
                      </div>
                      {index < incident.updates.length - 1 && (
                        <div className="flex-1 w-0.5 bg-gray-200 min-h-[30px] mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className={`p-3 rounded-lg ${index === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                        <p className="text-sm text-gray-900 font-medium mb-2">{update.message}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="font-semibold">{update.author}</span>
                          <span>•</span>
                          <span>
                            {new Date(update.timestamp).toLocaleDateString()} at{' '}
                            {new Date(update.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help & Support */}
        <Card className="bg-yellow-50 border-yellow-300 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">Need Immediate Assistance?</h3>
            <p className="text-sm text-yellow-800 mb-3">
              If this is an urgent emergency, call our hotline immediately.
            </p>
            <a 
              href="tel:911"
              className="block w-full text-center py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
            >
              Call Emergency Hotline: 911
            </a>
          </CardContent>
        </Card>

        <div className="pb-6"></div>
      </div>
    </div>
  );
}
