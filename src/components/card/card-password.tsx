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
import { Loader, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { UserInfo } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
});

type CardPasswordProps = {
  user?: UserInfo;
};

export function CardPassword(props: CardPasswordProps) {
  const { user } = props;
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email);
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
        }),
      });

      const json = await response.json();

      if (json?.state) {
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
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Pour réinitialiser votre mot de passe, veuillez saisir votre adresse
            email ci-dessous. Un email contenant les instructions de
            réinitialisation vous sera envoyé.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      {user ? (
                        <Input type="email" {...field} readOnly disabled />
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
                      <RotateCcw />
                    )}
                    Réinitialiser
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
