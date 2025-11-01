import z from "zod";

const functionSchema = z.object({
  id: z.string().uuid(),
  runtime: z.string().min(1),
  fn_name: z.string().min(1),
  fn_zip_file: z.string(), //z.instanceof(Buffer),
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
  response_url: true,
});

export type CreateFunctionPayload = z.infer<typeof createFunctionSchema>;

export type LoginPayload = {
  email: string;
  password: string;
};

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string | null;
  refreshtoken: string | null;
};

export type LoginResponse = {
  status: number;
  message: string;
  data: UserResponse;
  accessToken?: string;
  refreshToken?: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  status: number;
  message: string;
  data?: unknown;
};

export type ProfileUser = {
  id: string;
  username: string;
  email: string | null;
};

export type GetProfileResponse = {
  status: number;
  message: string;
  data: ProfileUser[] | ProfileUser | null;
};

export type UpdateProfilePayload = {
  username?: string;
  email?: string;
  password?: string;
};

export type UpdateProfileResponse = {
  status: number;
  message: string;
  data?: unknown;
};

export type VerifyUserPayload = {
  email: string;
};

export type VerifyUserResponse = {
  status: number;
  message: string;
};

export type ResetPasswordPayload = {
  email: string;
  password: string;
};

export type ResetPasswordResponse = {
  status: number;
  message: string;
};


