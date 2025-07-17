import { createQueryKeys } from "@/utils/query-keys-factory";

export const usersQueryKeys = createQueryKeys("users", {
  list: () => [],
  error: () => ["error"], // isso aqui nao deveria existir, mas é para simular o erro
  detail: (id: string) => [id],
});
