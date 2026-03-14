import { ArrowLeft, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../ui/card";
import { mockIncidents } from "../../data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export function MobileAnalytics() {
  const navigate = useNavigate();

  // Calculate statistics
  const totalThisMonth = mockIncidents.filter(i => {
    const incidentDate = new Date(i.reportedAt);
    const now = new Date();
    return incidentDate.getMonth() === now.getMonth() && 
           incidentDate.getFullYear() === now.getFullYear();
  }).length;

  const incidentTypes = mockIncidents.reduce((acc, incident) => {
    acc[incident.type] = (acc[incident.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonType = Object.entries(incidentTypes).sort((a, b) => b[1] - a[1])[0];

  // Calculate average response time (simulated)
  const avgResponseTime = "12 minutes";

  // Chart data
  const incidentTypeData = Object.entries(incidentTypes).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count
  }));

  const monthlyData = [
    { month: "Jan", count: 8 },
    { month: "Feb", count: 12 },
    { month: "Mar", count: mockIncidents.length }
  ];

  const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6"];

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
          Analytics
        </h1>
        <p className="text-blue-100 text-sm">
          Incident statistics and trends
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalThisMonth}</div>
              <div className="text-xs text-gray-600 mt-1">This Month</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-lg font-bold text-gray-900 capitalize">
                {mostCommonType ? mostCommonType[0] : 'N/A'}
              </div>
              <div className="text-xs text-gray-600 mt-1">Most Common</div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">{avgResponseTime}</div>
              <div className="text-xs text-gray-600 mt-1">Avg Response</div>
            </CardContent>
          </Card>
        </div>

        {/* Incidents by Type */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Incidents by Type</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={incidentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
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

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {incidentTypeData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyData}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Breakdown */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Status Breakdown</h3>
            <div className="space-y-3">
              {[
                { status: "Resolved", count: mockIncidents.filter(i => i.status === "resolved").length, color: "bg-green-500" },
                { status: "Responding", count: mockIncidents.filter(i => i.status === "responding").length, color: "bg-blue-500" },
                { status: "Investigating", count: mockIncidents.filter(i => i.status === "investigating").length, color: "bg-yellow-500" },
                { status: "Reported", count: mockIncidents.filter(i => i.status === "reported").length, color: "bg-gray-500" }
              ].map((item) => (
                <div key={item.status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.status}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color}`}
                      style={{ width: `${(item.count / mockIncidents.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card className="bg-white shadow-sm border-0">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Priority Distribution</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { priority: "Critical", count: mockIncidents.filter(i => i.priority === "critical").length, color: "bg-red-500" },
                { priority: "High", count: mockIncidents.filter(i => i.priority === "high").length, color: "bg-orange-500" },
                { priority: "Medium", count: mockIncidents.filter(i => i.priority === "medium").length, color: "bg-yellow-500" },
                { priority: "Low", count: mockIncidents.filter(i => i.priority === "low").length, color: "bg-green-500" }
              ].map((item) => (
                <div key={item.priority} className="p-3 bg-gray-50 rounded-lg">
                  <div className={`h-2 ${item.color} rounded-full mb-2`}></div>
                  <p className="text-xl font-bold text-gray-900">{item.count}</p>
                  <p className="text-xs text-gray-600">{item.priority}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
