import { GenerateVoucherForm } from "@/components/vouchers/GenerateVoucherForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GenerateVoucherPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Generate New Voucher</CardTitle>
          <CardDescription>
            Create single or multiple vouchers with customizable properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GenerateVoucherForm />
        </CardContent>
      </Card>
    </div>
  );
}
