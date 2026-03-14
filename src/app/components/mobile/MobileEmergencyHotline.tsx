import { Phone, Shield, Flame, Heart, Building2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function MobileEmergencyHotline() {
  const emergencyContacts = [
    {
      id: 1,
      name: "National Emergency Hotline",
      number: "911",
      icon: Phone,
      color: "bg-red-600 hover:bg-red-700",
      description: "For all types of emergencies"
    },
    {
      id: 2,
      name: "MDRRMO Balayan",
      number: "(043) 211-XXXX",
      icon: Shield,
      color: "bg-blue-900 hover:bg-blue-800",
      description: "Municipal Disaster Risk Reduction"
    },
    {
      id: 3,
      name: "Fire Department",
      number: "(043) 211-YYYY",
      icon: Flame,
      color: "bg-orange-600 hover:bg-orange-700",
      description: "Bureau of Fire Protection"
    },
    {
      id: 4,
      name: "Police Station",
      number: "(043) 211-ZZZZ",
      icon: Shield,
      color: "bg-blue-700 hover:bg-blue-800",
      description: "Balayan Police Station"
    },
    {
      id: 5,
      name: "Ambulance / Medical",
      number: "(043) 211-AAAA",
      icon: Heart,
      color: "bg-pink-600 hover:bg-pink-700",
      description: "Emergency Medical Services"
    },
    {
      id: 6,
      name: "Municipal Hall",
      number: "(043) 211-BBBB",
      icon: Building2,
      color: "bg-green-700 hover:bg-green-800",
      description: "Balayan Municipal Office"
    }
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-lg">
            <Phone className="h-7 w-7 text-red-600" />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">
              Emergency Hotlines
            </h1>
          </div>
        </div>
        <p className="text-red-100 text-sm">
          Quick access to emergency services in Balayan, Batangas
        </p>
      </div>

      {/* Emergency Notice */}
      <div className="px-6 py-4 bg-yellow-50 border-b-2 border-yellow-300">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-900 font-semibold mb-1">
              For Life-Threatening Emergencies
            </p>
            <p className="text-xs text-yellow-800">
              Call 911 immediately for urgent situations requiring immediate response.
              Provide clear information about your location and the emergency.
            </p>
          </div>
        </div>
      </div>

      {/* Hotline Cards */}
      <div className="px-6 py-6 space-y-4">
        {emergencyContacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <Card key={contact.id} className="bg-white shadow-md hover:shadow-lg transition-shadow border-0">
              <CardContent className="p-0">
                <button
                  onClick={() => handleCall(contact.number)}
                  className="w-full text-left"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`h-14 w-14 rounded-full ${contact.color} flex items-center justify-center shadow-md flex-shrink-0 transition-colors`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-base mb-1">
                          {contact.name}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`${contact.color} text-white p-4 rounded-lg flex items-center justify-between shadow-md transition-colors`}>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5" />
                        <span className="text-xl font-bold">{contact.number}</span>
                      </div>
                      <span className="text-sm font-semibold">TAP TO CALL</span>
                    </div>
                  </div>
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="px-6 pb-6 space-y-4">
        <Card className="bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-blue-900 font-bold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              When Calling Emergency Services
            </h3>
            <ul className="space-y-2">
              {[
                "Stay calm and speak clearly",
                "Provide your exact location",
                "Describe the type of emergency",
                "Follow the operator's instructions",
                "Don't hang up until told to do so"
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-900">
                  <span className="text-blue-600 font-bold">{index + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-green-900 font-bold mb-2">
              24/7 Availability
            </h3>
            <p className="text-sm text-green-800">
              All emergency hotlines listed here are available 24 hours a day, 7 days a week.
              Do not hesitate to call if you need assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
