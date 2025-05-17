import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, BadgeCheck, Archive, BarChart3 } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  // Placeholder data
  const stats = [
    { title: "Total Vouchers Issued", value: "1,250,000", icon: Ticket, description: "+20.1% from last month" },
    { title: "Vouchers Redeemed", value: "875,320", icon: BadgeCheck, description: "+18.3% from last month" },
    { title: "Vouchers Remaining", value: "374,680", icon: Archive, description: "-5.2% from last month" },
    { title: "Avg. Redemption Rate", value: "70.03%", icon: BarChart3, description: "+1.5% from last period" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        {/* Add any header actions here, e.g., date range picker */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-lg">
          <CardHeader>
            <CardTitle>Redemption Trends</CardTitle>
            <CardDescription>Monthly voucher redemption overview.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Placeholder for a chart. In a real app, use a charting library like Recharts or Chart.js */}
            <div className="w-full h-[300px] bg-muted rounded-md flex items-center justify-center">
               <Image src="https://placehold.co/600x300.png" alt="Redemption Trends Chart Placeholder" width={600} height={300} data-ai-hint="analytics graph" className="object-cover rounded-md"/>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest voucher generations and redemptions.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recent activity list */}
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">Voucher Batch #VB007 generated</p>
                  <p className="text-xs text-muted-foreground">10,000 units, expires 2024-12-31</p>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">VC-PROMO20 redeemed</p>
                  <p className="text-xs text-muted-foreground">Store ID: #ST567</p>
                </div>
                <span className="text-xs text-muted-foreground">5 min ago</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">Bulk upload complete</p>
                  <p className="text-xs text-muted-foreground">500 codes from `new_codes.csv`</p>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </li>
               <li className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">Distribution Strategy "Holiday Rush" created</p>
                  <p className="text-xs text-muted-foreground">Targeting 3 regions</p>
                </div>
                <span className="text-xs text-muted-foreground">3 hours ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
