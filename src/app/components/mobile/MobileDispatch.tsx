import { useState } from "react";
import { ArrowLeft, Clock, MapPin, CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { mockIncidents, mockTeams } from "../../data/mockData";
import { toast } from "sonner";

export function MobileDispatch() {
  const navigate = useNavigate();
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  
  // Filter incidents assigned to current user (simulated)
  const myIncidents = mockIncidents.filter(i => 
    i.status === "responding" || i.status === "investigating"
  );

  const handleUpdateStatus = (incidentId: string, newStatus: string) => {
    toast.success(`Status updated to: ${newStatus}`);
    setSelectedIncident(null);
  };

  const handleRecordArrival = (incidentId: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    toast.success(`Arrival time recorded: ${now}`);
  };

  const handleAddNotes = (incidentId: string) => {
    if (!notes.trim()) {
      toast.error("Please enter your notes");
      return;
    }
    toast.success("Notes added successfully");
    setNotes("");
    setSelectedIncident(null);
  };

  const handleMarkResolved = (incidentId: string) => {
    toast.success("Incident marked as resolved");
    setTimeout(() => {
      navigate("/dashboard/incidents");
    }, 1500);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "responding": return "bg-blue-500";
      case "investigating": return "bg-yellow-500";
      case "resolved": return "bg-green-500";
      case "reported": return "bg-gray-500";
      default: return "bg-gray-500";
    }
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
          Dispatch Updates
        </h1>
        <p className="text-blue-100 text-sm">
          {myIncidents.length} assigned incident{myIncidents.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Incidents List */}
      <div className="px-6 py-4 space-y-3">
        {myIncidents.map((incident) => {
          const isSelected = selectedIncident === incident.id;
          const assignedTeam = incident.assignedTeam 
            ? mockTeams.find(t => t.id === incident.assignedTeam)
            : null;

          return (
            <Card key={incident.id} className="bg-white shadow-sm border-0">
              <CardContent className="p-4">
                {/* Incident Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`h-12 w-12 rounded-full ${getPriorityColor(incident.priority)} flex items-center justify-center flex-shrink-0`}>
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {incident.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${getStatusColor(incident.status)} text-white text-xs`}>
                        {incident.status}
                      </Badge>
                      <Badge className={`${getPriorityColor(incident.priority)} text-white text-xs`}>
                        {incident.priority}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{incident.location.barangay}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(incident.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Info */}
                {assignedTeam && (
                  <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-900">
                      <span className="font-semibold">Team:</span> {assignedTeam.name}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {!isSelected ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleRecordArrival(incident.id)}
                      variant="outline"
                      size="sm"
                      className="h-9 text-xs"
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      Record Arrival
                    </Button>
                    
                    <Button
                      onClick={() => setSelectedIncident(incident.id)}
                      variant="outline"
                      size="sm"
                      className="h-9 text-xs"
                    >
                      Add Notes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2 mt-3 pt-3 border-t">
                    <Textarea
                      placeholder="Enter response notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[80px] text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => setSelectedIncident(null)}
                        variant="outline"
                        size="sm"
                        className="h-9"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleAddNotes(incident.id)}
                        size="sm"
                        className="h-9 bg-blue-900 hover:bg-blue-800"
                      >
                        Save Notes
                      </Button>
                    </div>
                  </div>
                )}

                {/* Status Update Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button
                    onClick={() => handleUpdateStatus(incident.id, "On Scene")}
                    className="h-10 bg-blue-900 hover:bg-blue-800 text-xs"
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Mark On Scene
                  </Button>
                  
                  <Button
                    onClick={() => handleMarkResolved(incident.id)}
                    className="h-10 bg-green-600 hover:bg-green-700 text-xs"
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Mark Resolved
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {myIncidents.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No assigned incidents</p>
            <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}