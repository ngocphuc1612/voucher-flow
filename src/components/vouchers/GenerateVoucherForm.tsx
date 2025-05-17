"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { generateVoucherAction } from "@/lib/actions";
import React from "react";

const formSchema = z.object({
  voucherCode: z.string().optional(),
  expirationDate: z.date({
    required_error: "An expiration date is required.",
  }),
});

type GenerateVoucherFormValues = z.infer<typeof formSchema>;

const initialState = {
  message: "",
  status: "",
};

export function GenerateVoucherForm() {
  const [state, formAction] = useFormState(generateVoucherAction, initialState);
  const { toast } = useToast();

  const form = useForm<GenerateVoucherFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucherCode: "",
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days from now
    },
  });
  
  React.useEffect(() => {
    if (state?.message) {
      if (state.status === "success") {
        toast({
          title: "Success",
          description: state.message,
        });
        form.reset();
      } else if (state.status === "error") {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        <FormField
          control={form.control}
          name="voucherCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voucher Code (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., SUMMER2024 (leave blank to auto-generate)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiration Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) } // Disable past dates
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-5 w-5" />
          Generate Voucher
        </Button>
      </form>
    </Form>
  );
}
