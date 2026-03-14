export type IncidentType = 
  | "flood"
  | "fire"
  | "earthquake"
  | "landslide"
  | "typhoon"
  | "accident"
  | "medical"
  | "other";

export type IncidentStatus = 
  | "reported"
  | "investigating"
  | "responding"
  | "resolved"
  | "closed";

export type Priority = "low" | "medium" | "high" | "critical";

export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  description: string;
  location: {
    address: string;
    coordinates?: { lat: number; lng: number };
    barangay: string;
  };
  reportedBy: {
    name: string;
    contact: string;
  };
  reportedAt: string;
  status: IncidentStatus;
  priority: Priority;
  affectedPersons: number;
  casualties?: number;
  injuries?: number;
  assignedTeam?: string;
  resources?: string[];
  updates: IncidentUpdate[];
  images?: string[];
}

export interface IncidentUpdate {
  id: string;
  timestamp: string;
  message: string;
  author: string;
  type: "status_change" | "team_assigned" | "update" | "resource_deployed";
}

export interface ResponseTeam {
  id: string;
  name: string;
  type: "rescue" | "medical" | "fire" | "police" | "support";
  members: number;
  status: "available" | "deployed" | "standby";
  currentIncident?: string;
  contact: string;
  equipment: string[];
}

export interface Resource {
  id: string;
  name: string;
  category: "vehicle" | "equipment" | "supplies" | "facility";
  quantity: number;
  available: number;
  location: string;
  status: "available" | "in_use" | "maintenance";
}
