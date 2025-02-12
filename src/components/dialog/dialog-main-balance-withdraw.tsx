import { AccountBalance, UserKYC } from "@/types";
import { ArrowUpRight, BadgeCheck, LifeBuoy, Loader } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { closeSnackbar, enqueueSnackbar } from "notistack";

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
  payment_mean: z.enum(["orange", "wave", "crypto"], {
    message:
      "Veuillez sélectionner un moyen de paiement valide (Orange, Wave ou Crypto).",
  }),
});

type DialogMainBalanceWithdrawProps = {
  account?: {
    kyc?: UserKYC;
    account?: AccountBalance;
  };
};

export function DialogMainBalanceWithdraw(
  props: DialogMainBalanceWithdrawProps
) {
  const { account } = props;
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      payment_mean: "wave",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (account?.kyc?.status !== "approved") {
        enqueueSnackbar(
          "Pour effectuer un retrait, vous devez d'abord valider votre identité (KYC). Veuillez compléter la vérification KYC dans votre profil avant de poursuivre cette opération.",
          {
            persist: true,
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            action: (snackbarId) => (
              <>
                <Button
                  className="mr-4"
                  variant="destructive"
                  onClick={() => closeSnackbar(snackbarId)}
                >
                  Fermer
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/dashboard/profil">
                    <BadgeCheck />
                    Profile
                  </Link>
                </Button>
              </>
            ),
          }
        );

        return;
      }

      if (account?.account?.main && account.account.main < values.amount) {
        enqueueSnackbar(
          `Solde est insuffisant pour effectuer ce retrait. Votre solde actuel est de ${new Intl.NumberFormat(
            "fr-FR",
            { style: "currency", currency: "XOF" }
          ).format(account.account.main)}.`,
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
          account: "main",
          type: "withdraw",
        }),
      });

      const json = await response.json();

      if (json?.state) {
        setOpen(false);
        form.reset();
      }

      enqueueSnackbar(json?.message, {
        persist: json?.state,
        variant: json?.state ? "success" : "error",
        autoHideDuration: json?.state ? undefined : 5000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
        action: json?.state
          ? (snackbarId) => (
              <>
                <Button
                  className="mr-4"
                  variant="destructive"
                  onClick={() => closeSnackbar(snackbarId)}
                >
                  Fermer
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/dashboard/support">
                    <LifeBuoy />
                    Support
                  </Link>
                </Button>
              </>
            )
          : null,
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
          <ArrowUpRight className="h-4 w-4" />
          Retirer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Retirer</DialogTitle>
          <DialogDescription>
            Retirez votre solde de principale vers votre portefeuille externe.
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
            <FormField
              name="payment_mean"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-0 relative">
                  <FormLabel>Compte</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Mobile Money</SelectLabel>
                          <SelectItem value="wave">Wave</SelectItem>
                          <SelectItem value="orange">Orange Money</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Cryptomonnaies</SelectLabel>
                          <SelectItem value="crypto">Crypto</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                  <ArrowUpRight className="h-4 w-4" />
                )}
                Retirer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
