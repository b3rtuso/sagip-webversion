import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
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
  Clock,
  Users,
  Send,
  CheckCircle2,
  Truck,
} from "lucide-react";
import { mockIncidents, mockTeams, mockResources } from "../data/mockData";
import { toast } from "sonner";

export function Dispatch() {
  const [selectedIncident, setSelectedIncident] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  // Filter incidents that are pending or need dispatch
  const pendingIncidents = mockIncidents.filter(
    (i) => i.status === "reported" || i.status === "investigating"
  );

  const availableTeams = mockTeams.filter((t) => t.status === "available");
  const availableVehicles = mockResources.filter(
    (r) => r.category === "vehicle" && r.status === "available"
  );

  const handleDispatch = () => {
    if (!selectedIncident || !selectedTeam) {
      toast.error("Please select an incident and a team");
      return;
    }

    toast.success("Response team dispatched successfully!");
    setSelectedIncident("");
    setSelectedTeam("");
    setSelectedVehicle("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "dispatched":
        return "bg-blue-500 text-white";
      case "on_scene":
        return "bg-purple-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dispatch Management</h1>
        <p className="text-gray-500 mt-1">
          Assign response teams and resources to incidents
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Incidents</p>
                <p className="text-3xl font-bold text-orange-600">
                  {pendingIncidents.length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Teams</p>
                <p className="text-3xl font-bold text-green-600">
                  {availableTeams.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dispatched Teams</p>
                <p className="text-3xl font-bold text-blue-600">
                  {mockTeams.filter((t) => t.status === "deployed").length}
                </p>
              </div>
              <Send className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Vehicles</p>
                <p className="text-3xl font-bold text-purple-600">
                  {availableVehicles.length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Queue */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Incident Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingIncidents.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-500">
                      No pending incidents requiring dispatch
                    </p>
                  </div>
                ) : (
                  pendingIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedIncident === incident.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setSelectedIncident(incident.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`h-12 w-12 rounded-lg ${getPriorityColor(
                            incident.priority
                          )} flex items-center justify-center text-white flex-shrink-0`}
                        >
                          <AlertTriangle className="h-6 w-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-gray-500">
                                  {incident.id}
                                </span>
                                <Badge variant="outline" className="capitalize">
                                  {incident.type}
                                </Badge>
                                <Badge className={getPriorityColor(incident.priority) + " text-white"}>
                                  {incident.priority}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-gray-900">
                                {incident.title}
                              </h3>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">
                            {incident.description}
                          </p>

                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              <span>{incident.location.barangay}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              <span>
                                {new Date(incident.reportedAt).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="h-4 w-4" />
                              <span>{incident.affectedPersons} affected</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dispatch Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dispatch Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedIncident ? (
                <div className="text-center py-6 text-gray-500 text-sm">
                  Select an incident to assign a response team
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Assign Response Team</Label>
                    <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTeams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name} ({team.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Assign Vehicle/Equipment</Label>
                    <Select
                      value={selectedVehicle}
                      onValueChange={setSelectedVehicle}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableVehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.name} ({vehicle.available} available)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleDispatch}
                    className="w-full"
                    disabled={!selectedTeam}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Dispatch Team
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Incident Status Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending</span>
                  <Badge className="bg-yellow-500 text-white">
                    {mockIncidents.filter((i) => i.status === "reported").length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dispatched</span>
                  <Badge className="bg-blue-500 text-white">
                    {mockIncidents.filter((i) => i.status === "responding").length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">On Scene</span>
                  <Badge className="bg-purple-500 text-white">
                    {mockIncidents.filter((i) => i.status === "investigating").length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Resolved</span>
                  <Badge className="bg-green-500 text-white">
                    {mockIncidents.filter((i) => i.status === "resolved").length}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
