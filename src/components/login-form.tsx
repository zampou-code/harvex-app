import { Card, CardContent } from "@/components/ui/card";

import { AuthImage } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LoginForm({
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
                  Connectez-vous sur{" "}
                  <span className="text-primary font-bold">Harvex Group</span>
                </p>
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
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>

              <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Connexion</Link>
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
