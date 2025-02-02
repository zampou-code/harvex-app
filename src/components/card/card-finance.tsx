"use client";

import { AccountBalance, UserInfo } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HandCoins, LifeBuoy, Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
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
  type: z.string().refine((data) => data === "deposit" || data === "withdraw", {
    message:
      "Veuillez sélectionner soit 'dépôt' soit 'retrait' comme type d'opération.",
  }),
  payment_mean: z
    .enum(["orange", "wave", "crypto"], {
      message:
        "Veuillez sélectionner un moyen de paiement valide (Orange, Wave ou Crypto).",
    })
    .optional(),

  account: z
    .string()
    .refine((data) => data === "main" || data === "affiliate", {
      message:
        "Veuillez sélectionner soit solde 'principal' soit 'parrainage' comme type de compte.",
    }),
  transfert: z.boolean().optional(),
});

type CardFinanceProps = {
  account?: {
    user: UserInfo;
    account: AccountBalance;
  };
};

export function CardFinance(props: CardFinanceProps) {
  const { account } = props;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      type: "deposit",
      account: "main",
      transfert: false,
      payment_mean: "wave",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (
        values.type === "withdraw" &&
        account?.user?.kyc?.status !== "approved"
      ) {
        enqueueSnackbar(
          "Pour effectuer un retrait, vous devez d'abord valider votre identité (KYC). Veuillez compléter la vérification KYC dans votre profil avant de poursuivre cette opération.",
          {
            variant: "error",
            preventDuplicate: true,
            autoHideDuration: 3000,
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
          fee_amount: 0,
          status: "pending",
        }),
      });

      const json = await response.json();

      if (json?.state) {
        enqueueSnackbar(json?.message, {
          variant: "success",
          preventDuplicate: true,
          anchorOrigin: { vertical: "top", horizontal: "center" },
          action: (snackbarId) => (
            <>
              <Button
                variant="destructive"
                className="mr-4"
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
          ),
        });
      } else {
        enqueueSnackbar(json?.message, {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      }
    } catch (error) {}
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0 relative">
                    <FormLabel>Type</FormLabel>
                    {!account && <Skeleton className="absolute w-full h-9" />}
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          if (value === "deposit") {
                            form.setValue("account", "main");
                          }
                        }}
                      >
                        <SelectTrigger
                          className="w-full"
                          style={{ opacity: account ? 1 : 0 }}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="deposit">Dépôt</SelectItem>
                            <SelectItem value="withdraw">Retrait</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="account"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0 relative">
                    <FormLabel>Compte</FormLabel>
                    {!account && <Skeleton className="absolute w-full h-9" />}
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="w-full"
                          style={{ opacity: account ? 1 : 0 }}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="main">
                              Solde principal
                            </SelectItem>

                            <SelectItem
                              value="affiliate"
                              disabled={form.watch("type") === "deposit"}
                            >
                              Solde de parrainage
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
                    {!account && <Skeleton className="absolute w-full h-9" />}
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="w-full"
                          style={{ opacity: account ? 1 : 0 }}
                        >
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

              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0 flex-1">
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                      {account ? (
                        <Input
                          type="number"
                          placeholder="10000 FCFA"
                          {...field}
                        />
                      ) : (
                        <Skeleton className="w-full h-9" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="transfert"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={form.watch("account") === "main"}
                        />
                      </FormControl>
                      <FormLabel>
                        Transférer le solde de parrainage vers le solde
                        principal
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                {account ? (
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <HandCoins />
                    )}
                    Faire la demande
                  </Button>
                ) : (
                  <Skeleton className="w-40 h-9" />
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
