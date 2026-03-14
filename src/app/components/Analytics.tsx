import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { mockIncidents } from "../data/mockData";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export function Analytics() {
  // Monthly incident trends
  const monthlyData = [
    { month: "Sep", incidents: 12, resolved: 10 },
    { month: "Oct", incidents: 15, resolved: 13 },
    { month: "Nov", incidents: 8, resolved: 7 },
    { month: "Dec", incidents: 18, resolved: 15 },
    { month: "Jan", incidents: 10, resolved: 9 },
    { month: "Feb", incidents: 14, resolved: 12 },
    { month: "Mar", incidents: mockIncidents.length, resolved: mockIncidents.filter(i => i.status === "resolved").length },
  ];

  // Incident types distribution
  const incidentTypeData = [
    { name: "Flood", value: mockIncidents.filter(i => i.type === "flood").length, color: "#3b82f6" },
    { name: "Fire", value: mockIncidents.filter(i => i.type === "fire").length, color: "#ef4444" },
    { name: "Medical", value: mockIncidents.filter(i => i.type === "medical").length, color: "#f59e0b" },
    { name: "Landslide", value: mockIncidents.filter(i => i.type === "landslide").length, color: "#8b5cf6" },
    { name: "Typhoon", value: mockIncidents.filter(i => i.type === "typhoon").length, color: "#10b981" },
  ];

  // Priority distribution
  const priorityData = [
    { name: "Critical", value: mockIncidents.filter(i => i.priority === "critical").length },
    { name: "High", value: mockIncidents.filter(i => i.priority === "high").length },
    { name: "Medium", value: mockIncidents.filter(i => i.priority === "medium").length },
    { name: "Low", value: mockIncidents.filter(i => i.priority === "low").length },
  ];

  // Response time data
  const responseTimeData = [
    { barangay: "San Roque", avgMinutes: 12 },
    { barangay: "Poblacion", avgMinutes: 8 },
    { barangay: "Centro", avgMinutes: 10 },
    { barangay: "Mountainside", avgMinutes: 25 },
    { barangay: "Riverside", avgMinutes: 15 },
  ];

  const PRIORITY_COLORS = {
    Critical: "#ef4444",
    High: "#f97316",
    Medium: "#eab308",
    Low: "#22c55e",
  };

  const totalIncidents = mockIncidents.length;
  const resolvedIncidents = mockIncidents.filter(i => i.status === "resolved").length;
  const resolutionRate = ((resolvedIncidents / totalIncidents) * 100).toFixed(1);
  const activeIncidents = mockIncidents.filter(i => i.status === "responding" || i.status === "investigating").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-500 mt-1">Insights and statistics on incident management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolution Rate</p>
                <p className="text-3xl font-bold text-green-600">{resolutionRate}%</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+5% vs last month</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-blue-600">14min</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                  <TrendingDown className="h-3 w-3" />
                  <span>-2min improvement</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Cases</p>
                <p className="text-3xl font-bold text-orange-600">{activeIncidents}</p>
                <p className="text-xs text-gray-500 mt-1">Requires attention</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Incidents</p>
                <p className="text-3xl font-bold text-gray-900">{totalIncidents}</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <Activity className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Incident Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="incidents" stroke="#3b82f6" strokeWidth={2} name="Reported" />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incidents by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incidentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incidentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Response Time by Barangay</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: 'Minutes', position: 'insideBottom', offset: -5 }} />
                <YAxis type="category" dataKey="barangay" width={100} />
                <Tooltip />
                <Bar dataKey="avgMinutes" fill="#3b82f6" name="Avg Response Time (min)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Incidents by Priority Level</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Incidents">
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.name as keyof typeof PRIORITY_COLORS]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">
                {mockIncidents.reduce((sum, i) => sum + i.affectedPersons, 0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Affected Persons</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {mockIncidents.reduce((sum, i) => sum + (i.injuries || 0), 0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Injuries</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600">
                {mockIncidents.reduce((sum, i) => sum + (i.casualties || 0), 0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Casualties</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {mockIncidents.filter(i => i.assignedTeam).length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Teams Deployed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
