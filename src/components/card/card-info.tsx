"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Country, isValidPhoneNumber } from "react-phone-number-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader, Save } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { UserInfo } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
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
  sex: z.string().refine((data) => data === "M" || data === "F", {
    message: "Veuillez entrer Homme ou Femme pour le sexe.",
  }),
});

type CardInfoProps = {
  user?: UserInfo;
};

export function CardInfo(props: CardInfoProps) {
  const { user } = props;
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      country: "",
      city: "",
      sex: "M",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("firstname", user.firstname);
      form.setValue("lastname", user.lastname);
      form.setValue("phone", user.phone);
      form.setValue("country", user.country);
      form.setValue("city", user.city);
      form.setValue("sex", user.sex);
    }
  }, [user, form]);

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
        window.dispatchEvent(new CustomEvent("user-info-updated"));
      }

      enqueueSnackbar(json?.message, {
        variant: json?.state ? "success" : "error",
        preventDuplicate: true,
        autoHideDuration: 5000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } finally {
    }
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
                        {user ? (
                          <Input placeholder="John" {...field} />
                        ) : (
                          <Skeleton className="w-full h-9" />
                        )}
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
                        {user ? (
                          <Input placeholder="Doe" {...field} />
                        ) : (
                          <Skeleton className="w-full h-9" />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 w-full">
                <FormItem className="space-y-0 flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    {user ? (
                      <Input
                        placeholder="m@mail.com"
                        defaultValue={user.email}
                        readOnly
                        disabled
                      />
                    ) : (
                      <Skeleton className="w-full h-9" />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex-1">
                      <FormLabel>Numéro de téléphone</FormLabel>
                      <FormControl>
                        {user ? (
                          <PhoneInput
                            {...field}
                            defaultCountry={(user?.country as Country) || "CI"}
                            onCountryChange={(country) => {
                              if (!country) return;
                              form.setValue("country", country);
                            }}
                          />
                        ) : (
                          <Skeleton className="w-full h-9" />
                        )}
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
                        {user ? (
                          <Input placeholder="Cassablanca" {...field} />
                        ) : (
                          <Skeleton className="w-full h-9" />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="sex"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-0 relative">
                      <FormLabel>Sexe</FormLabel>
                      {!user && <Skeleton className="absolute w-[120px] h-9" />}
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className="w-[120px]"
                            style={{ opacity: user ? 1 : 0 }}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="M">Homme</SelectItem>
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
