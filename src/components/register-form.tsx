import { Card, CardContent } from "@/components/ui/card";

import { AuthImage } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenue</h1>
                <p className="text-balance text-muted-foreground">
                  Inscriverz-vous sur{" "}
                  <span className="text-primary font-bold">Harvex Group</span>
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullname">Nom complet</Label>
                <Input id="fullname" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+xx xxxx xxxx"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Confirmez le mot de passe</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Inscription</Link>
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
          <div className="relative hidden bg-muted md:block">
            <AuthImage
              alt=""
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
