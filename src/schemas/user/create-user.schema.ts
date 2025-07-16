import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email("O e-mail deve ser válido"),
  cidade: z.string().optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const createUserFormDefaultValues: CreateUserSchema = {
  name: "",
  email: "",
  cidade: "",
};
