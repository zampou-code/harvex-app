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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Save } from "lucide-react";
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
});

export function CardInfo() {
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
              <div className="flex gap-2 w-full">
                <FormField
                  name="firstname"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex-1">
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
                    <FormItem className="space-y-0 flex-1">
                      <FormLabel>Prénom(s)</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 w-full">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex-1">
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
                    <FormItem className="space-y-0 flex-1">
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
              </div>
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
