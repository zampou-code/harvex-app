import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement, useState } from "react";

import { Button } from "@/components/ui/button";
import React from "react";
import { TableAdminTransactionsUser } from "@/components/tables/table-admin-transactions-user";
import { Transaction } from "@/types";

type DialogShowHistoricalProps = {
  children: ReactElement;
  transactions: Transaction[];
  onOpenChange: (open: boolean) => void;
};

export function DialogShowHistorical(props: DialogShowHistoricalProps) {
  const { children, onOpenChange, transactions } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        onOpenChange(value);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="block min-w-full h-[100vh] bg-[#71717a]/30 rounded-[0px!important] p-3">
        <DialogTitle className="w-0 h-0"></DialogTitle>
        <DialogDescription className="w-0 h-0"></DialogDescription>
        <div className="w-full h-full flex justify-center items-center relative">
          <Card>
            <CardContent className="overflow-scroll pb-0">
              <TableAdminTransactionsUser transactions={transactions} />
            </CardContent>
            <CardFooter className="sm:justify-end mt-3 max-md:gap-2">
              <DialogClose asChild>
                <Button type="button" variant="destructive-outline">
                  Fermer
                </Button>
              </DialogClose>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
