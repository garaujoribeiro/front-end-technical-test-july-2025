/* eslint-disable @typescript-eslint/no-explicit-any */
type QueryKeyFactory<T extends Record<string, (...args: any[]) => any>> = {
  all: () => string[];
} & {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<T[K]>;
};

/**
 * Cria uma fábrica de chaves de consulta para organizar e gerar chaves de consulta consistentes.
 * 
 * @template T - Um tipo de registro onde os valores são funções que retornam arrays de qualquer tipo
 * @param prefix - A string de prefixo base para todas as chaves de consulta
 * @param keys - Um objeto contendo pares chave-valor onde os valores são funções que geram segmentos de chave de consulta
 * @returns Um objeto QueryKeyFactory com um método 'all' e métodos dinâmicos baseados nas chaves fornecidas
 * 
 * @example
 * ```typescript
 * const userKeys = createQueryKeys('users', {
 *   list: () => [],
 *   detail: (id: string) => [id],
 *   posts: (id: string, status: string) => [id, 'posts', status]
 * });
 * 
 * userKeys.all(); // ['users']
 * userKeys.list(); // ['users', 'list']
 * userKeys.detail('123'); // ['users', 'detail', '123']
 * userKeys.posts('123', 'published'); // ['users', 'posts', '123', 'posts', 'published']
 * ```
 */
export function createQueryKeys<
  T extends Record<string, (...args: any[]) => any>
>(prefix: string, keys: T): QueryKeyFactory<T> {
  return {
    all: () => [prefix],
    ...Object.fromEntries(
      Object.entries(keys).map(([key, fn]) => [
        key,
        (...args: any[]) => [prefix, key, ...fn(...args)],
      ])
    ),
  } as QueryKeyFactory<T>;
}
