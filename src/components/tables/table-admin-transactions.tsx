"use client";

import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  CheckCheck,
  Inbox,
  Loader,
  MoreHorizontal,
  Trash,
  X,
} from "lucide-react";
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
import { PackData, Transaction } from "@/types";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { enqueueSnackbar } from "notistack";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue("id") as string).slice(0, 5)}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div className="text-left">Type</div>,
    cell: ({ row }) => {
      const type = row.getValue("type");
      let frenchType = "";

      switch (type) {
        case "investment":
          frenchType = "Investissement";
          break;
        case "withdraw":
          frenchType = "Retrait";
          break;

        default:
          frenchType = "N/A";
      }

      return <div className="Capitalize">{frenchType}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const packId = (row.getValue("pack") as PackData)?.id;

      return (
        <Badge
          variant="outline"
          className={cn({
            "border-green-400 text-green-400":
              status === "success" || (status === "approved" && !packId),
            "border-blue-400 text-blue-400": status === "approved" && packId,
            "border-amber-400 text-amber-400": status === "pending",
            "border-red-400 text-red-400": status === "rejected",
          })}
        >
          {(() => {
            switch (status) {
              case "success":
                return "Succès";
              case "pending":
                return "En attente...";
              case "approved":
                if (packId) {
                  return "En cours...";
                } else {
                  return "Approuvé";
                }
              case "rejected":
                return "Rejeté";
              default:
                return "N/A";
            }
          })()}
        </Badge>
      );
    },
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
      const pack = row.getValue("pack") as PackData;
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
      let frenchType = "";

      switch (type) {
        case "main":
          frenchType = "Principal";
          break;
        case "affiliate":
          frenchType = "Parrainage";
          break;

        default:
          frenchType = "N/A";
      }

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
      return <TableAction transaction={transaction} />;
    },
  },
];

type TableActionProps = {
  transaction: Transaction;
};

export function TableAction(props: TableActionProps) {
  const { transaction } = props;

  const handleTransactionStatus = async (status: "approved" | "rejected") => {
    try {
      const res = await fetch("/api/admin/transactions", {
        method: "POST",
        body: JSON.stringify({
          status,
          transaction,
          type: "update-transaction-satuts",
        }),
      });

      const json = await res.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("transaction-admin-updated"));
      }

      enqueueSnackbar(json?.message, {
        autoHideDuration: 5000,
        variant: json?.state ? "success" : "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } finally {
    }
  };

  const handleDeleteTransaction = async () => {
    try {
      const res = await fetch("/api/admin/transactions", {
        method: "POST",
        body: JSON.stringify({
          transaction,
          type: "delete-transaction",
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
    } finally {
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {transaction.status === "pending" && (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleTransactionStatus("approved")}
            >
              <CheckCheck /> Approuver la transaction
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => handleTransactionStatus("rejected")}
            >
              <X /> Rejeter la transaction
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem
          className="text-red-500 cursor-pointer"
          onClick={handleDeleteTransaction}
        >
          <Trash /> Supprimer la transaction
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type TableAdminTransactionsProps = {
  loading?: boolean;
  transactions?: Transaction[];
};

export function TableAdminTransactions(props: TableAdminTransactionsProps) {
  const { loading, transactions } = props;
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
          placeholder="Filtrer par type..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("id")?.setFilterValue(event.target.value);
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
                  {loading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader className="mx-auto animate-spin" />
                      <p>Chargement des transactions...</p>
                    </div>
                  ) : data.length ? null : (
                    <div className="flex flex-col items-center gap-2">
                      <Inbox className="mx-auto" />
                      <p>Aucune transaction trouvé</p>
                    </div>
                  )}
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
              size="icon"
              variant="outline"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeftToLine />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeft />
            </Button>
            <span className="flex items-center gap-1 text-sm">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} sur{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <Button
              size="icon"
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRight />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRightToLine />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
