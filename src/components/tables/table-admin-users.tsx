"use client";

import { CheckCheck, Eye, Inbox, MoreHorizontal, Trash, X } from "lucide-react";
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
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/types";
import { cn } from "@/lib/utils";
import { storage } from "@/lib/firebase";
import { useSnackbar } from "notistack";

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue("id") as string)?.slice(0, 5)}
      </div>
    ),
  },
  {
    accessorKey: "firstname",
    header: () => <div className="text-left">Prénom</div>,
    cell: ({ row }) => <div>{row.getValue("firstname")}</div>,
  },
  {
    accessorKey: "lastname",
    header: () => <div className="text-left">Nom</div>,
    cell: ({ row }) => <div>{row.getValue("lastname")}</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: () => <div className="text-left">Rôle</div>,
    cell: ({ row }) => {
      const role = row.getValue("role");
      const frenchRole = role === "admin" ? "Administrateur" : "Utilisateur";
      return <div>{frenchRole}</div>;
    },
  },
  {
    accessorKey: "kyc.status",
    header: () => <div className="text-left">Statut KYC</div>,
    cell: ({ row }) => {
      const kycStatus = row.original.kyc.status;
      return (
        <Badge
          variant="outline"
          className={cn({
            "border-green-400 text-green-400": kycStatus === "approved",
            "border-amber-400 text-amber-400": kycStatus === "pending",
            "border-red-400 text-red-400": kycStatus === "rejected",
          })}
        >
          {kycStatus === "approved"
            ? "Approuvé"
            : kycStatus === "pending"
            ? "En attente"
            : "Rejeté"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-right">Date de création</div>,
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
      const user: UserInfo = row.original;
      return <TableAction user={user} />;
    },
  },
];

type TableActionProps = {
  user: UserInfo;
};

export function TableAction(props: TableActionProps) {
  const { user } = props;
  const { enqueueSnackbar } = useSnackbar();

  const handleViewKYC = async () => {
    const kycfile = user?.kyc?.file;
    if (!kycfile) return;

    try {
      const storageRef = ref(storage, kycfile);
      const url = await getDownloadURL(storageRef);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Erreur lors de la récupération du fichier KYC:", error);
    }
  };

  const handleApproveKYC = async () => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
          user,
          action: "kyc",
          kyc: "approved",
        }),
      });

      const json = await res.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("user-admin-updated"));
        enqueueSnackbar("KYC approuvé avec succès", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        enqueueSnackbar("Le KYC n'a pas pu être approuvé, veuillez réessayer", {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    } finally {
    }
  };

  const handleRejectedKYC = async () => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
          user,
          action: "kyc",
          kyc: "rejected",
        }),
      });

      const json = await res.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("user-admin-updated"));
        enqueueSnackbar("Le KYC a été rejeté avec succès", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        enqueueSnackbar(
          "Une erreur est survenue lors du rejet du KYC, veuillez réessayer",
          {
            variant: "error",
            preventDuplicate: true,
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
          }
        );
      }
    } finally {
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
          user,
          action: "user",
          kyc: "rejected",
        }),
      });

      const json = await res.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("user-admin-updated"));
        enqueueSnackbar("L'utilisateur a été supprimé avec succès", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        enqueueSnackbar(
          "Échec de la suppression de l'utilisateur, veuillez réessayer",
          {
            variant: "error",
            preventDuplicate: true,
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
          }
        );
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
        {user?.kyc?.status !== "approved" && (
          <>
            <DropdownMenuItem>
              <Button
                variant="default"
                className="w-full"
                onClick={handleViewKYC}
              >
                <Eye className="mr-2 h-4 w-4" /> Voir KYC
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Button
                variant="default"
                onClick={handleApproveKYC}
                className="w-full bg-green-500 hover:bg-green-500/90"
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Accepter KYC
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className="w-full"
                variant="destructive"
                onClick={handleRejectedKYC}
              >
                <X className="mr-2 h-4 w-4" />
                Refuser KYC
              </Button>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem>
          <Button
            className="w-full"
            variant="destructive"
            onClick={handleDeleteUser}
          >
            <Trash className="mr-2 h-4 w-4" />
            Supprimer l&apos;utilisateur
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type TableAdminUsersProps = {
  users?: UserInfo[];
};

export function TableAdminUsers(props: TableAdminUsersProps) {
  const { users } = props;
  const [data, setData] = useState<UserInfo[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

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
                  <p>Aucun utilisateur trouvé</p>
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
