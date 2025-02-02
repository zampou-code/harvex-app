"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Inbox } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction, TransactionSummary } from "@/types";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
      return <div className="capitalize">{frenchType}</div>;
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
          "border-red-400 text-red-400":
            row.getValue("status") === "rejected" ||
            row.getValue("status") === "expired",
        })}
      >
        {row.getValue("status") === "success"
          ? "Succès"
          : row.getValue("status") === "pending"
          ? "En cours..."
          : row.getValue("status") === "rejected"
          ? "Rejeté"
          : "Expiré"}
      </Badge>
    ),
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">Montant</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("fr-CF", {
        style: "currency",
        currency: "XOF",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

type TableInvestmentprops = {
  transactions?: TransactionSummary;
};

export function TableInvestment(props: TableInvestmentprops) {
  const { transactions } = props;
  const [data, setData] = useState<Transaction[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (transactions?.transactions) {
      setData(transactions.transactions);
    }
  }, [transactions]);

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 11,
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
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5">
        <CardTitle className="text-lg font-bold">
          Historique des transactions
        </CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/historical">
            Voir tout
            <ChevronRight className="-mr-1.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
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
              <TableRow className="h-[48vh]">
                <TableCell
                  colSpan={columns.length}
                  className="text-center hover:bg-white"
                >
                  <Inbox className="mx-auto" />
                  <p>Pas encore de transaction</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
