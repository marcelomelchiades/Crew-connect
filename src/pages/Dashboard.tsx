import {
  ClipboardList,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  CalendarClock,
  Plane,
  Ship,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockServiceOrders, dashboardStats } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { ServiceTypeBadge } from "@/components/ServiceTypeBadge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const metricCards = [
  {
    title: "Today's Services",
    value: dashboardStats.todayServices,
    icon: CalendarClock,
    accentClass: "text-accent",
    bgClass: "bg-accent/10",
  },
  {
    title: "Tomorrow",
    value: dashboardStats.tomorrowServices,
    icon: Clock,
    accentClass: "text-info",
    bgClass: "bg-info/10",
  },
  {
    title: "In Progress",
    value: dashboardStats.inProgressToday,
    icon: Loader2,
    accentClass: "text-warning",
    bgClass: "bg-warning/10",
  },
  {
    title: "Completed Today",
    value: dashboardStats.completedToday,
    icon: CheckCircle2,
    accentClass: "text-success",
    bgClass: "bg-success/10",
  },
  {
    title: "Pending / Incomplete",
    value: dashboardStats.pendingOS,
    icon: ClipboardList,
    accentClass: "text-muted-foreground",
    bgClass: "bg-muted",
  },
  {
    title: "Alerts",
    value: dashboardStats.alerts,
    icon: AlertTriangle,
    accentClass: "text-destructive",
    bgClass: "bg-destructive/10",
  },
];

const Dashboard = () => {
  const todaysOrders = mockServiceOrders.filter(
    (os) => os.flight.date === "2026-02-10"
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monday, February 10, 2026 — Operations Overview
          </p>
        </div>
        <Link to="/service-orders/new">
          <Button className="gradient-teal text-accent-foreground hover:opacity-90 border-0">
            + New Service Order
          </Button>
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricCards.map((card) => (
          <Card key={card.title} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.bgClass}`}>
                  <card.icon className={`w-[18px] h-[18px] ${card.accentClass}`} />
                </div>
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Services */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Today's Services</CardTitle>
            <Link to="/service-orders" className="text-sm text-accent hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaysOrders.map((os) => (
              <div
                key={os.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold font-mono">{os.id}</span>
                    <ServiceTypeBadge type={os.serviceType} />
                    <StatusBadge status={os.status} />
                  </div>
                  <p className="text-sm font-medium truncate">{os.crewMember.fullName}</p>
                  <p className="text-xs text-muted-foreground">
                    {os.crewMember.rankOnBoard} • {os.crewMember.nationality}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5" />
                    <span>{os.vessel.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5" />
                    <span>{os.flight.flightNumber} • {os.flight.time}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-medium">{os.logistics.transportCompany}</p>
                  <p className="text-xs text-muted-foreground">{os.logistics.assignedOperator}</p>
                </div>
              </div>
            ))}

            {todaysOrders.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No services scheduled for today.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="shadow-card border-warning/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
            <p className="text-sm font-medium">Incomplete flight details</p>
            <p className="text-xs text-muted-foreground mt-1">
              OS-2026-0006 — Oleksandr Petrov is missing return flight information. Contact GAC Shipping for confirmation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
