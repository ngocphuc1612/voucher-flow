"use server";

import { z } from "zod";
import { recommendDistributionStrategy, type RecommendDistributionStrategyInput, type RecommendDistributionStrategyOutput } from "@/ai/flows/recommend-distribution-strategy";
import { revalidatePath } from "next/cache";

// Voucher Generation
const GenerateVoucherSchema = z.object({
  voucherCode: z.string().optional(),
  expirationDate: z.date(),
});

export async function generateVoucherAction(prevState: any, formData: FormData) {
  try {
    const parsedDate = new Date(formData.get("expirationDate") as string);
    if (isNaN(parsedDate.getTime())) {
        return { message: "Invalid expiration date.", status: "error" };
    }

    const validatedFields = GenerateVoucherSchema.safeParse({
      voucherCode: formData.get("voucherCode") || undefined,
      expirationDate: parsedDate,
    });

    if (!validatedFields.success) {
      return { message: "Invalid form data.", errors: validatedFields.error.flatten().fieldErrors, status: "error" };
    }

    // Simulate voucher generation
    const code = validatedFields.data.voucherCode || `VC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    console.log("Generated voucher:", code, "expires:", validatedFields.data.expirationDate.toISOString());
    
    revalidatePath("/vouchers/generate");
    return { message: `Voucher ${code} generated successfully.`, status: "success" };
  } catch (error) {
    console.error("Error generating voucher:", error);
    return { message: "Failed to generate voucher.", status: "error" };
  }
}

// Voucher Lookup
const LookupVoucherSchema = z.object({
  voucherCode: z.string().min(1, "Voucher code is required."),
});

export interface LookupResult {
  code: string;
  status: "Active" | "Redeemed" | "Expired" | "Not Found";
  expirationDate?: string;
  redemptionDate?: string;
}

export async function lookupVoucherAction(prevState: any, formData: FormData): Promise<{ message?: string; data?: LookupResult; status: "success" | "error" }> {
  try {
    const validatedFields = LookupVoucherSchema.safeParse({
      voucherCode: formData.get("voucherCode"),
    });

    if (!validatedFields.success) {
      return { message: "Invalid voucher code.", status: "error" };
    }

    const code = validatedFields.data.voucherCode.toUpperCase();
    // Simulate lookup
    let result: LookupResult;
    if (code === "VC-VALID") {
      result = { code, status: "Active", expirationDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0] };
    } else if (code === "VC-REDEEMED") {
      result = { code, status: "Redeemed", expirationDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], redemptionDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] };
    } else if (code === "VC-EXPIRED") {
      result = { code, status: "Expired", expirationDate: new Date(Date.now() - 86400000).toISOString().split('T')[0] };
    } else {
      result = { code, status: "Not Found" };
    }
    
    revalidatePath("/vouchers/lookup");
    return { data: result, status: "success" };
  } catch (error) {
    console.error("Error looking up voucher:", error);
    return { message: "Failed to lookup voucher.", status: "error" };
  }
}


// Voucher Upload
export async function uploadVoucherAction(prevState: any, formData: FormData) {
  try {
    const file = formData.get("csvFile") as File;
    if (!file || file.size === 0) {
      return { message: "Please select a CSV file to upload.", status: "error" };
    }
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        return { message: "Invalid file type. Please upload a CSV file.", status: "error" };
    }

    // Simulate file processing
    console.log("Received file:", file.name, "Type:", file.type, "Size:", file.size);
    // In a real app, you would parse the CSV here.
    
    revalidatePath("/vouchers/upload");
    return { message: `File ${file.name} uploaded successfully. (Simulated processing)`, status: "success" };
  } catch (error) {
    console.error("Error uploading voucher CSV:", error);
    return { message: "Failed to upload voucher CSV.", status: "error" };
  }
}


// Distribution Strategy
const DistributionStrategySchema = z.object({
  voucherType: z.string().min(1, "Voucher type is required."),
  voucherVolume: z.coerce.number().min(1, "Voucher volume must be at least 1."),
  historicalRedemptionData: z.string().min(1, "Historical data is required."),
});

export async function getDistributionStrategyAction(prevState: any, formData: FormData): Promise<{ message?: string; data?: RecommendDistributionStrategyOutput; errors?: any; status: "success" | "error" }> {
  try {
    const validatedFields = DistributionStrategySchema.safeParse({
      voucherType: formData.get("voucherType"),
      voucherVolume: formData.get("voucherVolume"),
      historicalRedemptionData: formData.get("historicalRedemptionData"),
    });

    if (!validatedFields.success) {
      return { message: "Invalid form data.", errors: validatedFields.error.flatten().fieldErrors, status: "error" };
    }

    const input: RecommendDistributionStrategyInput = validatedFields.data;
    const result = await recommendDistributionStrategy(input);
    
    revalidatePath("/distribution");
    return { data: result, status: "success" };
  } catch (error) {
    console.error("Error getting distribution strategy:", error);
    return { message: "Failed to get distribution strategy from AI.", status: "error" };
  }
}
