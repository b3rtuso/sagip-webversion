import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  AlertTriangle, 
  Users, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  MapPin,
  Phone,
  ArrowRight
} from "lucide-react";
import { mockIncidents, mockTeams } from "../data/mockData";
import { Link } from "react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function Dashboard() {
  const activeIncidents = mockIncidents.filter(i => 
    i.status === "responding" || i.status === "investigating"
  );
  
  const resolvedToday = mockIncidents.filter(i => 
    i.status === "resolved" && 
    new Date(i.reportedAt).toDateString() === new Date().toDateString()
  ).length;

  const deployedTeams = mockTeams.filter(t => t.status === "deployed").length;
  const availableTeams = mockTeams.filter(t => t.status === "available").length;

  // Chart data
  const incidentTypeData = [
    { name: "Flood", value: mockIncidents.filter(i => i.type === "flood").length },
    { name: "Fire", value: mockIncidents.filter(i => i.type === "fire").length },
    { name: "Medical", value: mockIncidents.filter(i => i.type === "medical").length },
    { name: "Landslide", value: mockIncidents.filter(i => i.type === "landslide").length },
    { name: "Typhoon", value: mockIncidents.filter(i => i.type === "typhoon").length },
  ];

  const statusData = [
    { name: "Responding", count: mockIncidents.filter(i => i.status === "responding").length },
    { name: "Investigating", count: mockIncidents.filter(i => i.status === "investigating").length },
    { name: "Resolved", count: mockIncidents.filter(i => i.status === "resolved").length },
    { name: "Reported", count: mockIncidents.filter(i => i.status === "reported").length },
  ];

  const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];

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
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Incidents</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{activeIncidents.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Teams Deployed</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{deployedTeams}/{mockTeams.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              {availableTeams} teams available
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Resolved Today</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{resolvedToday}</div>
            <p className="text-xs text-gray-500 mt-1">
              Successfully handled
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Incidents</CardTitle>
            <Clock className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockIncidents.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              All recorded incidents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* High-Risk Barangays */}
      <Card>
        <CardHeader>
          <CardTitle>High-Risk Barangays</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "San Roque", incidents: 3, risk: "High" },
              { name: "Poblacion", incidents: 2, risk: "Medium" },
              { name: "Durungao", incidents: 1, risk: "Low" }
            ].map((barangay) => (
              <div key={barangay.name} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{barangay.name}</h4>
                  <Badge className={
                    barangay.risk === "High" ? "bg-red-500 text-white" :
                    barangay.risk === "Medium" ? "bg-yellow-500 text-white" :
                    "bg-green-500 text-white"
                  }>
                    {barangay.risk}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{barangay.incidents} incidents this month</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Incidents by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incidents by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={incidentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incidentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Incidents List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Active Incidents</CardTitle>
          <Link to="/incidents">
            <Button variant="outline" size="sm">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeIncidents.slice(0, 5).map((incident) => (
              <Link key={incident.id} to={`/incidents/${incident.id}`}>
                <div className="flex items-start gap-4 p-4 rounded-lg border hover:border-blue-500 transition-colors cursor-pointer">
                  <div className={`h-10 w-10 rounded-full ${getPriorityColor(incident.priority)} flex items-center justify-center text-white flex-shrink-0`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{incident.description}</p>
                      </div>
                      <Badge className={`${getStatusColor(incident.status)} text-white`}>
                        {incident.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {incident.location.barangay}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {incident.reportedBy.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(incident.reportedAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900">Emergency Hotlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">MDRRMO Hotline</p>
              <p className="text-xl font-bold text-blue-900">(043) XXX-XXXX</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Emergency (24/7)</p>
              <p className="text-xl font-bold text-red-600">911</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Fire Department</p>
              <p className="text-xl font-bold text-orange-600">(043) XXX-YYYY</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}