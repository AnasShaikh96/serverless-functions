import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  functions: z.array(z.string().uuid()),
  usage: z.array(z.string().uuid()),
  created_at: z.string(),
  updated_at: z.string().nullable(),
  refreshtoken: z.string(),
});

const exampleUser = {
  id: "a1d6b9a1-fc0a-43ab-81f6-d3c930b9a22c",
  name: "John Doe",
  email: "john.doe@example.com",
  password: "hashedPasswordStringHere",
  functions: ["b8a56b43-f7e0-44cf-bbfa-0edc9c0cbba7"],
  usage: ["d7031bff-2f2e-45d7-8d32-79e2ed7026d3"],
  created_at: "2023-10-11T10:00:00Z",
  updated_at: null,
  refreshtoken: "random_refresh_token_string",
};

const validatedUser = userSchema.parse(exampleUser);
