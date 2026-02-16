import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";

const subTaskOptions = [
  "Airport -> Hotel",
  "Hotel -> Ship",
  "Ship -> Hotel",
  "Hotel -> Airport",
  "Airport -> Ship",
  "Ship -> Airport",
];

const NewServiceOrder = () => {
  const navigate = useNavigate();
  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [newSubTask, setNewSubTask] = useState("");

  const addSubTask = () => {
    if (newSubTask && !subTasks.includes(newSubTask)) {
      setSubTasks([...subTasks, newSubTask]);
      setNewSubTask("");
    }
  };

  const removeSubTask = (task: string) => {
    setSubTasks(subTasks.filter((t) => t !== task));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Service Order created successfully!", {
      description: "OS-2026-0007 has been created.",
    });
    navigate("/service-orders");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">New Service Order</h1>
          <p className="text-sm text-muted-foreground mt-1">Create a new OS manually</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Info */}
        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Service Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Embarkation">Embarkation</SelectItem>
                    <SelectItem value="Disembarkation">Disembarkation</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="Scheduled">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sub-tasks */}
            <div className="space-y-2">
              <Label>Service Legs</Label>
              <div className="flex gap-2">
                <Select value={newSubTask} onValueChange={setNewSubTask}>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Select a leg" /></SelectTrigger>
                  <SelectContent>
                    {subTaskOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" size="icon" onClick={addSubTask}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {subTasks.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {subTasks.map((task) => (
                    <span key={task} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
                      {task}
                      <button type="button" onClick={() => removeSubTask(task)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Crew Member */}
        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Crew Member Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input placeholder="Full name" required />
              </div>
              <div className="space-y-2">
                <Label>Nationality</Label>
                <Input placeholder="Nationality" />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Passport Number</Label>
                <Input placeholder="Passport number" />
              </div>
              <div className="space-y-2">
                <Label>Seaman's Book Number</Label>
                <Input placeholder="Seaman's book number" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Rank on Board</Label>
                <Input placeholder="e.g., Chief Officer" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vessel */}
        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Vessel Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vessel Name *</Label>
                <Input placeholder="Vessel name" required />
              </div>
              <div className="space-y-2">
                <Label>Port</Label>
                <Input placeholder="Port" />
              </div>
              <div className="space-y-2">
                <Label>Terminal</Label>
                <Input placeholder="Terminal" />
              </div>
              <div className="space-y-2">
                <Label>Maritime Agency</Label>
                <Input placeholder="Maritime agency" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flight */}
        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Flight Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Airline Code</Label>
                <Input placeholder="e.g., LA" />
              </div>
              <div className="space-y-2">
                <Label>Airline Name</Label>
                <Input placeholder="e.g., LATAM" />
              </div>
              <div className="space-y-2">
                <Label>Flight Number</Label>
                <Input placeholder="e.g., LA3421" />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" />
              </div>
              <div className="space-y-2">
                <Label>Airport</Label>
                <Input placeholder="e.g., GRU" />
              </div>
              <div className="space-y-2">
                <Label>Terminal</Label>
                <Input placeholder="e.g., T2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logistics */}
        <Card className="shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Logistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Assigned Operator</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select operator" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maria">Maria Oliveira</SelectItem>
                    <SelectItem value="joao">João Santos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Transport Company</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select company" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phether">Phether Transport</SelectItem>
                    <SelectItem value="express">Express Crew</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Service Date & Time</Label>
                <Input type="datetime-local" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label>Special Instructions</Label>
              <Textarea placeholder="Any special instructions for this service..." rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3 pb-6">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" className="gradient-teal text-accent-foreground hover:opacity-90 border-0">
            Create Service Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewServiceOrder;
