import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, MapPin, Camera, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { barangays } from "../../data/mockData";
import { toast } from "sonner";

export function MobileReportIncident() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get("type");

  const [incidentType, setIncidentType] = useState(preselectedType || "");
  const [description, setDescription] = useState("");
  const [barangay, setBarangay] = useState("");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [useGPS, setUseGPS] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [aiPrediction, setAiPrediction] = useState<{ category: string; priority: string } | null>(null);

  const incidentTypes = [
    { value: "fire", label: "🔥 Fire" },
    { value: "flood", label: "💧 Flood" },
    { value: "accident", label: "🚗 Vehicle Accident" },
    { value: "landslide", label: "⛰️ Landslide" },
    { value: "medical", label: "❤️ Medical Emergency" },
    { value: "earthquake", label: "📳 Earthquake" },
    { value: "typhoon", label: "🌀 Typhoon/Strong Winds" },
    { value: "other", label: "⚠️ Other Emergency" },
  ];

  const handleGetLocation = () => {
    setUseGPS(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.success("Location detected successfully!");
        },
        (error) => {
          toast.error("Unable to get location. Please enable GPS.");
          setUseGPS(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your device");
      setUseGPS(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      toast.success("Photo uploaded successfully!");
    }
  };

  // Simulate AI prediction
  useEffect(() => {
    if (description.length > 20 && incidentType) {
      setTimeout(() => {
        const priorities = ["high", "medium", "critical"];
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
        setAiPrediction({
          category: incidentType,
          priority: randomPriority,
        });
      }, 1000);
    } else {
      setAiPrediction(null);
    }
  }, [description, incidentType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!incidentType) {
      toast.error("Please select an incident type");
      return;
    }

    if (!description.trim()) {
      toast.error("Please provide a description");
      return;
    }

    if (!barangay) {
      toast.error("Please select a barangay");
      return;
    }

    if (!contactName.trim() || !contactPhone.trim()) {
      toast.error("Please provide your contact information");
      return;
    }

    toast.success("Incident report submitted successfully!");
    
    setTimeout(() => {
      navigate("/dashboard/tracking");
    }, 1500);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      default: return "bg-blue-500";
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
          Report Incident
        </h1>
        <p className="text-blue-100 text-sm">
          Provide details about the emergency
        </p>
      </div>

      {/* Form */}
      <div className="px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* AI Prediction Display */}
          {aiPrediction && (
            <Card className="bg-green-50 border-green-200 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-green-900 mb-2">AI Incident Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-800">Predicted Category:</span>
                        <Badge variant="outline" className="bg-white text-green-900 font-semibold">
                          {incidentTypes.find(t => t.value === aiPrediction.category)?.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-800">Priority Level:</span>
                        <Badge className={`${getPriorityColor(aiPrediction.priority)} text-white font-semibold`}>
                          {aiPrediction.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Incident Type */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <Label htmlFor="type" className="text-gray-900 font-bold mb-2 block">
                Incident Type <span className="text-red-500">*</span>
              </Label>
              <Select value={incidentType} onValueChange={setIncidentType}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <Label htmlFor="description" className="text-gray-900 font-bold mb-2 block">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the incident in detail...&#10;&#10;Example:&#10;- What happened?&#10;- How many people are affected?&#10;- Any injuries or casualties?&#10;- Current situation"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[150px] text-base"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                {description.length}/500 characters
              </p>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <h3 className="text-gray-900 font-bold mb-4">Location Information</h3>
              
              {/* GPS Detection */}
              <div className="mb-4">
                <Button
                  type="button"
                  onClick={handleGetLocation}
                  variant="outline"
                  className="w-full h-12 border-2 border-blue-900 text-blue-900 hover:bg-blue-50 font-semibold"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  {useGPS && gpsLocation ? "Location Detected ✓" : "Use My Current Location"}
                </Button>
                {gpsLocation && (
                  <p className="text-xs text-green-600 mt-2 text-center">
                    GPS: {gpsLocation.lat.toFixed(4)}, {gpsLocation.lng.toFixed(4)}
                  </p>
                )}
              </div>

              {/* Barangay Selection */}
              <div className="mb-4">
                <Label htmlFor="barangay" className="text-gray-700 font-semibold mb-2 block">
                  Barangay <span className="text-red-500">*</span>
                </Label>
                <Select value={barangay} onValueChange={setBarangay}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select barangay" />
                  </SelectTrigger>
                  <SelectContent>
                    {barangays.map((brgy) => (
                      <SelectItem key={brgy} value={brgy}>
                        Barangay {brgy}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="text-gray-700 font-semibold mb-2 block">
                  Specific Address/Landmark
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="e.g., Near Municipal Hall, Beside Church"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <h3 className="text-gray-900 font-bold mb-4">Your Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contactName" className="text-gray-700 font-semibold mb-2 block">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    type="text"
                    placeholder="Enter your full name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone" className="text-gray-700 font-semibold mb-2 block">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="e.g., 0917-123-4567"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <h3 className="text-gray-900 font-bold mb-4">Photo Evidence (Optional)</h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Camera className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 font-medium">Take Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>

                  <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 font-medium">Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {photo && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Camera className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-green-900 truncate">
                        {photo.name}
                      </p>
                      <p className="text-xs text-green-600">
                        Photo uploaded successfully
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="bg-yellow-50 border-yellow-300 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-900 font-semibold mb-1">
                    Important Notice
                  </p>
                  <p className="text-xs text-yellow-800">
                    Filing false reports is a crime. Please provide accurate information. 
                    Your report will be verified by MDRRMO personnel.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-red-600 hover:bg-red-700 text-base font-bold shadow-lg"
          >
            Submit Incident Report
          </Button>

          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
}