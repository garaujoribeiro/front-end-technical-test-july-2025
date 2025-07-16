"use client";

import { User } from "@/services/user/user-types";
import { createContext, useReducer, useContext, ReactNode } from "react";

type State = {
  modalType: ModalType | null;
};

export enum ModalType {
  EDIT = "EDIT",
  DELETE = "DELETE",
}

type Action =
  | { type: "OPEN_DIALOG"; modalType: ModalType }
  | { type: "CLOSE_DIALOG" };

const UserDialogStateContext = createContext<State | undefined>(undefined);
const UserDialogDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_DIALOG":
      return { modalType: action.modalType };
    case "CLOSE_DIALOG":
      return { modalType: null };
    default:
      return state;
  }
}

export function openModalAction({
  modalType,
}: {
  row: User;
  modalType: ModalType;
}): Action {
  return {
    type: "OPEN_DIALOG",
    modalType,
  };
}

export function closeModalAction(): Action {
  return {
    type: "CLOSE_DIALOG",
  };
}

/**
 * Componente provedor que gerencia o estado do diálogo e o contexto de dispatch para a aplicação.
 *
 * Este componente envolve componentes filhos com gerenciamento de estado de diálogo usando React Context.
 * Ele fornece tanto o estado atual do diálogo quanto a função dispatch para modificar esse estado
 * através da árvore de componentes.
 *
 * @param props - As propriedades do componente
 * @param props.children - Nós React a serem envolvidos com os provedores de contexto do diálogo
 *
 * @returns Elemento JSX que fornece estado do diálogo e contexto de dispatch para seus filhos
 *
 * @example
 * ```tsx
 * <UserDialogProvider>
 *   <MeuComponente />
 * </UserDialogProvider>
 * ```
 */
export function UserDialogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    modalType: null,
  });

  return (
    <UserDialogStateContext.Provider value={state}>
      <UserDialogDispatchContext.Provider value={dispatch}>
        {children}
      </UserDialogDispatchContext.Provider>
    </UserDialogStateContext.Provider>
  );
}

export function useUserDialogState() {
  const context = useContext(UserDialogStateContext);
  if (!context)
    throw new Error(
      "useUserDialogState must be used within UserDialogProvider"
    );
  return context;
}

export function useUserDialogDispatch() {
  const context = useContext(UserDialogDispatchContext);
  if (!context)
    throw new Error(
      "useUserDialogDispatch must be used within UserDialogProvider"
    );
  return context;
}
