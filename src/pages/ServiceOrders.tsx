import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, Eye, Plane, Ship } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockServiceOrders, type OSStatus, type ServiceType } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { ServiceTypeBadge } from "@/components/ServiceTypeBadge";

const ServiceOrders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = mockServiceOrders.filter((os) => {
    const matchesSearch =
      search === "" ||
      os.crewMember.fullName.toLowerCase().includes(search.toLowerCase()) ||
      os.id.toLowerCase().includes(search.toLowerCase()) ||
      os.vessel.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || os.status === statusFilter;
    const matchesType = typeFilter === "all" || os.serviceType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Service Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockServiceOrders.length} total orders
          </p>
        </div>
        <Link to="/service-orders/new">
          <Button className="gradient-teal text-accent-foreground hover:opacity-90 border-0">
            <Plus className="w-4 h-4 mr-2" /> New OS
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, OS ID, vessel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-secondary border-0"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px] bg-secondary border-0">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
                <SelectItem value="No-Show">No-Show</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[160px] bg-secondary border-0">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Embarkation">Embarkation</SelectItem>
                <SelectItem value="Disembarkation">Disembarkation</SelectItem>
                <SelectItem value="Transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">OS ID</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Crew Member</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Vessel</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Flight</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Operator</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((os) => (
                <tr key={os.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono font-semibold">{os.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <ServiceTypeBadge type={os.serviceType} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={os.status} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium">{os.crewMember.fullName}</p>
                    <p className="text-xs text-muted-foreground">{os.crewMember.rankOnBoard} • {os.crewMember.nationality}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Ship className="w-3.5 h-3.5 text-muted-foreground" />
                      {os.vessel.name}
                    </div>
                    <p className="text-xs text-muted-foreground">{os.vessel.port}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Plane className="w-3.5 h-3.5 text-muted-foreground" />
                      {os.flight.flightNumber}
                    </div>
                    <p className="text-xs text-muted-foreground">{os.flight.date} • {os.flight.time}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <p className="text-sm">{os.logistics.assignedOperator}</p>
                    <p className="text-xs text-muted-foreground">{os.logistics.transportCompany}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/service-orders/${os.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No service orders match your filters.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ServiceOrders;
