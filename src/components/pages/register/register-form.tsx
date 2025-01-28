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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AuthImage } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstname: z
    .string()
    .min(4, {
      message: "Le nom doit comporter au moins 4 caractères.",
    })
    .nonempty({
      message: "Le nom ne peut pas être vide.",
    }),
  lastname: z
    .string()
    .min(4, {
      message: "Le nom doit comporter au moins 4 caractères.",
    })
    .nonempty({
      message: "Le nom ne peut pas être vide.",
    }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  country: z
    .string({ required_error: "" })
    .nonempty({ message: "Le pays ne peut pas être vide." }),
  phone: z.string().refine(isValidPhoneNumber, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }),
  city: z
    .string()
    .min(4, {
      message: "La ville doit comporter au moins 4 caractères.",
    })
    .nonempty({
      message: "Le ville ne peut pas être vide.",
    }),
  sex: z.string().refine((data) => data === "H" || data === "F", {
    message: "Veuillez entrer H ou F pour le sexe.",
  }),
  "confirm-old": z.boolean().refine((data) => data === true, {
    message: "Veuillez confirmer que vius être âgé(e) de plus de 18 ans",
  }),
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      sex: "H",
      "confirm-old": false,
      password: "",
      "confirm-password": "",
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
            <form className="p-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bienvenue</h1>
                  <p className="text-balance text-muted-foreground">
                    Inscriverz-vous sur{" "}
                    <Link href="/" className="text-primary font-bold">
                      Harvex Group
                    </Link>
                  </p>
                </div>
                <div className="flex gap-2">
                  <FormField
                    name="firstname"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lastname"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>Prénom(s)</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@mail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Numéro de téléphone</FormLabel>
                      <FormControl>
                        <PhoneInput
                          {...field}
                          defaultCountry="CI"
                          onCountryChange={(country) => {
                            if (!country) return;
                            form.setValue("country", country);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <FormField
                    name="city"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-1">
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Cassablanca" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="sex"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>Sexe</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="H">Homme</SelectItem>
                                <SelectItem value="F">Femme</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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

                <FormField
                  name="confirm-old"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          Je confirme être âgé(e) de plus de 18 ans
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Inscription
                </Button>

                <div className="text-center text-sm">
                  Vous avez déjà un compte ?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 text-primary"
                  >
                    Se connecter
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <AuthImage
              alt=""
              placeholder="empty"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        En cliquant sur inscription, vous acceptez nos{" "}
        <a href="#">conditions de service</a> et notre{" "}
        <a href="#">politique de confidentialité</a>.
      </div>
    </div>
  );
}
