"use client";

import { useFormState } from "react-dom";
import React from "react";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { uploadVoucherAction } from "@/lib/actions";

const initialState = {
  message: "",
  status: "",
};

export function UploadVoucherForm() {
  const [state, formAction] = useFormState(uploadVoucherAction, initialState);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);


  React.useEffect(() => {
    if (state?.message) {
      if (state.status === "success") {
        toast({
          title: "Success",
          description: state.message,
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input
        }
      } else if (state.status === "error") {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="csvFile">CSV File</Label>
        <Input id="csvFile" name="csvFile" type="file" accept=".csv" ref={fileInputRef} required />
        <p className="text-sm text-muted-foreground">
          Upload a CSV file containing voucher codes.
        </p>
      </div>
      <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <UploadCloud className="mr-2 h-5 w-5" />
        Upload CSV
      </Button>
    </form>
  );
}
