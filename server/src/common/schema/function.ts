import z from "zod";

export const functionSchema = z.object({
  id: z.string().uuid(),
  runtime: z.string().min(1),
  fn_name: z.string().min(1),
  fn_zip_file: z.string(),//z.instanceof(Buffer),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  update_count: z.number().int().min(0),
  response_url: z.string().url().optional(),
  owner: z.string().uuid(),
  usage: z.string().uuid(),
});


export const createFunctionSchema = functionSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  update_count: true,
  usage: true,
  response_url:true
})

export type CreateFunctionType = z.infer<typeof createFunctionSchema>


export const updateFunctionSchema = functionSchema.pick({
  fn_name: true,
  fn_zip_file: true
})

export type UpdateFunctionType = z.infer<typeof updateFunctionSchema>


const exampleFunction = {
  id: "b8a56b43-f7e0-44cf-bbfa-0edc9c0cbba7",
  runtime: "Node.js",
  fn_name: "myFunction",
  fn_zip_file: Buffer.from("function zip file content"),
  created_at: "2023-10-11T10:00:00Z",
  updated_at: null,
  update_count: 5,
  response_url: "https://example.com/response",
  owner: "a1d6b9a1-fc0a-43ab-81f6-d3c930b9a22c",
  usage: ["d7031bff-2f2e-45d7-8d32-79e2ed7026d3"],
};

// const validatedFunction = functionSchema.parse(exampleFunction);
