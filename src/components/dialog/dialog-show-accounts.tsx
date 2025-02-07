import { AccountBalance, UserInfo } from "@/types";
import { ArrowUpRight, Loader } from "lucide-react";
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

type DialogShowAccountsProps = {
  user?: UserInfo;
  children: ReactElement;
  account?: AccountBalance;
  onOpenChange: (open: boolean) => void;
};

export function DialogShowAccounts(props: DialogShowAccountsProps) {
  const { user, account, children, onOpenChange } = props;

  const [open, setOpen] = useState<boolean>(false);
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

      enqueueSnackbar(json?.message, {
        autoHideDuration: 5000,
        variant: json?.state ? "success" : "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
      setOpen(false);
      onOpenChange(false);
    } finally {
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!form.formState.isSubmitting) {
          setOpen(open);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md" hideCloseBtn>
        <DialogHeader>
          <DialogTitle>
            Modification des soldes de l&apos;utilisateur
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
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
                Mettre a jours
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
