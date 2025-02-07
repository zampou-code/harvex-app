"use client";

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
import { Inbox, Loader } from "lucide-react";
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
      const frenchType = type === "main" ? "Principal" : "Parrainage";
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
];

type TableHistoricalInvestmentProps = {
  loading?: boolean;
  transactions?: Transaction[];
};

export function TableHistoricalInvestment(
  props: TableHistoricalInvestmentProps
) {
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
        pageSize: 15,
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
                  {loading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader className="mx-auto animate-spin" />
                      <p>Chargement de l&apos;historique...</p>
                    </div>
                  ) : data.length ? null : (
                    <div className="flex flex-col items-center gap-2">
                      <Inbox className="mx-auto" />
                      <p>Pas encore d&apos;historique</p>
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
