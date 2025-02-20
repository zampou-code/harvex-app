"use client";

import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
  IdCard,
  Inbox,
  Loader,
  MoreHorizontal,
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
import { DialogShowKyc } from "@/components/dialog/dialog-show-kyc";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/types";
import { cn } from "@/lib/utils";

export type UsersKYCData = {
  user: UserInfo;
};

export const columns: ColumnDef<UsersKYCData>[] = [
  {
    id: "id",
    accessorFn: (row) => row.user.id,
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue("id") as string)?.slice(0, 5)}
      </div>
    ),
  },
  {
    id: "firstname",
    accessorFn: (row) => row.user.firstname,
    header: () => <div className="text-left">Prénom</div>,
    cell: ({ row }) => <div>{row.getValue("firstname")}</div>,
  },
  {
    id: "lastname",
    accessorFn: (row) => row.user.lastname,
    header: () => <div className="text-left">Nom</div>,
    cell: ({ row }) => <div>{row.getValue("lastname")}</div>,
  },
  {
    id: "email",
    accessorFn: (row) => row.user.email,
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    id: "phone",
    accessorFn: (row) => row.user.phone,
    header: () => <div className="text-left">Telephone</div>,
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    id: "country",
    accessorFn: (row) => row.user.country,
    header: () => <div className="text-left">Pays</div>,
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    id: "sex",
    accessorFn: (row) => row.user.sex,
    header: () => <div className="text-left">Sexe</div>,
    cell: ({ row }) => {
      const sex = row.getValue("sex");
      const frenchRole = sex === "F" ? "Femme" : "Homme";
      return <div>{frenchRole}</div>;
    },
  },

  {
    id: "kycStatus",
    accessorFn: (row) => row.user.kyc.status,
    header: () => <div className="text-left">Statut KYC</div>,
    cell: ({ row }) => {
      const kycStatus = row.original.user.kyc.status;
      const statusText =
        {
          pending: "En attente...",
          approved: "Approuvé",
          rejected: "Rejeté",
        }[kycStatus] || "N/A";

      return (
        <Badge
          variant="outline"
          className={cn({
            "border-green-400 text-green-400": kycStatus === "approved",
            "border-amber-400 text-amber-400": kycStatus === "pending",
            "border-red-400 text-red-400": kycStatus === "rejected",
          })}
        >
          {statusText}
        </Badge>
      );
    },
  },
  {
    id: "createdAt",
    accessorFn: (row) => row.user.created_at,
    header: () => <div className="text-right">Date de création</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString("fr-FR");
      return <div className="capitalize text-right">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return <TableAction data={data} />;
    },
  },
];

type TableActionProps = {
  data: UsersKYCData;
};

export function TableAction(props: TableActionProps) {
  const { data } = props;
  const [modal1, setModal1] = useState<boolean>(false);

  return (
    <DropdownMenu open={modal1 ? true : undefined}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {data.user.kyc.file && (
          <DialogShowKyc user={data.user} onOpenChange={setModal1}>
            <DropdownMenuItem>
              <IdCard /> Voir le KYC
            </DropdownMenuItem>
          </DialogShowKyc>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type TableAdminUsersKYCProps = {
  loading?: boolean;
  usersKYCData?: UsersKYCData[];
};

export function TableAdminUsersKYC(props: TableAdminUsersKYCProps) {
  const { usersKYCData, loading } = props;
  const [data, setData] = useState<UsersKYCData[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    if (usersKYCData) {
      setData(usersKYCData);
    }
  }, [usersKYCData]);

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
          placeholder="Filtrer par email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("email")?.setFilterValue(event.target.value);
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
                <TableRow key={row.id}>
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
                      <p>Chargement des utilisateurs...</p>
                    </div>
                  ) : data.length ? null : (
                    <div className="flex flex-col items-center gap-2">
                      <Inbox className="mx-auto" />
                      <p>Aucun utilisateur trouvé</p>
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
