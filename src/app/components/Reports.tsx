import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  FileText,
  Download,
  Calendar as CalendarIcon,
  Filter,
  BarChart3,
} from "lucide-react";
import { mockIncidents } from "../data/mockData";
import { format } from "date-fns";
import { toast } from "sonner";

export function Reports() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [incidentType, setIncidentType] = useState<string>("all");
  const [barangay, setBarangay] = useState<string>("all");
  const [reportType, setReportType] = useState<string>("summary");

  const barangays = [
    "All Barangays",
    "Poblacion",
    "San Roque",
    "Centro",
    "Mountainside",
    "Riverside",
    "San Jose",
    "Santa Ana",
    "San Juan",
    "Durungao",
    "Calan",
    "Palikpikan",
  ];

  const handleGenerateReport = () => {
    toast.success("Report generated successfully!");
  };

  const handleExportReport = (format: string) => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
  };

  // Calculate statistics based on filters
  const filteredIncidents = mockIncidents.filter((incident) => {
    const typeMatch = incidentType === "all" || incident.type === incidentType;
    const barangayMatch =
      barangay === "all" || incident.location.barangay === barangay;

    let dateMatch = true;
    if (startDate) {
      dateMatch =
        dateMatch && new Date(incident.reportedAt) >= startDate;
    }
    if (endDate) {
      dateMatch =
        dateMatch && new Date(incident.reportedAt) <= endDate;
    }

    return typeMatch && barangayMatch && dateMatch;
  });

  const stats = {
    total: filteredIncidents.length,
    resolved: filteredIncidents.filter((i) => i.status === "resolved").length,
    active: filteredIncidents.filter(
      (i) => i.status === "responding" || i.status === "investigating"
    ).length,
    affectedPersons: filteredIncidents.reduce(
      (sum, i) => sum + i.affectedPersons,
      0
    ),
    injuries: filteredIncidents.reduce((sum, i) => sum + (i.injuries || 0), 0),
    casualties: filteredIncidents.reduce(
      (sum, i) => sum + (i.casualties || 0),
      0
    ),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 mt-1">
          Generate and export incident reports
        </p>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="detailed">Detailed Report</SelectItem>
                  <SelectItem value="statistical">Statistical Analysis</SelectItem>
                  <SelectItem value="response">Response Time Analysis</SelectItem>
                  <SelectItem value="barangay">Barangay-wise Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Incident Type</Label>
              <Select value={incidentType} onValueChange={setIncidentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="landslide">Landslide</SelectItem>
                  <SelectItem value="typhoon">Typhoon</SelectItem>
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Barangay</Label>
              <Select value={barangay} onValueChange={setBarangay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select barangay" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Barangays</SelectItem>
                  {barangays.slice(1).map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="invisible">Action</Label>
              <Button onClick={handleGenerateReport} className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Incidents</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.resolved}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.active}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Affected Persons</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.affectedPersons}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Injuries</p>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.injuries}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Casualties</p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.casualties}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => handleExportReport("pdf")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExportReport("excel")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export as Excel
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExportReport("csv")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export as CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExportReport("print")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Print Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "Monthly Incident Summary - March 2026",
                date: "2026-03-05",
                type: "Summary Report",
              },
              {
                name: "Flood Incidents Analysis - Q1 2026",
                date: "2026-03-01",
                type: "Statistical Analysis",
              },
              {
                name: "Response Time Report - February 2026",
                date: "2026-02-28",
                type: "Response Time Analysis",
              },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {report.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {report.type} • Generated on{" "}
                      {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
