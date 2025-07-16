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
import { PlusIcon } from "lucide-react";
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
  createUserFormDefaultValues,
  createUserSchema,
  CreateUserSchema,
} from "@/schemas/user/create-user.schema";
import { usersQueryKeys } from "@/queries/users-queries";
import { getErrorMessage } from "@/utils/get-error-message";
import { useState } from "react";

export default function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: createUserFormDefaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateUserSchema) => {
      const promise: Promise<{ data: CreateUserSchema }> = new Promise(
        (resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.5) {
              reject(new Error("Erro ao adicionar o usuário"));
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
    onSuccess(response: { data: CreateUserSchema }) {
      queryClient.setQueryData(
        usersQueryKeys.list(),
        (oldData: CreateUserSchema[]) => {
          return [
            ...oldData ?? [],
            // O objeto está dessa forma para simular a estrutura de dados que o backend retornaria
            {
              name: response.data.name,
              email: response.data.email,
              address: { city: response.data.cidade },
            },
          ];
        }
      );

      toast.success("Usuário adicionado com sucesso!");
      setOpen(false);
      form.reset(createUserFormDefaultValues);
    },
  });

  return (
    <Dialog open={open} onOpenChange={(open)=>{
      setOpen(open);
      if (!open) {
        form.reset(createUserFormDefaultValues);
      }
    }}>
      {/* Botao para abrir o modal */}
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusIcon />
          <span>Novo Usuário</span>
        </Button>
      </DialogTrigger>

      {/* Conteúdo do modal */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do usuário para adicionar um novo registro.
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
