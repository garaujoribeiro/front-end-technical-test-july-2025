"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/services/user/user-types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  useCallback,
  useState,
} from "react";
import EditUserDialog from "./dialogs/edit-user-dialog";
import DeleteUserDialog from "./dialogs/delete-user-dialog";
import {
  closeModalAction,
  ModalType,
  openModalAction,
  useUserDialogDispatch,
  useUserDialogState,
} from "./dialogs/user-dialog-context";

/**
 * Definições de colunas para a tabela de dados de usuários.
 *
 * Define a estrutura e configuração para exibir dados de usuários em formato de tabela,
 * incluindo cabeçalhos de colunas e chaves de acesso para informações de nome, email e cidade.
 *
 * @remarks
 * A informação da cidade é acessada através do caminho de propriedade aninhada "address.city" do objeto User.
 */
export const usersTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address.city",
    header: "Cidade",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const dispatch = useUserDialogDispatch();
      const { modalType } = useUserDialogState();

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() => {
                  dispatch(
                    openModalAction({
                      row: row.original,
                      modalType: ModalType.EDIT,
                    })
                  );
                }}
              >
                Editar usuário
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={() => {
                  dispatch(
                    openModalAction({
                      row: row.original,
                      modalType: ModalType.DELETE,
                    })
                  );
                }}
              >
                Excluir usuário
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditUserDialog
            open={modalType === ModalType.EDIT}
            user={row.original}
            onOpenChange={(open) => {
              if (!open) {
                dispatch(closeModalAction());
              }
            }}
          />

          <DeleteUserDialog
            open={modalType === ModalType.DELETE}
            id={row.original.id}
            onOpenChange={(open) => {
              if (!open) {
                dispatch(closeModalAction());
              }
            }}
          />
        </>
      );
    },
  },
];
