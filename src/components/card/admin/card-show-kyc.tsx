import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck, Loader, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserInfo } from "@/types";
import { enqueueSnackbar } from "notistack";
import { storage } from "@/lib/firebase";

type CardShowKycProps = {
  user?: UserInfo;
};

export function CardShowKyc(props: CardShowKycProps) {
  const { user } = props;
  const [kyc, setKyc] = useState<string>("");
  const [loading, setLoading] = useState<"approved" | "rejected" | "">("");

  const loadKYC = useCallback(async () => {
    const kycfile = user?.kyc?.file;

    if (!kycfile) return;

    try {
      const storageRef = ref(storage, kycfile);
      const url = await getDownloadURL(storageRef);
      setKyc(url);
    } finally {
    }
  }, [user]);

  useEffect(() => {
    loadKYC();
  }, [user, loadKYC]);

  const handleKYCStatus = async (status: "approved" | "rejected") => {
    try {
      setLoading(status);

      if (user?.kyc?.file && status == "rejected") {
        const oldFileRef = ref(storage, user.kyc.file);

        try {
          await deleteObject(oldFileRef);
        } finally {
        }
      }

      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          status: status,
          type: "update-kyc-status",
        }),
      });

      const json = await response.json();

      if (json?.state) {
        window.dispatchEvent(new CustomEvent("user-admin-updated"));
      }

      enqueueSnackbar(json?.message, {
        preventDuplicate: true,
        autoHideDuration: 5000,
        variant: json?.state ? "success" : "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      });
    } finally {
      setLoading("");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vérification KYC de l&apos;utilisateur</CardTitle>
      </CardHeader>
      <CardContent>
        {kyc ? (
          <div className="space-y-4">
            <Image
              alt=""
              src={kyc}
              width={500}
              height={300}
              className="w-full h-full object-contain"
            />

            <div className="flex items-center gap-2">
              <span className="font-medium">Statut KYC:</span>
              {(() => {
                switch (user?.kyc?.status) {
                  case "approved":
                    return (
                      <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                        Approuvé
                      </span>
                    );
                  case "pending":
                    return (
                      <span className="px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                        En attente
                      </span>
                    );
                  case "rejected":
                    return (
                      <span className="px-2 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                        Rejeté
                      </span>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Aucun document KYC soumis
          </div>
        )}

        {user?.kyc?.status !== "approved" &&
          user?.kyc?.status !== "rejected" && (
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="destructive"
                onClick={() => handleKYCStatus("rejected")}
                disabled={!kyc || loading === "rejected"}
              >
                {loading === "rejected" ? (
                  <Loader className="animate-spin" />
                ) : (
                  <X />
                )}
                Rejeter
              </Button>

              <Button
                onClick={() => handleKYCStatus("approved")}
                disabled={!kyc || loading === "approved"}
              >
                {loading === "approved" ? (
                  <Loader className="animate-spin" />
                ) : (
                  <CheckCheck />
                )}
                Approuver
              </Button>
            </div>
          )}
      </CardContent>
    </Card>
  );

  // return (
  //   <Dialog
  //     open={open}
  //     onOpenChange={(open) => {
  //       onOpenChange(open);
  //       if (!loading) {
  //         setOpen(open);
  //       }
  //     }}
  //   >
  //     <DialogTrigger asChild>{children}</DialogTrigger>
  //     <DialogContent className="sm:max-w-md" hideCloseBtn>
  //       <DialogHeader>
  //         <DialogTitle>Vérification KYC de l&apos;utilisateur</DialogTitle>
  //         <DialogDescription></DialogDescription>
  //       </DialogHeader>

  // {kyc && (
  //   <Image
  //     src={kyc}
  //     alt=""
  //     className="w-full h-full object-contain"
  //     width={500}
  //     height={300}
  //   />
  // )}
  //       <DialogFooter className="sm:justify-end mt-3 max-md:gap-2">
  //         <DialogClose asChild>
  //           <Button type="button" variant="destructive-outline">
  //             Fermer
  //           </Button>
  //         </DialogClose>
  //         <Button
  //           variant="destructive"
  //           onClick={() => handleKYCStatus("rejected")}
  //         >
  //           {loading === "rejected" ? (
  //             <Loader className="animate-spin" />
  //           ) : (
  //             <X />
  //           )}
  //           Rejeter
  //         </Button>

  //         <Button onClick={() => handleKYCStatus("approved")}>
  //           {loading === "approved" ? (
  //             <Loader className="animate-spin" />
  //           ) : (
  //             <CheckCheck />
  //           )}
  //           Approuver
  //         </Button>
  //       </DialogFooter>
  //     </DialogContent>
  //   </Dialog>
  // );
}
