"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Handshake } from "lucide-react";
import { Referrals, UserInfo } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NumberFlow from "@number-flow/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSnackbar } from "notistack";

type CardReferalProps = {
  user?: UserInfo;
  referrals?: Referrals;
};

export function CardReferal(props: CardReferalProps) {
  const { user, referrals } = props;
  const { enqueueSnackbar } = useSnackbar();

  function copyReferalLink() {
    navigator.clipboard.writeText(
      `https://harvexgroup.com/register/${user?.referral_code || ""}`
    );
    enqueueSnackbar("Lien de parrainage copié avec succès", {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 3000,
      anchorOrigin: { vertical: "top", horizontal: "center" },
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">Total parrainage</CardTitle>
        <Handshake className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-0">
        {referrals ? (
          <NumberFlow value={referrals.count} className="text-2xl font-bold" />
        ) : (
          <Skeleton className="w-full h-7 mb-2" />
        )}
        <p className="text-xs text-muted-foreground">
          Invitez vos amies a rejoindre l&apos;aventure
        </p>
        <div className="h-[80px] w-full flex items-center gap-2">
          <Input
            disabled
            value={`https://harvexgroup.com/register/${
              user?.referral_code || ""
            }`}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  disabled={!user?.referral_code}
                  onClick={copyReferalLink}
                >
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black">
                <p>Copier le lien de parrainage</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
