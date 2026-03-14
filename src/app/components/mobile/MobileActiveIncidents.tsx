import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, AlertTriangle, MapPin, Clock, Filter } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { mockIncidents } from "../../data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function MobileActiveIncidents() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredIncidents = mockIncidents.filter(incident => {
    if (statusFilter !== "all" && incident.status !== statusFilter) return false;
    if (priorityFilter !== "all" && incident.priority !== priorityFilter) return false;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "responding": return "bg-blue-500";
      case "investigating": return "bg-yellow-500";
      case "resolved": return "bg-green-500";
      case "reported": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getIncidentIcon = (type: string) => {
    return <AlertTriangle className="h-5 w-5 text-white" />;
  };

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
        
        <h1 className="text-white text-2xl font-bold mb-2">
          Active Incidents
        </h1>
        <p className="text-blue-100 text-sm">
          {filteredIncidents.length} incident{filteredIncidents.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-5 w-5 text-gray-600" />
          <span className="font-semibold text-gray-900">Filters</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="responding">Responding</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="px-6 py-4 space-y-3">
        {filteredIncidents.map((incident) => (
          <Link key={incident.id} to={`/incidents/${incident.id}`}>
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`h-12 w-12 rounded-full ${getPriorityColor(incident.priority)} flex items-center justify-center flex-shrink-0`}>
                    {getIncidentIcon(incident.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          {incident.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(incident.status)} text-white text-xs`}>
                            {incident.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {incident.type}
                          </Badge>
                        </div>
                      </div>
                      <Badge className={`${getPriorityColor(incident.priority)} text-white text-xs`}>
                        {incident.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {incident.description}
                    </p>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{incident.location.barangay}, {incident.location.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(incident.reportedAt).toLocaleDateString()} at{' '}
                          {new Date(incident.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {incident.affectedPersons > 0 && (
                      <div className="mt-2 flex items-center gap-4 text-xs">
                        <span className="text-gray-600">
                          👥 {incident.affectedPersons} affected
                        </span>
                        {(incident.injuries ?? 0) > 0 && (
                          <span className="text-orange-600">
                            🏥 {incident.injuries} injured
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filteredIncidents.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No incidents found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
