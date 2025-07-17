/**
 * Cria uma promise que resolve após um atraso especificado.
 *
 * @param ms - O número de milissegundos para aguardar antes de resolver a promise
 * @returns Uma promise que resolve após o atraso especificado
 *
 * @example
 * ```typescript
 * // Aguardar por 1 segundo
 * await sleep(1000);
 *
 * // Usar em função async
 * async function acaoComAtraso() {
 *   console.log('Iniciando...');
 *   await sleep(2000);
 *   console.log('Finalizado após 2 segundos!');
 * }
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
