import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import ServiceOrders from "@/pages/ServiceOrders";
import NewServiceOrder from "@/pages/NewServiceOrder";
import ServiceOrderDetail from "@/pages/ServiceOrderDetail";
import ImportPage from "@/pages/ImportPage";
import CalendarPage from "@/pages/CalendarPage";
import DriversPage from "@/pages/DriversPage";
import VesselsPage from "@/pages/VesselsPage";
import ReportsPage from "@/pages/ReportsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/service-orders" element={<ServiceOrders />} />
            <Route path="/service-orders/new" element={<NewServiceOrder />} />
            <Route path="/service-orders/:id" element={<ServiceOrderDetail />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/vessels" element={<VesselsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
