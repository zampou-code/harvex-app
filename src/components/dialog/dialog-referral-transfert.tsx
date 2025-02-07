import { ArrowLeftRight, ArrowUpRight, LifeBuoy, Loader } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { closeSnackbar, enqueueSnackbar } from "notistack";

import { AccountBalance } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: "Le montant doit être un nombre valide.",
    })
    .min(5000, {
      message: "Le montant doit être d'au moins 5000 FCFA.",
    })
    .positive({
      message: "Le montant doit être supérieur à 0.",
    }),
});

type DialogReferralTransfertProps = {
  account?: AccountBalance;
};

export function DialogReferralTransfert(props: DialogReferralTransfertProps) {
  const { account } = props;

  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (account?.main && account.affiliate < values.amount) {
        enqueueSnackbar(
          `Solde est insuffisant pour effectuer ce transfert. Votre solde actuel est de ${new Intl.NumberFormat(
            "fr-FR",
            { style: "currency", currency: "XOF" }
          ).format(account.affiliate)}.`,
          {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
          }
        );

        return;
      }

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          type: "transfert",
          account: "affiliate",
        }),
      });

      const json = await response.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("dashboard-data-updated"));
        setOpen(false);
        form.reset();
      }

      enqueueSnackbar(json?.message, {
        autoHideDuration: 5000,
        variant: json?.state ? "success" : "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } finally {
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!form.formState.isSubmitting) {
          setOpen(open);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <ArrowLeftRight className="h-4 w-4" />
          Transferer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transferer</DialogTitle>
          <DialogDescription>
            Transférez votre solde de parrainage vers votre compte principal.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-0 flex-1">
                  <FormLabel>Montant</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10000 FCFA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-end mt-3 max-md:gap-2">
              <DialogClose asChild>
                <Button type="button" variant="destructive-outline">
                  Fermer
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  <ArrowLeftRight className="h-4 w-4" />
                )}
                Transferer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
