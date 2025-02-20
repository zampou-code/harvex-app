import { CheckCheck, Loader, X } from "lucide-react";
import {
  Dialog,
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

type DialogShowKycProps = {
  children: ReactElement;
  user?: UserInfo;
  onOpenChange: (open: boolean) => void;
};

export function DialogShowKyc(props: DialogShowKycProps) {
  const { user, children, onOpenChange } = props;
  const [kyc, setKyc] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
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
        onOpenChange(false);
        setOpen(false);
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
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85%] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Vérification KYC de l&apos;utilisateur</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {kyc && (
          <div className="w-full h-[600px] bg-gray-400">
            <Image
              alt=""
              src={kyc}
              width={500}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <DialogFooter className="justify-end mt-3 max-md:gap-2 flex-row">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => handleKYCStatus("rejected")}
          >
            {loading === "rejected" ? (
              <Loader className="animate-spin" />
            ) : (
              <X />
            )}
            Rejeter
          </Button>

          <Button
            className="flex-1"
            onClick={() => handleKYCStatus("approved")}
          >
            {loading === "approved" ? (
              <Loader className="animate-spin" />
            ) : (
              <CheckCheck />
            )}
            Approuver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
