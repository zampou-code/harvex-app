"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../ui/skeleton";
import { UserInfo } from "@/types";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  oldPassword: z
    .string()
    .min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères.",
    })
    .nonempty({
      message: "Le mot de passe ne peut pas être vide.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères.",
    })
    .nonempty({
      message: "Le mot de passe ne peut pas être vide.",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères.",
    })
    .nonempty({
      message: "Le mot de passe ne peut pas être vide.",
    }),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Les mots de passe ne correspondent pas",
//   path: ["confirmPassword"],
// });

type CardPasswordProps = {
  user?: UserInfo;
};

export function CardPassword(props: CardPasswordProps) {
  const { user } = props;
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      oldPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/auth/me", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      const json = await res.json();

      if (json?.state) {
        enqueueSnackbar("Mot de passe mises à jour avec succès", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        enqueueSnackbar(
          "Une erreur s'est produite lors de la mise à jour de votre mot de passe. Veuillez réessayer.",
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
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                name="oldPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Ancien mot de passe</FormLabel>
                    <FormControl>
                      {user ? (
                        <Input type="password" {...field} />
                      ) : (
                        <Skeleton className="w-full h-9" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      {user ? (
                        <Input type="password" {...field} />
                      ) : (
                        <Skeleton className="w-full h-9" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Confirmez le mot de passe</FormLabel>
                    <FormControl>
                      {user ? (
                        <Input type="password" {...field} />
                      ) : (
                        <Skeleton className="w-full h-9" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                {user ? (
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Save />
                    )}
                    Sauvegarder
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
