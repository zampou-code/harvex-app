"use client";

import { CheckCheck, Inbox, MoreHorizontal, Trash, X } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Transaction } from "@/types";
import { cn } from "@/lib/utils";
import { useSnackbar } from "notistack";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "type",
    header: () => <div className="text-left">Type</div>,
    cell: ({ row }) => {
      const type = row.getValue("type");
      const frenchType =
        type === "investment"
          ? "Investissement"
          : type === "deposit"
          ? "Dépôt"
          : "Retrait";
      return <div className="Capitalize">{frenchType}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={cn({
          "border-green-400 text-green-400":
            row.getValue("status") === "success",
          "border-amber-400 text-amber-400":
            row.getValue("status") === "pending",
          "border-red-400 text-red-400": row.getValue("status") === "rejected",
        })}
      >
        {(() => {
          switch (row.getValue("status")) {
            case "success":
              return "Succès";
            case "pending":
              if ((row.getValue("pack") as any)?.id) {
                return "En cours...";
              } else {
                return "En attente...";
              }
            case "rejected":
              return "Rejeté";
            default:
              return "Expiré";
          }
        })()}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-left">Montant</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("fr-CF", {
        style: "currency",
        currency: "XOF",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "pack",
    header: () => <div className="text-left">Pack</div>,
    cell: ({ row }) => {
      const pack = row.getValue("pack") as any;
      return (
        <div className="text-left font-medium capitalize">
          {pack?.name || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "account",
    header: () => <div className="text-left">Compte</div>,
    cell: ({ row }) => {
      const type = row.getValue("account");
      const frenchType =
        type === "main"
          ? "Principal"
          : type === "affiliate"
          ? "Parrainage"
          : "N/A";
      return <div>{frenchType}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formattedDate = date.toLocaleDateString("fr-FR");
      return <div className="capitalize text-right">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const transaction: Transaction = row.original;
      return !transaction?.pack?.id ? (
        <TableAction transaction={transaction} />
      ) : null;
    },
  },
];

type TableActionProps = {
  transaction: Transaction;
};

export function TableAction(props: TableActionProps) {
  const { transaction } = props;
  const { enqueueSnackbar } = useSnackbar();

  const handleApproveTransaction = async () => {
    try {
      const res = await fetch("/api/admin/transactions", {
        method: "POST",
        body: JSON.stringify({
          transaction,
          action: "update",
          status: "success",
        }),
      });

      const json = await res.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("transaction-admin-updated"));
        enqueueSnackbar("Transaction approuvée avec succès", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        enqueueSnackbar("Échec de l'approbation de la transaction", {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    } catch (error) {}
  };

  const handleRejectedTransaction = async () => {
    try {
      const res = await fetch("/api/admin/transactions", {
        method: "POST",
        body: JSON.stringify({
          transaction,
          action: "update",
          status: "rejected",
        }),
      });

      const json = await res.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("transaction-admin-updated"));
        enqueueSnackbar("Transaction rejetée avec succès", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        enqueueSnackbar("Échec du rejet de la transaction", {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    } catch (error) {}
  };

  const handleDeleteTransaction = async () => {
    try {
      const res = await fetch("/api/admin/transactions", {
        method: "POST",
        body: JSON.stringify({
          transaction,
          action: "transaction",
        }),
      });

      const json = await res.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("transaction-admin-updated"));
        enqueueSnackbar("Transaction annulée avec succès", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        enqueueSnackbar("Échec de l'annulation de la transaction", {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    } catch (error) {}
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Button
            variant="default"
            onClick={handleApproveTransaction}
            className="bg-green-500 hover:bg-green-500/90"
          >
            <CheckCheck /> Approuver la transaction
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={handleRejectedTransaction} variant="destructive">
            <X />
            Refuser la transaction
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={handleDeleteTransaction} variant="destructive">
            <Trash /> Annuler la transaction
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type TableAdminTransactionsProps = {
  transactions?: Transaction[];
};

export function TableAdminTransactions(props: TableAdminTransactionsProps) {
  const { transactions } = props;
  const [data, setData] = useState<Transaction[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    if (transactions) {
      setData(transactions);
    }
  }, [transactions]);

  const table = useReactTable({
    data: data,
    columns,
    initialState: {
      pagination: {
        pageSize: 100,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer par montant..."
          value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("type")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-[50vh]">
                <TableCell
                  colSpan={columns.length}
                  className="text-center hover:bg-white"
                >
                  <Inbox className="mx-auto" />
                  <p>Pas encore d'historique</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              Première
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Précédent
            </Button>
            <span className="flex items-center gap-1 text-sm">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} sur{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Suivant
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Dernière
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
