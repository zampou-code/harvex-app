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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KYCBadge } from "@/assets/images";
import { Skeleton } from "../ui/skeleton";
import { UserInfo } from "@/types";
import { storage } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  file: z
    .instanceof(File, { message: "Veuillez sélectionner un fichier valide" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Le fichier doit être inférieur à 5MB"
    )
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "application/pdf"].includes(file.type),
      "Format non autorisé. Seuls les fichiers PNG, JPEG et PDF sont acceptés"
    ),
  type: z
    .string()
    .refine(
      (value) =>
        ["id_card", "passport", "driving_license", "consular_card"].includes(
          value
        ),
      {
        message:
          "Veuillez sélectionner un type valide : CNI, Passport, Permis de conduire ou Carte consulaire",
      }
    ),
});

type CardKYCProps = {
  user?: UserInfo;
};

export function CardKYC(props: CardKYCProps) {
  const { user } = props;
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      type: "id_card",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (user?.kyc?.file) {
        const oldFileRef = ref(storage, user.kyc.file);
        try {
          await deleteObject(oldFileRef);
        } catch (error) {}
      }

      const path = `kyc/${Date.now()}.${values.file.name.split(".").pop()}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, values.file);

      const res = await fetch("/api/auth/me", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
          kyc: {
            ...user?.kyc,
            file: path,
            type: values.type,
          },
        }),
      });

      const json = await res.json();

      if (json?.state) {
        enqueueSnackbar("KYC mises à jour avec succès", {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        });
      } else {
        enqueueSnackbar(
          "Une erreur s'est produite lors de la mise à jour du KYC. Veuillez réessayer.",
          {
            variant: "error",
            preventDuplicate: true,
            autoHideDuration: 3000,
            anchorOrigin: { vertical: "top", horizontal: "center" },
          }
        );
      }
    } catch (error) {}
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {user?.kyc?.status === "approved" ? (
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-32 h-32">
              <KYCBadge alt="" className="w-full h-full object-contain" />
            </div>
            <p>Votre compte a été validé avec succès</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  name="file"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Fichier KYC</FormLabel>
                      <FormControl>
                        {user ? (
                          <Input
                            type="file"
                            ref={field.ref}
                            name={field.name}
                            onBlur={field.onBlur}
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
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
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Type de piéce</FormLabel>
                      <FormControl>
                        {user ? (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="id_card">CNI</SelectItem>
                                <SelectItem value="passport">
                                  Passport
                                </SelectItem>
                                <SelectItem value="driving_license">
                                  Permis de counduit
                                </SelectItem>
                                <SelectItem value="consular_card">
                                  Carte consulaire
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                    >
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
        )}
      </CardContent>
    </Card>
  );
}
