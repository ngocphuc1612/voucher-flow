import { UploadVoucherForm } from "@/components/vouchers/UploadVoucherForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UploadVoucherPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground">Upload Vouchers via CSV</CardTitle>
          <CardDescription>
            Import multiple voucher codes by uploading a CSV file. Ensure the file is formatted correctly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadVoucherForm />
        </CardContent>
      </Card>
    </div>
  );
}
