"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { BrandButton } from "@/components/shared/BrandButton";
import { BrandFormFields, type BrandDefaults } from "./BrandFormFields";
import { createBrandAction, editBrandAction } from "@/actions/brandActions";
import { toast } from "sonner";

interface BrandModalProps {
  mode: "create" | "edit";
  brandId?: string;
  defaults?: BrandDefaults;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function BrandModal({ mode, brandId, defaults, open, onOpenChange }: BrandModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get("name") as string,
      logoUrl: fd.get("logoUrl") as string,
      website: fd.get("website") as string,
    };

    startTransition(async () => {
      const result = mode === "create"
        ? await createBrandAction(data)
        : await editBrandAction(brandId!, data);

      if (result.error) { setError(result.error); return; }

      toast.success(mode === "create" ? "Brand created" : "Brand updated");
      if (mode === "create") formRef.current?.reset();
      onOpenChange(false);
      router.refresh();
    });
  };

  const isCreate = mode === "create";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/10 text-accent">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">
                {isCreate ? "Create Brand" : "Edit Brand"}
              </DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                {isCreate ? "Add a new brand to the product catalog." : "Update the brand details below."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} id="brand-form">
          <BrandFormFields defaults={defaults} />
          {error && (
            <p className="mt-3 text-xs text-destructive bg-destructive/10 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
        </form>

        <DialogFooter>
          <BrandButton variant="ghost" size="sm" type="button" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </BrandButton>
          <BrandButton variant="flow" size="sm" type="submit" form="brand-form" disabled={isPending} className="gap-2">
            {isPending ? "Saving…" : isCreate ? "Create Brand" : "Save Changes"}
          </BrandButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
