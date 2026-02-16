import { useParams, useNavigate } from "react-router-dom";
import { mockServiceOrders } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { ServiceTypeBadge } from "@/components/ServiceTypeBadge";
import { ArrowLeft, User, Ship, Plane, Truck, MapPin } from "lucide-react";

const ServiceOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const os = mockServiceOrders.find((o) => o.id === id);

  if (!os) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Service Order not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold font-mono">{os.id}</h1>
            <ServiceTypeBadge type={os.serviceType} />
            <StatusBadge status={os.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Service legs: {os.subTasks.join(" → ")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crew Member */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-4 h-4 text-accent" /> Crew Member
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Name" value={os.crewMember.fullName} />
            <Row label="Rank" value={os.crewMember.rankOnBoard} />
            <Row label="Nationality" value={os.crewMember.nationality} />
            <Row label="Date of Birth" value={os.crewMember.dateOfBirth} />
            <Row label="Passport" value={os.crewMember.passportNumber} />
            <Row label="Seaman's Book" value={os.crewMember.seamansBookNumber} />
            <Row label="Gender" value={os.crewMember.gender} />
          </CardContent>
        </Card>

        {/* Vessel */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Ship className="w-4 h-4 text-accent" /> Vessel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Vessel" value={os.vessel.name} />
            <Row label="Port" value={os.vessel.port} />
            <Row label="Terminal" value={os.vessel.terminal} />
            <Row label="Agency" value={os.vessel.maritimeAgency} />
          </CardContent>
        </Card>

        {/* Flight */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Plane className="w-4 h-4 text-accent" /> Flight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Flight" value={`${os.flight.flightNumber} (${os.flight.airlineName})`} />
            <Row label="Date" value={os.flight.date} />
            <Row label="Time" value={os.flight.time} />
            <Row label="Airport" value={os.flight.airport} />
            <Row label="Terminal" value={os.flight.terminal} />
          </CardContent>
        </Card>

        {/* Logistics */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent" /> Logistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Operator" value={os.logistics.assignedOperator} />
            <Row label="Transport" value={os.logistics.transportCompany} />
            <Row label="Service Date" value={os.logistics.serviceDateTime} />
            {os.logistics.specialInstructions && (
              <div className="pt-2 mt-2 border-t">
                <p className="text-xs text-muted-foreground mb-1">Special Instructions</p>
                <p className="text-sm">{os.logistics.specialInstructions}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default ServiceOrderDetail;
