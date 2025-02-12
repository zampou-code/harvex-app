import { AccountBalance, UserInfo } from "@/types";
import { ArrowUpRight, Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ReactElement, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  main: z.coerce
    .number({
      invalid_type_error: "Le montant doit être un nombre valide.",
    })

    .optional(),
  affiliate: z.coerce
    .number({
      invalid_type_error: "Le montant doit être un nombre valide.",
    })
    .optional(),
});

type CardAccountsProps = {
  user?: UserInfo;
  account?: AccountBalance;
};

export function CardAccounts(props: CardAccountsProps) {
  const { user, account } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      main: account?.main || 0,
      affiliate: account?.affiliate || 0,
    },
  });

  useEffect(() => {
    if (account) {
      form.reset({
        main: account.main,
        affiliate: account.affiliate,
      });
    }
  }, [account, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
          type: "update-account-amount",
          account: {
            main: values.main,
            affiliate: values.affiliate,
          },
        }),
      });

      const json = await response.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("user-info-updated"));
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
    <Card>
      <CardHeader>
        <CardTitle>Modification des soldes de l&apos;utilisateur</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              name="main"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-0 flex-1">
                  <FormLabel>
                    Solde principal:{" "}
                    <span className="text-xl font-bold text-primary">
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                      }).format(account?.main || 0)}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10000 FCFA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="affiliate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-0 flex-1">
                  <FormLabel>
                    Solde de parrainage:{" "}
                    <span className="text-lg font-bold text-primary">
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                      }).format(account?.affiliate || 0)}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10000 FCFA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
                Mettre a jours
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
