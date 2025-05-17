"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { lookupVoucherAction, type LookupResult } from "@/lib/actions";

const formSchema = z.object({
  voucherCode: z.string().min(1, "Voucher code is required."),
});

type LookupVoucherFormValues = z.infer<typeof formSchema>;

const initialState: { message?: string; data?: LookupResult; status: "success" | "error" } = {
    status: "success" // Default to success to avoid initial error message
};


export function LookupVoucherForm() {
  const [state, formAction] = useFormState(lookupVoucherAction, initialState);
  const [lookupResult, setLookupResult] = React.useState<LookupResult | null>(null);
  const { toast } = useToast();

  const form = useForm<LookupVoucherFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucherCode: "",
    },
  });

  React.useEffect(() => {
    if (state?.message && state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
      setLookupResult(null);
    } else if (state?.data) {
      setLookupResult(state.data);
      if(state.data.status === "Not Found") {
        toast({
          title: "Not Found",
          description: `Voucher ${state.data.code} was not found.`,
          variant: "default",
        });
      } else {
         toast({
          title: "Success",
          description: `Voucher ${state.data.code} details retrieved.`,
        });
      }
    }
  }, [state, toast]);

  function getBadgeVariant(status: LookupResult['status']): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
      case "Active": return "default"; // default is often green or blue in themes
      case "Redeemed": return "secondary";
      case "Expired": return "destructive";
      default: return "outline";
    }
  }

  return (
    <div>
      <Form {...form}>
        <form action={formAction} className="space-y-8 mb-8">
          <FormField
            control={form.control}
            name="voucherCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voucher Code</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input placeholder="Enter voucher code (e.g., VC-VALID)" {...field} />
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Search className="mr-2 h-5 w-5" />
                      Lookup
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {lookupResult && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Voucher Details: {lookupResult.code}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant={getBadgeVariant(lookupResult.status)}>{lookupResult.status}</Badge>
            </div>
            {lookupResult.expirationDate && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Expiration Date:</span>
                <span>{lookupResult.expirationDate}</span>
              </div>
            )}
            {lookupResult.redemptionDate && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Redemption Date:</span>
                <span>{lookupResult.redemptionDate}</span>
              </div>
            )}
            {lookupResult.status === "Not Found" && (
                <p className="text-center text-muted-foreground">No details available for this voucher code.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
