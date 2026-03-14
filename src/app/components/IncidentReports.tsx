import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { 
  Search, 
  Filter,
  MapPin,
  Clock,
  Users,
  AlertTriangle
} from "lucide-react";
import { mockIncidents } from "../data/mockData";
import { Link } from "react-router";
import { IncidentStatus, IncidentType, Priority } from "../types/incident";

export function IncidentReports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredIncidents = mockIncidents.filter((incident) => {
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.barangay.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesType = typeFilter === "all" || incident.type === typeFilter;
    const matchesPriority = priorityFilter === "all" || incident.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
    }
  };

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case "responding": return "bg-blue-500 text-white";
      case "investigating": return "bg-yellow-500 text-white";
      case "resolved": return "bg-green-500 text-white";
      case "reported": return "bg-gray-500 text-white";
      case "closed": return "bg-gray-700 text-white";
    }
  };

  const getTypeIcon = (type: IncidentType) => {
    return <AlertTriangle className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Incident Reports</h1>
          <p className="text-gray-500 mt-1">View and manage all reported incidents</p>
        </div>
        <Link to="/report">
          <Button>Report New Incident</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by ID, title, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="responding">Responding</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="flood">Flood</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="earthquake">Earthquake</SelectItem>
                <SelectItem value="landslide">Landslide</SelectItem>
                <SelectItem value="typhoon">Typhoon</SelectItem>
                <SelectItem value="accident">Accident</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredIncidents.length} {filteredIncidents.length === 1 ? 'Incident' : 'Incidents'} Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredIncidents.map((incident) => (
              <Link key={incident.id} to={`/incidents/${incident.id}`}>
                <div className="flex items-start gap-4 p-4 rounded-lg border hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                  <div className={`h-12 w-12 rounded-lg ${getPriorityColor(incident.priority)} flex items-center justify-center text-white flex-shrink-0`}>
                    {getTypeIcon(incident.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-gray-500">{incident.id}</span>
                          <Badge variant="outline" className="capitalize">
                            {incident.type}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">{incident.title}</h3>
                      </div>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{incident.description}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{incident.location.barangay}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(incident.reportedAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span>{incident.affectedPersons} affected</span>
                      </div>
                      {incident.assignedTeam && (
                        <Badge variant="secondary" className="ml-auto">
                          Team Assigned
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {filteredIncidents.length === 0 && (
              <div className="text-center py-12">
                <Filter className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No incidents found matching your filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
