import { createQueryKeys } from "@/utils/query-keys-factory";

export const usersQueryKeys = createQueryKeys("users", {
  list: () => [],
  detail: (id: string) => [id],
});
