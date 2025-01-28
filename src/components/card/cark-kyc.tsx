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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères.",
    })
    .nonempty({
      message: "Le mot de passe ne peut pas être vide.",
    }),
  "confirm-password": z
    .string()
    .min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères.",
    })
    .nonempty({
      message: "Le mot de passe ne peut pas être vide.",
    }),
});

export function CardKYC() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      "confirm-password": "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirm-password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Confirmez le mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">
                  <Save />
                  Sauvegarder
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
