import z from "zod";

export type FunctionType = z.infer<typeof functionSchema>;

export const functionSchema = z.object({
  type: z.enum(["http", "schedule", "cmd"]),
  runtime: z.enum(["Node.18", "Node.20"]),
  requestType: z.enum(["GET", "POST"]),
  functionName: z.string()
});
