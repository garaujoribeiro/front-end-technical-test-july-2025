import { server } from "@/lib/axios";
import { API_ENDPOINTS } from "@/utils/endpoints";

/**
 * Busca todos os usuários da API.
 *
 * @returns {Promise<void>} Uma promise que resolve quando a chamada da API é concluída
 * @throws {Error} Quando a requisição da API falha ou ocorre um erro de rede
 */
export async function getAllUsers(): Promise<void> {
  await server.get(API_ENDPOINTS.users);
}

/**
 * Busca um usuário pelo seu identificador único.
 * 
 * @param id - O identificador único do usuário a ser buscado
 * @returns Uma Promise que resolve quando os dados do usuário são buscados
 * @throws Pode lançar um erro se a requisição da API falhar ou o usuário não for encontrado
 */
export async function getUserById(id: number): Promise<void> {
  await server.get(`${API_ENDPOINTS.users}/${id}`);
}
