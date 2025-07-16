/**
 * Converte um pathname em um rótulo legível para propósitos de navegação ou exibição.
 * 
 * @param pathname - A string do pathname a ser convertida em rótulo. Deve ser uma string não vazia.
 * @returns Um rótulo localizado correspondente ao pathname fornecido.
 * 
 * @throws {Error} Lança um erro se o pathname não for uma string ou estiver vazio.
 * 
 * @example
 * ```typescript
 * pathnameLabel("/"); // Retorna "Usuários"
 * pathnameLabel("/unknown"); // Retorna "Página em construção"
 * pathnameLabel(""); // Lança Error
 * pathnameLabel(null); // Lança Error
 * ```
 */
export const pathnameLabel = (pathname: string | null): string => {
  if (typeof pathname !== "string" || pathname === "") {
    throw new Error("O pathname deve ser uma string não vazia.");
  }
  switch (pathname) {
    case "/":
      return "Usuários";
    default:
      return "Página em construção";
  }
};
