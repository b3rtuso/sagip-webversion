import { useParams, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  AlertTriangle,
  MapPin,
  Phone,
  Clock,
  Users,
  ArrowLeft,
  User,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { mockIncidents, mockTeams } from "../data/mockData";
import { useState } from "react";
import { toast } from "sonner";

export function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = mockIncidents.find((i) => i.id === id);
  const [newUpdate, setNewUpdate] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");

  if (!incident) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Incident not found</p>
        <Button onClick={() => navigate("/incidents")} className="mt-4">
          Back to Incidents
        </Button>
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "responding": return "bg-blue-500 text-white";
      case "investigating": return "bg-yellow-500 text-white";
      case "resolved": return "bg-green-500 text-white";
      case "reported": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const handleAddUpdate = () => {
    if (newUpdate.trim()) {
      toast.success("Update added successfully");
      setNewUpdate("");
    }
  };

  const handleStatusChange = () => {
    if (statusUpdate) {
      toast.success("Status updated successfully");
      setStatusUpdate("");
    }
  };

  const assignedTeam = mockTeams.find((t) => t.id === incident.assignedTeam);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{incident.title}</h1>
              <Badge className={getStatusColor(incident.status)}>
                {incident.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">Incident ID: {incident.id}</p>
          </div>
        </div>
        <div className={`h-16 w-16 rounded-lg ${getPriorityColor(incident.priority)} flex items-center justify-center text-white`}>
          <AlertTriangle className="h-8 w-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Incident Details */}
          <Card>
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Description</p>
                <p className="text-gray-900">{incident.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Type</p>
                  <Badge variant="outline" className="capitalize">{incident.type}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Priority</p>
                  <Badge variant="outline" className="capitalize">{incident.priority}</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Impact Assessment</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{incident.affectedPersons}</p>
                    <p className="text-xs text-gray-600">Affected Persons</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{incident.injuries || 0}</p>
                    <p className="text-xs text-gray-600">Injuries</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{incident.casualties || 0}</p>
                    <p className="text-xs text-gray-600">Casualties</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Updates & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {incident.updates.map((update, index) => (
                <div key={update.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-8 w-8 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-center text-white flex-shrink-0`}>
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    {index < incident.updates.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-gray-900">{update.author}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(update.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{update.message}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {update.type.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Add Update */}
          <Card>
            <CardHeader>
              <CardTitle>Add Update</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter incident update..."
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
                rows={3}
              />
              <Button onClick={handleAddUpdate} className="w-full">
                Post Update
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Location Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">{incident.location.barangay}</p>
                  <p className="text-sm text-gray-600">{incident.location.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporter Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reported By</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{incident.reportedBy.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{incident.reportedBy.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{new Date(incident.reportedAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Team */}
          {assignedTeam && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assigned Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{assignedTeam.name}</p>
                  <Badge variant="secondary" className="mt-1 capitalize">
                    {assignedTeam.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{assignedTeam.members} members</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{assignedTeam.contact}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Change Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Change Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={statusUpdate} onValueChange={setStatusUpdate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reported">Reported</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="responding">Responding</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleStatusChange} className="w-full" variant="outline">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Update Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
