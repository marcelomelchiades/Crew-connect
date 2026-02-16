export type ServiceType = "Embarkation" | "Disembarkation" | "Transfer";
export type OSStatus = "Scheduled" | "In Progress" | "Completed" | "Canceled" | "No-Show";
export type Gender = "Male" | "Female" | "Other";

export interface ServiceOrder {
  id: string;
  serviceType: ServiceType;
  subTasks: string[];
  status: OSStatus;
  crewMember: {
    fullName: string;
    nationality: string;
    dateOfBirth: string;
    passportNumber: string;
    seamansBookNumber: string;
    gender: Gender;
    rankOnBoard: string;
  };
  vessel: {
    name: string;
    port: string;
    terminal: string;
    maritimeAgency: string;
  };
  flight: {
    airlineCode: string;
    airlineName: string;
    flightNumber: string;
    date: string;
    time: string;
    airport: string;
    terminal: string;
  };
  logistics: {
    assignedOperator: string;
    transportCompany: string;
    serviceDateTime: string;
    specialInstructions: string;
  };
}

export const mockServiceOrders: ServiceOrder[] = [
  {
    id: "OS-2026-0001",
    serviceType: "Embarkation",
    subTasks: ["Airport -> Hotel", "Hotel -> Ship"],
    status: "Scheduled",
    crewMember: {
      fullName: "Carlos Eduardo Silva",
      nationality: "Brazilian",
      dateOfBirth: "1988-05-14",
      passportNumber: "FX283910",
      seamansBookNumber: "SB-BR-44821",
      gender: "Male",
      rankOnBoard: "Chief Officer",
    },
    vessel: { name: "MSC Fantasia", port: "Santos", terminal: "T-35", maritimeAgency: "Wilson Sons" },
    flight: { airlineCode: "LA", airlineName: "LATAM", flightNumber: "LA3421", date: "2026-02-10", time: "08:30", airport: "GRU", terminal: "T2" },
    logistics: { assignedOperator: "Maria Oliveira", transportCompany: "Phether Transport", serviceDateTime: "2026-02-10T10:00", specialInstructions: "VIP crew member. Priority handling." },
  },
  {
    id: "OS-2026-0002",
    serviceType: "Disembarkation",
    subTasks: ["Ship -> Hotel", "Hotel -> Airport"],
    status: "In Progress",
    crewMember: {
      fullName: "Andriy Kovalenko",
      nationality: "Ukrainian",
      dateOfBirth: "1992-11-02",
      passportNumber: "UA-991234",
      seamansBookNumber: "SB-UA-11023",
      gender: "Male",
      rankOnBoard: "Able Seaman",
    },
    vessel: { name: "Ever Given", port: "Rio de Janeiro", terminal: "Pier Mauá", maritimeAgency: "Inchcape Shipping" },
    flight: { airlineCode: "TK", airlineName: "Turkish Airlines", flightNumber: "TK016", date: "2026-02-10", time: "22:15", airport: "GIG", terminal: "T1" },
    logistics: { assignedOperator: "João Santos", transportCompany: "Express Crew", serviceDateTime: "2026-02-10T14:00", specialInstructions: "" },
  },
  {
    id: "OS-2026-0003",
    serviceType: "Transfer",
    subTasks: ["Hotel -> Ship"],
    status: "Completed",
    crewMember: {
      fullName: "Maria Gonzalez",
      nationality: "Filipino",
      dateOfBirth: "1995-03-22",
      passportNumber: "PH-5523891",
      seamansBookNumber: "SB-PH-88210",
      gender: "Female",
      rankOnBoard: "Stewardess",
    },
    vessel: { name: "Costa Diadema", port: "Santos", terminal: "T-12", maritimeAgency: "GAC Shipping" },
    flight: { airlineCode: "PR", airlineName: "Philippine Airlines", flightNumber: "PR502", date: "2026-02-09", time: "06:45", airport: "GRU", terminal: "T3" },
    logistics: { assignedOperator: "Maria Oliveira", transportCompany: "Phether Transport", serviceDateTime: "2026-02-09T09:30", specialInstructions: "Crew requires wheelchair assistance." },
  },
  {
    id: "OS-2026-0004",
    serviceType: "Embarkation",
    subTasks: ["Airport -> Ship"],
    status: "Scheduled",
    crewMember: {
      fullName: "James O'Brien",
      nationality: "Irish",
      dateOfBirth: "1985-08-30",
      passportNumber: "IE-7761234",
      seamansBookNumber: "SB-IE-33012",
      gender: "Male",
      rankOnBoard: "Chief Engineer",
    },
    vessel: { name: "MSC Fantasia", port: "Santos", terminal: "T-35", maritimeAgency: "Wilson Sons" },
    flight: { airlineCode: "BA", airlineName: "British Airways", flightNumber: "BA249", date: "2026-02-11", time: "07:10", airport: "GRU", terminal: "T3" },
    logistics: { assignedOperator: "João Santos", transportCompany: "Phether Transport", serviceDateTime: "2026-02-11T09:00", specialInstructions: "Heavy luggage - request van." },
  },
  {
    id: "OS-2026-0005",
    serviceType: "Disembarkation",
    subTasks: ["Ship -> Airport"],
    status: "Canceled",
    crewMember: {
      fullName: "Yuki Tanaka",
      nationality: "Japanese",
      dateOfBirth: "1990-01-15",
      passportNumber: "JP-1298745",
      seamansBookNumber: "SB-JP-55901",
      gender: "Female",
      rankOnBoard: "3rd Officer",
    },
    vessel: { name: "Ever Given", port: "Rio de Janeiro", terminal: "Pier Mauá", maritimeAgency: "Inchcape Shipping" },
    flight: { airlineCode: "NH", airlineName: "ANA", flightNumber: "NH844", date: "2026-02-12", time: "23:55", airport: "GIG", terminal: "T1" },
    logistics: { assignedOperator: "Maria Oliveira", transportCompany: "Express Crew", serviceDateTime: "2026-02-12T18:00", specialInstructions: "Canceled by agency." },
  },
  {
    id: "OS-2026-0006",
    serviceType: "Embarkation",
    subTasks: ["Airport -> Hotel", "Hotel -> Ship"],
    status: "Scheduled",
    crewMember: {
      fullName: "Oleksandr Petrov",
      nationality: "Ukrainian",
      dateOfBirth: "1987-07-09",
      passportNumber: "UA-554321",
      seamansBookNumber: "SB-UA-22098",
      gender: "Male",
      rankOnBoard: "Bosun",
    },
    vessel: { name: "Costa Diadema", port: "Santos", terminal: "T-12", maritimeAgency: "GAC Shipping" },
    flight: { airlineCode: "LH", airlineName: "Lufthansa", flightNumber: "LH507", date: "2026-02-10", time: "14:20", airport: "GRU", terminal: "T3" },
    logistics: { assignedOperator: "João Santos", transportCompany: "Phether Transport", serviceDateTime: "2026-02-10T16:30", specialInstructions: "" },
  },
];

export const dashboardStats = {
  todayServices: 3,
  tomorrowServices: 1,
  pendingOS: 2,
  alerts: 1,
  completedToday: 1,
  inProgressToday: 1,
};
