import { fetchLatestNotifications } from "@/app/server-actions/dashboard/fetchLatestNotifications";
import { fetchUserStats } from "@/app/server-actions/dashboard/fetchUserStats";
import { fetchUserPermits } from "@/app/server-actions/permit/fetchUserPermits";
import { fetchUserTimesheet } from "@/app/server-actions/timesheet/fetchUserTimesheet";
import CalendarView from "@/components/dashboard/calendar-view";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import DashboardSummary from "@/components/dashboard/dashboard-summary";
import HoursChart from "@/components/dashboard/hours-chart";
import NotificationsCard from "@/components/dashboard/notifications-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfoFromCookie } from "@/utils/supabase/server";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Bitrock Hours",
  description: "Panoramica delle ore lavorate, ferie e permessi",
};

export default async function DashboardPage() {
  const user = await getUserInfoFromCookie();
  const summary = await fetchUserStats();
  const latestNotifications = await fetchLatestNotifications();

  const latestTimesheets = await fetchUserTimesheet();
  const permits = await fetchUserPermits();
  return (
    <div className="space-y-6">
      <DashboardHeader user={user} />
      <DashboardSummary summary={summary} />

      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="chart">Grafico</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HoursChart />
            <div className="space-y-6">
              <NotificationsCard notifications={latestNotifications} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView timesheet={latestTimesheets} permits={permits} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
