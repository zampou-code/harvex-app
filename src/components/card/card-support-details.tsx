"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Headset, Mail } from "lucide-react";

export function CardSupportDetails() {
  return (
    <Card className="md:h-[calc(100%-25px)]">
      <CardContent className="pt-6 space-y-5">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold">Contact 1</h2>
            <Headset className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-primary">+225 0707070707</p>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold">Contact 2</h2>
            <Headset className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-primary">+225 0707070707</p>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold">E-mail</h2>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold text-primary">
            support@harvexgroup.com
          </p>
        </div>
        <div>
          <p className="text-sm">
            Notre équipe de support est disponible pour vous assister du lundi
            au vendredi de 9h à 18h, ainsi que les samedis et dimanches de 9h à
            14h. Nous nous engageons à répondre à vos demandes dans les
            meilleurs délais pendant ces horaires d&apos;ouverture.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
