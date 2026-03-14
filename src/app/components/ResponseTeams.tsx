import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Users, Phone, Package, MapPin } from "lucide-react";
import { mockTeams, mockIncidents } from "../data/mockData";

export function ResponseTeams() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500 text-white";
      case "deployed": return "bg-blue-500 text-white";
      case "standby": return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "rescue": return "text-blue-600 bg-blue-50";
      case "medical": return "text-red-600 bg-red-50";
      case "fire": return "text-orange-600 bg-orange-50";
      case "police": return "text-indigo-600 bg-indigo-50";
      case "support": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Response Teams</h1>
          <p className="text-gray-500 mt-1">Manage and monitor all response teams</p>
        </div>
        <Button>Add New Team</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Teams</p>
                <p className="text-3xl font-bold text-green-600">
                  {mockTeams.filter((t) => t.status === "available").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Deployed Teams</p>
                <p className="text-3xl font-bold text-blue-600">
                  {mockTeams.filter((t) => t.status === "deployed").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">On Standby</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {mockTeams.filter((t) => t.status === "standby").length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTeams.map((team) => {
          const currentIncident = team.currentIncident 
            ? mockIncidents.find((i) => i.id === team.currentIncident)
            : null;

          return (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{team.name}</CardTitle>
                    <Badge className={`mt-2 capitalize ${getTypeColor(team.type)}`}>
                      {team.type} Team
                    </Badge>
                  </div>
                  <Badge className={getStatusColor(team.status)}>
                    {team.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{team.members} team members</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{team.contact}</span>
                </div>

                {currentIncident && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Currently Deployed</p>
                        <p className="text-xs text-blue-700 mt-0.5">{currentIncident.title}</p>
                        <p className="text-xs text-blue-600 mt-0.5">{currentIncident.location.barangay}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    Equipment
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {team.equipment.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    View Details
                  </Button>
                  {team.status === "available" && (
                    <Button className="flex-1" size="sm">
                      Assign to Incident
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
