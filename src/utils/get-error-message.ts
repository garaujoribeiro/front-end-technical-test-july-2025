import { isAxiosError } from "axios";

/**
 * Extrai uma mensagem de erro amigável ao usuário de vários tipos de erro.
 * 
 * Esta função utilitária lida com diferentes cenários de erro e retorna mensagens
 * de erro apropriadas com a seguinte prioridade:
 * 1. Mensagem dos dados de resposta do erro Axios
 * 2. Mensagem do erro Axios
 * 3. Mensagem da instância de Error padrão
 * 4. Mensagem padrão de fallback em português
 * 
 * @param error - O objeto de erro para extrair a mensagem. Pode ser de qualquer tipo.
 * @returns Uma string contendo a mensagem de erro extraída ou uma mensagem padrão de fallback.
 * 
 * @example
 * ```typescript
 * try {
 *   await apiCall();
 * } catch (error) {
 *   const message = getErrorMessage(error);
 *   console.log(message); // "Network Error" ou "Ocorreu um erro inesperado."
 * }
 * ```
 */
export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (error.response?.data?.message) {
      return String(error.response.data.message);
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
};
