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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createUserSchema,
  CreateUserSchema,
} from "@/schemas/user/create-user.schema";
import { usersQueryKeys } from "@/queries/users-queries";
import { getErrorMessage } from "@/utils/get-error-message";
import { useState } from "react";
import { EditUserSchema } from "@/schemas/user/edit-user.schema";
import { User } from "@/services/user/user-types";

export default function EditUserDialog({
  open,
  onOpenChange,
  user: {
    id,
    name,
    email,
    address: { city: cidade },
  },
}: {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<EditUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name,
      email,
      cidade,
    } as EditUserSchema,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: EditUserSchema) => {
      const promise: Promise<{ data: EditUserSchema }> = new Promise(
        (resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.5) {
              reject(new Error("Erro ao atualizar o usuário"));
            } else {
              resolve({
                data,
              });
            }
          }, 10);
        }
      );
      return promise;
    },
    onError(error) {
      toast.error(getErrorMessage(error));
    },
    onSuccess(response: { data: EditUserSchema }) {
      queryClient.setQueryData(usersQueryKeys.list(), (oldData: User[]) => {
        return [
          ...(oldData.filter((user) => user.id !== id) ?? []),
          // é mais facil só filtrar e adicionar um novo usuario já que o put espera o objeto completo
          {
            id: id,
            name: response.data.name,
            email: response.data.email,
            address: { city: response.data.cidade },
          },
        ];
      });

      toast.success("Usuário atualizado com sucesso!");
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Conteúdo do modal */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Usuário</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do usuário para atualizar seu registro.
          </DialogDescription>
        </DialogHeader>

        {/* Formulário */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              mutation.mutate(data);
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="base-text text-neutral-1100">
                    Nome
                  </FormLabel>
                  <FormControl {...field}>
                    <Input
                      aria-invalid={error ? "true" : "false"}
                      autoComplete="new-name"
                      placeholder={"John Doe"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="base-text text-neutral-1100">
                    Email
                  </FormLabel>
                  <FormControl {...field}>
                    <Input
                      aria-invalid={error ? "true" : "false"}
                      autoComplete="new-email"
                      placeholder={"johndoe@mail.com"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cidade"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="base-text text-neutral-1100">
                    Cidade
                  </FormLabel>
                  <FormControl {...field}>
                    <Input
                      aria-invalid={error ? "true" : "false"}
                      autoComplete="city"
                      placeholder={"Fortaleza"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Salvar</Button>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
