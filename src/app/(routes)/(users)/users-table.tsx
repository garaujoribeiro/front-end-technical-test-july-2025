"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { usersTableColumns } from "./users-table-columns";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/services/user/user-types";
import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "@/queries/users-queries";
import { getAllUsers } from "@/services/user/user-service";
import AddUserDialog from "./dialogs/add-user-dialog";
import { UserDialogProvider } from "./dialogs/user-dialog-context";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/utils/get-error-message";
import { sleep } from "@/utils/sleep";

export function UsersDataTable({ initialData }: { initialData: User[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const pathname = usePathname();

  const { data, isLoading, status, isFetching } = useQuery({
    queryKey: pathname.includes("users-error")
      ? usersQueryKeys.error()
      : usersQueryKeys.list(),
    queryFn: async () => {
      try {
        if (pathname.includes("users-error")) {
          await sleep(5000); // Simula um atraso de 2 segundos
          throw new Error("Erro ao buscar usuários");
        }
        const response = await getAllUsers();
        return response.data;
      } catch (error) {
        toast.error(getErrorMessage(error));
        return [];
      }
    },
    initialData: initialData,
    staleTime: initialData.length > 0 ? 1000 : 0,
  });

  console.log(status)

  const table = useReactTable({
    data: data || [],
    columns: usersTableColumns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      columnFilters,
    },
  });

  const rows = table.getRowModel().rows;
  const emptyRows = table.getState().pagination.pageSize - rows.length;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por nome..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="ml-4">
          <AddUserDialog />
        </div>
      </div>

      <div className="rounded-md border">
        {/* Cabeçalho da tabela */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* Corpo da tabela */}
          <TableBody>
            {data.length === 0 && isFetching ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {usersTableColumns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      if (cell.id.includes("actions")) {
                        return (
                          <UserDialogProvider key={cell.id}>
                            <TableCell>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          </UserDialogProvider>
                        );
                      }
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                {Array.from({ length: emptyRows }).map((_, i) => (
                  <TableRow key={`empty-${i}`} className="opacity-0">
                    {usersTableColumns.map((_, j) => (
                      <TableCell key={j}>-</TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={usersTableColumns.length}
                  className="h-24 text-center"
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center py-5">
        <TablePagination table={table} />
      </div>
    </div>
  );
}
