'use server';

/**
 * @fileOverview This file defines a Genkit flow to recommend voucher distribution strategies based on historical redemption data.
 *
 * - recommendDistributionStrategy - A function that takes voucher details and historical data to suggest an optimal distribution strategy.
 * - RecommendDistributionStrategyInput - The input type for the recommendDistributionStrategy function.
 * - RecommendDistributionStrategyOutput - The return type for the recommendDistributionStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendDistributionStrategyInputSchema = z.object({
  voucherType: z.string().describe('The type of voucher to distribute (e.g., discount, free item).'),
  voucherVolume: z.number().describe('The number of vouchers to distribute.'),
  historicalRedemptionData: z.string().describe('Historical data of voucher redemptions, including region, demographics, and time of redemption.'),
});
export type RecommendDistributionStrategyInput = z.infer<typeof RecommendDistributionStrategyInputSchema>;

const RecommendDistributionStrategyOutputSchema = z.object({
  recommendedRegions: z.array(z.string()).describe('A list of recommended regions for voucher distribution.'),
  rationale: z.string().describe('The AI rationale for the recommended distribution strategy.'),
});
export type RecommendDistributionStrategyOutput = z.infer<typeof RecommendDistributionStrategyOutputSchema>;

export async function recommendDistributionStrategy(
  input: RecommendDistributionStrategyInput
): Promise<RecommendDistributionStrategyOutput> {
  return recommendDistributionStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendDistributionStrategyPrompt',
  input: {schema: RecommendDistributionStrategyInputSchema},
  output: {schema: RecommendDistributionStrategyOutputSchema},
  prompt: `You are an expert marketing strategist specializing in voucher distribution.

  Based on the provided voucher details and historical redemption data, recommend the optimal regions to distribute the vouchers to maximize their impact.

  Voucher Type: {{{voucherType}}}
  Voucher Volume: {{{voucherVolume}}}
  Historical Redemption Data: {{{historicalRedemptionData}}}

  Consider factors such as redemption rates, demographics, and regional preferences.

  Provide a rationale for your recommendation.

  Output should be a JSON object containing a list of recommended regions and a rationale.
  `, // Ensure the prompt ends with instructions to produce a JSON object of the specified schema
});

const recommendDistributionStrategyFlow = ai.defineFlow(
  {
    name: 'recommendDistributionStrategyFlow',
    inputSchema: RecommendDistributionStrategyInputSchema,
    outputSchema: RecommendDistributionStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
