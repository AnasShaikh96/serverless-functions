import z from "zod";

const usageSchema = z.object({
  id: z.string().uuid(),
  usage_type: z.enum(["Update", "Get", "Post"]),
  log_status: z.enum(["200", "400", "500"]),
  output: z.string().min(1),
  execution_time: z.number().int().min(0),
  times_used: z.number().int().min(0),
  access_time: z.string(),
  access_ips: z.array(z.string().ip()),
  user: z.string().uuid(),
  function: z.string().uuid(),
});

const exampleUsage = {
  id: "d7031bff-2f2e-45d7-8d32-79e2ed7026d3",
  usage_type: "Get",
  log_status: "200",
  output: "Success",
  execution_time: 120,
  times_used: 10,
  access_time: "2023-10-11T10:00:00Z",
  access_ips: ["192.168.1.1", "203.0.113.5"],
  user: "a1d6b9a1-fc0a-43ab-81f6-d3c930b9a22c",
  function: "b8a56b43-f7e0-44cf-bbfa-0edc9c0cbba7",
};

const validatedUsage = usageSchema.parse(exampleUsage);
