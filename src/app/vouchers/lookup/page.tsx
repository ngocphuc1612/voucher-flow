import { LookupVoucherForm } from "@/components/vouchers/LookupVoucherForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LookupVoucherPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Voucher Lookup</CardTitle>
          <CardDescription>
            Enter a voucher code to view its current status and details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LookupVoucherForm />
        </CardContent>
      </Card>
    </div>
  );
}
