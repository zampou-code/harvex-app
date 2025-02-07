"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Element } from "react-scroll";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Veuillez entrer un numéro de téléphone valide.",
  }),
  address: z
    .string()
    .min(2, {
      message: "L'adresse doit comporter au moins 2 caractères.",
    })
    .regex(/^[a-zA-Z0-9\s,.'-]{3,}$/, {
      message: "Veuillez entrer une adresse valide.",
    }),
  message: z.string().min(2, {
    message: "Le message doit comporter au moins 2 caractères.",
  }),
});

export default function Contacts() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      message: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Element name="contacts" id="contacts" as="section">
      <div className="relative w-full h-[708px]">
        <iframe
          loading="lazy"
          style={{ border: 0 }}
          className="w-full h-full"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.916469123456!2d8.850000000000001!3d47.45000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a9169e429facd%3A0xab363472ce103c78!2sOberschneit%2044%2C%208523%20Hagenbuch%2C%20Suisse!5e0!3m2!1sfr!2sfr!4v1634567890123!5m2!1sfr!2sfr"
        ></iframe>
        <div className="absolute top-o bottom-0 w-full h-full bg-black/30 flex justify-center md:justify-start items-center responvive-p-x">
          <div className="w-full max-w-96 bg-white rounded-lg p-5 ">
            <h1 className="text-primary font-bold text-xl md:text-3xl mb-4">
              Contactez-nous
            </h1>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="mail@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="+00 xx xx xx xx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="address"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input placeholder="adj avent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="message"
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-4">
                  <Send />
                  Envoyer
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Element>
  );
}
