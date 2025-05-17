"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { Lightbulb, Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getDistributionStrategyAction } from "@/lib/actions";
import type { RecommendDistributionStrategyOutput } from "@/ai/flows/recommend-distribution-strategy";

const formSchema = z.object({
  voucherType: z.string().min(1, "Voucher type is required."),
  voucherVolume: z.coerce.number().min(1, "Voucher volume must be at least 1."),
  historicalRedemptionData: z.string().min(10, "Historical data must be at least 10 characters."),
});

type DistributionStrategyFormValues = z.infer<typeof formSchema>;

const initialState: { message?: string; data?: RecommendDistributionStrategyOutput; errors?: any; status: "success" | "error" } = {
    status: "success"
};


export function DistributionStrategyForm() {
  const [state, formAction] = useFormState(getDistributionStrategyAction, initialState);
  const [recommendation, setRecommendation] = React.useState<RecommendDistributionStrategyOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<DistributionStrategyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucherType: "",
      voucherVolume: 1000,
      historicalRedemptionData: "",
    },
  });

  React.useEffect(() => {
    setIsLoading(false);
    if (state?.message && state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
      setRecommendation(null);
    } else if (state?.data) {
      setRecommendation(state.data);
      toast({
        title: "Recommendation Ready",
        description: "AI has generated a distribution strategy.",
      });
    }
    if (state?.errors) {
      // Handle field-specific errors if needed
      Object.entries(state.errors).forEach(([field, errors]) => {
        if (Array.isArray(errors) && errors.length > 0) {
          form.setError(field as keyof DistributionStrategyFormValues, { message: errors[0] });
        }
      });
    }
  }, [state, toast, form]);
  
  const onSubmit = async (data: DistributionStrategyFormValues) => {
    setIsLoading(true);
    setRecommendation(null); // Clear previous recommendation
    const formData = new FormData();
    formData.append("voucherType", data.voucherType);
    formData.append("voucherVolume", String(data.voucherVolume));
    formData.append("historicalRedemptionData", data.historicalRedemptionData);
    await formAction(formData); // Call the server action
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-8">
          <FormField
            control={form.control}
            name="voucherType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voucher Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 20% Discount, Free Coffee" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="voucherVolume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voucher Volume</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 10000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="historicalRedemptionData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Redemption Data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste or describe historical data (e.g., Region A: 500 redemptions, 60% female, age 25-35; Region B: 200 redemptions...)"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-5 w-5" />
            )}
            Get Recommendation
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Generating AI recommendation...</p>
        </div>
      )}

      {recommendation && !isLoading && (
        <Card className="shadow-md mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-primary">AI Recommended Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">Recommended Regions:</h3>
              {recommendation.recommendedRegions.length > 0 ? (
                <ul className="list-disc list-inside text-muted-foreground">
                  {recommendation.recommendedRegions.map((region) => (
                    <li key={region}>{region}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific regions recommended.</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Rationale:</h3>
              <p className="text-muted-foreground whitespace-pre-line">{recommendation.rationale}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
