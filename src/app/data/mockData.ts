import { Incident, ResponseTeam, Resource } from "../types/incident";

export const barangays = [
  "Poblacion",
  "Langgangan",
  "Calan",
  "Caloocan",
  "Carenahan",
  "Samtol",
  "Dao",
  "Dilao",
  "Durungao",
  "Gimalas",
  "Lagnas",
  "Lanatan",
  "Magabe",
  "Malalay",
  "Munting Tubig",
  "Palikpikan",
  "Patugo",
  "Sampaga",
  "San Juan",
  "San Roque",
  "San Piro",
  "Navotas",
  "Baha",
  "Baclaran",
  "Sukol"
];

export const mockIncidents: Incident[] = [
  {
    id: "INC-2026-001",
    type: "flood",
    title: "Flash Flood in Barangay San Roque",
    description: "Heavy rainfall caused flash flooding affecting residential areas. Water level approximately 2-3 feet in several streets.",
    location: {
      address: "Purok 3, San Roque",
      barangay: "San Roque",
      coordinates: { lat: 14.5995, lng: 120.9842 }
    },
    reportedBy: {
      name: " Berto Batumbakal",
      contact: "0917-123-4567"
    },
    reportedAt: "2026-03-03T08:30:00",
    status: "responding",
    priority: "high",
    affectedPersons: 45,
    casualties: 0,
    injuries: 2,
    assignedTeam: "TEAM-001",
    resources: ["RES-001", "RES-003"],
    updates: [
      {
        id: "UPD-001",
        timestamp: "2026-03-03T08:35:00",
        message: "Rescue team dispatched to location",
        author: "Dispatch Center",
        type: "team_assigned"
      },
      {
        id: "UPD-002",
        timestamp: "2026-03-03T09:00:00",
        message: "15 families evacuated to evacuation center",
        author: "Team Leader Rodriguez",
        type: "update"
      }
    ]
  },
  {
    id: "INC-2026-002",
    type: "fire",
    title: "Residential Fire in Poblacion",
    description: "House fire reported, spreading to adjacent structures. Fire department responding.",
    location: {
      address: "123 Rizal Street, Poblacion",
      barangay: "Poblacion",
      coordinates: { lat: 14.6000, lng: 120.9850 }
    },
    reportedBy: {
      name: "Juan dela Cruz",
      contact: "0918-234-5678"
    },
    reportedAt: "2026-03-03T06:15:00",
    status: "resolved",
    priority: "critical",
    affectedPersons: 8,
    casualties: 0,
    injuries: 1,
    assignedTeam: "TEAM-003",
    resources: ["RES-005", "RES-006"],
    updates: [
      {
        id: "UPD-003",
        timestamp: "2026-03-03T06:20:00",
        message: "Fire trucks deployed to scene",
        author: "Fire Chief Reyes",
        type: "team_assigned"
      },
      {
        id: "UPD-004",
        timestamp: "2026-03-03T07:30:00",
        message: "Fire contained and extinguished",
        author: "Fire Chief Reyes",
        type: "status_change"
      }
    ]
  },
  {
    id: "INC-2026-003",
    type: "medical",
    title: "Medical Emergency - Heat Stroke",
    description: "Multiple cases of heat stroke reported at community event",
    location: {
      address: "Municipal Gymnasium",
      barangay: "Centro",
      coordinates: { lat: 14.6010, lng: 120.9860 }
    },
    reportedBy: {
      name: "Barangay Health Worker",
      contact: "0919-345-6789"
    },
    reportedAt: "2026-03-03T11:45:00",
    status: "investigating",
    priority: "medium",
    affectedPersons: 6,
    casualties: 0,
    injuries: 6,
    assignedTeam: "TEAM-002",
    updates: [
      {
        id: "UPD-005",
        timestamp: "2026-03-03T11:50:00",
        message: "Medical team en route",
        author: "Medical Coordinator",
        type: "team_assigned"
      }
    ]
  },
  {
    id: "INC-2026-004",
    type: "landslide",
    title: "Minor Landslide on Mountain Road",
    description: "Road blocked due to small landslide, no casualties reported",
    location: {
      address: "Mountain View Road, Km 5",
      barangay: "Mountainside",
      coordinates: { lat: 14.6020, lng: 120.9870 }
    },
    reportedBy: {
      name: "Traffic Officer",
      contact: "0920-456-7890"
    },
    reportedAt: "2026-03-02T15:20:00",
    status: "resolved",
    priority: "low",
    affectedPersons: 0,
    casualties: 0,
    injuries: 0,
    assignedTeam: "TEAM-004",
    updates: [
      {
        id: "UPD-006",
        timestamp: "2026-03-02T16:00:00",
        message: "Road clearing operations started",
        author: "Engineering Team",
        type: "update"
      },
      {
        id: "UPD-007",
        timestamp: "2026-03-02T18:30:00",
        message: "Road cleared and reopened to traffic",
        author: "Engineering Team",
        type: "status_change"
      }
    ]
  },
  {
    id: "INC-2026-005",
    type: "typhoon",
    title: "Typhoon Preparedness Alert",
    description: "Typhoon approaching, expected landfall in 48 hours",
    location: {
      address: "All Barangays",
      barangay: "Municipality-wide"
    },
    reportedBy: {
      name: "Weather Bureau",
      contact: "Emergency Hotline"
    },
    reportedAt: "2026-03-01T10:00:00",
    status: "investigating",
    priority: "high",
    affectedPersons: 0,
    casualties: 0,
    injuries: 0,
    updates: [
      {
        id: "UPD-008",
        timestamp: "2026-03-01T10:30:00",
        message: "All teams placed on standby alert",
        author: "MDRRMO Chief",
        type: "status_change"
      }
    ]
  }
];

export const mockTeams: ResponseTeam[] = [
  {
    id: "TEAM-001",
    name: "Rescue Team Alpha",
    type: "rescue",
    specialization: "Water Rescue & Flood Response",
    members: 12,
    status: "deployed",
    currentIncident: "INC-2026-001",
    contact: "0917-111-2222",
    equipment: ["Rescue Boat", "Life Vests", "Ropes", "First Aid Kit"]
  },
  {
    id: "TEAM-002",
    name: "Medical Response Unit",
    type: "medical",
    specialization: "Emergency Medical Services",
    members: 8,
    status: "deployed",
    currentIncident: "INC-2026-003",
    contact: "0917-222-3333",
    equipment: ["Ambulance", "Medical Supplies", "Stretchers", "Defibrillator"]
  },
  {
    id: "TEAM-003",
    name: "Fire Brigade 1",
    type: "fire",
    specialization: "Fire Suppression & Prevention",
    members: 15,
    status: "available",
    contact: "0917-333-4444",
    equipment: ["Fire Truck", "Hoses", "Protective Gear", "Breathing Apparatus"]
  },
  {
    id: "TEAM-004",
    name: "Engineering Support Team",
    type: "support",
    specialization: "Infrastructure & Debris Clearing",
    members: 10,
    status: "available",
    contact: "0917-444-5555",
    equipment: ["Excavator", "Dump Truck", "Tools", "Safety Equipment"]
  },
  {
    id: "TEAM-005",
    name: "Rescue Team Bravo",
    type: "rescue",
    specialization: "Search & Rescue Operations",
    members: 12,
    status: "standby",
    contact: "0917-555-6666",
    equipment: ["Rescue Vehicle", "Climbing Gear", "Communication Radios"]
  }
];

export const mockResources: Resource[] = [
  {
    id: "RES-001",
    name: "Rescue Boats",
    category: "vehicle",
    quantity: 5,
    available: 3,
    location: "Main Station",
    status: "in_use"
  },
  {
    id: "RES-002",
    name: "Ambulances",
    category: "vehicle",
    quantity: 4,
    available: 2,
    location: "Medical Depot",
    status: "in_use"
  },
  {
    id: "RES-003",
    name: "Relief Packs",
    category: "supplies",
    quantity: 500,
    available: 435,
    location: "Warehouse A",
    status: "available"
  },
  {
    id: "RES-004",
    name: "Tents",
    category: "equipment",
    quantity: 50,
    available: 38,
    location: "Warehouse B",
    status: "available"
  },
  {
    id: "RES-005",
    name: "Fire Trucks",
    category: "vehicle",
    quantity: 3,
    available: 2,
    location: "Fire Station",
    status: "available"
  },
  {
    id: "RES-006",
    name: "Water Tanks",
    category: "equipment",
    quantity: 10,
    available: 9,
    location: "Fire Station",
    status: "available"
  },
  {
    id: "RES-007",
    name: "Generators",
    category: "equipment",
    quantity: 8,
    available: 6,
    location: "Equipment Depot",
    status: "in_use"
  },
  {
    id: "RES-008",
    name: "Communication Radios",
    category: "equipment",
    quantity: 30,
    available: 18,
    location: "Communications Center",
    status: "in_use"
  },
  {
    id: "RES-009",
    name: "Emergency Shelter (Gymnasium)",
    category: "facility",
    quantity: 1,
    available: 1,
    location: "Centro",
    status: "available"
  },
  {
    id: "RES-010",
    name: "Medical Supplies Kit",
    category: "supplies",
    quantity: 100,
    available: 82,
    location: "Medical Depot",
    status: "available"
  }
];