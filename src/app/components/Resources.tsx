import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Package, Truck, Wrench, Building } from "lucide-react";
import { mockResources } from "../data/mockData";

export function Resources() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500 text-white";
      case "in_use": return "bg-blue-500 text-white";
      case "maintenance": return "bg-orange-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "vehicle": return Truck;
      case "equipment": return Wrench;
      case "supplies": return Package;
      case "facility": return Building;
      default: return Package;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "vehicle": return "text-blue-600 bg-blue-50";
      case "equipment": return "text-purple-600 bg-purple-50";
      case "supplies": return "text-green-600 bg-green-50";
      case "facility": return "text-orange-600 bg-orange-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const categories = ["vehicle", "equipment", "supplies", "facility"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resources & Inventory</h1>
          <p className="text-gray-500 mt-1">Monitor and manage disaster response resources</p>
        </div>
        <Button>Request Resources</Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map((category) => {
          const resources = mockResources.filter((r) => r.category === category);
          const totalItems = resources.reduce((sum, r) => sum + r.quantity, 0);
          const availableItems = resources.reduce((sum, r) => sum + r.available, 0);
          const Icon = getCategoryIcon(category);

          return (
            <Card key={category}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`capitalize ${getCategoryColor(category)}`}>
                    {category}
                  </Badge>
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{availableItems}/{totalItems}</p>
                <p className="text-xs text-gray-600 mt-1">Available / Total</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resources by Category */}
      {categories.map((category) => {
        const resources = mockResources.filter((r) => r.category === category);
        const Icon = getCategoryIcon(category);

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 capitalize">
                <Icon className="h-5 w-5" />
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.map((resource) => {
                  const availabilityPercent = (resource.available / resource.quantity) * 100;
                  
                  return (
                    <div key={resource.id} className="p-4 rounded-lg border hover:border-blue-500 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">Location: {resource.location}</p>
                        </div>
                        <Badge className={getStatusColor(resource.status)}>
                          {resource.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Availability</span>
                          <span className="font-medium">
                            {resource.available} / {resource.quantity}
                          </span>
                        </div>
                        <Progress value={availabilityPercent} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{availabilityPercent.toFixed(0)}% available</span>
                          <span>{resource.quantity - resource.available} in use</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                        {resource.status === "available" && (
                          <Button size="sm" className="flex-1">
                            Deploy Resource
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
