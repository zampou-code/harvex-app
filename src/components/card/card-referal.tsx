"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Handshake } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NumberFlow from "@number-flow/react";
import copy from "copy-to-clipboard";

export function CardReferal() {
  function copyReferalLink() {
    copy("Text -11222");
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">Parrainage total</CardTitle>
        <Handshake className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pb-0">
        <NumberFlow className="text-2xl font-bold" value={15231} />
        <p className="text-xs text-muted-foreground">
          Invitez vos amies a rejoindre l&apos;aventure
        </p>
        <div className="h-[80px] w-full flex items-center gap-2">
          <Input
            disabled
            value={"https://harvexgroup.com/cjsakjfbkdjsbksjdkjsbfkjgfbd"}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon">
                  <Copy />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black" onClick={copyReferalLink}>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
