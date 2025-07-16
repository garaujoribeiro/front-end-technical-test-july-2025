import { z } from "zod";

export const editUserSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.email("O e-mail deve ser válido"),
  cidade: z.string().optional(),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
