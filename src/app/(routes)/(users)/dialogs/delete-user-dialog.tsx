"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usersQueryKeys } from "@/queries/users-queries";
import { getErrorMessage } from "@/utils/get-error-message";
import { useState } from "react";
import { User } from "@/services/user/user-types";

export default function DeleteUserDialog({
  id,
  open,
  onOpenChange,
}: {
  id: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.5) {
            reject(new Error("Erro ao excluir o usuário"));
          } else {
            resolve({});
          }
        }, 10);
      });
      return promise;
    },
    onError(error) {
      toast.error(getErrorMessage(error));
    },
    onSuccess() {
      queryClient.setQueryData(usersQueryKeys.list(), (oldData: User[]) => {
        return [...(oldData.filter((user) => user.id !== id) ?? [])];
      });

      toast.success("Usuário excluído com sucesso!");
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Usuário</DialogTitle>
          <DialogDescription className="sr-only">
            Ao deletar o usuário, todas as informações associadas a ele serão
            removidas permanentemente.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <DialogDescription>
            Ao deletar o usuário, todas as informações associadas a ele serão
            removidas permanentemente. Tem certeza de que deseja excluir este
            usuário?
          </DialogDescription>
          <DialogFooter>
            <Button
              className="text-destructive hover:text-destructive hover:bg-destructive/20"
              variant="ghost"
              type="submit"
            >
              Excluir
            </Button>

            <DialogClose asChild>
              <Button variant="default">Cancelar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
