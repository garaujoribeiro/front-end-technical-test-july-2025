import { server } from "@/lib/axios";
import { API_ENDPOINTS } from "@/utils/endpoints";
import { User } from "./user-types";
import { AxiosResponse } from "axios";

/**
 * Busca todos os usuários do servidor.
 */
export async function getAllUsers(): Promise<AxiosResponse<User[]>> {
  return await server.get<User[]>(API_ENDPOINTS.users);
}

/**
 * Busca um usuário pelo seu identificador único.
 *
 * @param id - O identificador único do usuário a ser buscado
 */
export async function getUserById(id: number): Promise<AxiosResponse<User>> {
  return await server.get<User>(`${API_ENDPOINTS.users}/${id}`);
}
