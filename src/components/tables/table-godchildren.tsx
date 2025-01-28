"use client";

import * as React from "react";

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

import { Button } from "@/components/ui/button";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 3160,
    status: "success",
  },
  {
    id: "3u1reuv4",
    amount: 2420,
    status: "success",
  },
  {
    id: "derv1ws0",
    amount: 8370,
    status: "processing",
  },
  {
    id: "5kma53ae",
    amount: 8740,
    status: "success",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => <div className="uppercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
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

export function TableCodchildren() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    // data: [],
    columns,
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
        <Button variant="outline" size="sm">
          Voir tout
          <ChevronRight className="-mr-1.5" />
        </Button>
      </CardHeader>
      <CardContent className="h-[200px]">
        {/* <CardContent className="overflow-scroll h-[200px]"> */}
        {/* <CardContent className="overflow-y-scroll h-full"> */}
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
          <TableBody className="">
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
              <TableRow className="h-full mt-2 overflow-hidden bg-black">
                {/* <TableRow className="h-[150px]"> */}
                {/* <TableRow className="h-[50vh]"> */}
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
