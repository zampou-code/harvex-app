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

import { AuthImage } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Le mot de passe doit comporter au moins 8 caractères.",
    })
    .nonempty({
      message: "Le mot de passe ne peut pas être vide.",
    }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bienvenue</h1>
                  <p className="text-balance text-muted-foreground">
                    Connectez-vous sur{" "}
                    <Link href="/" className="text-primary font-bold">
                      Harvex Group
                    </Link>
                  </p>
                </div>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@exemple.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Mot de passe</FormLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Mot de passe oublié ?
                        </a>
                      </div>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Connexion
                </Button>

                <div className="text-center text-sm">
                  Vous n&apos;avez pas de compte ?{" "}
                  <a
                    href="/register"
                    className="underline underline-offset-4 text-primary"
                  >
                    S&apos;inscrire
                  </a>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <AuthImage
              alt=""
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        En cliquant sur connexion, vous acceptez nos{" "}
        <a href="#">conditions de service</a> et notre{" "}
        <a href="#">politique de confidentialité</a>.
      </div>
    </div>
  );
}
