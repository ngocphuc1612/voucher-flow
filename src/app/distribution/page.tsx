import { DistributionStrategyForm } from "@/components/distribution/DistributionStrategyForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DistributionStrategyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">AI Voucher Distribution Strategy</CardTitle>
          <CardDescription>
            Get AI-powered recommendations for optimal voucher distribution. Provide details about your voucher and historical data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DistributionStrategyForm />
        </CardContent>
      </Card>
    </div>
  );
}
