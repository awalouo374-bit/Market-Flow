"use client";

import { useTransition } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { BrandButton } from "@/components/shared/BrandButton";

interface ConfirmDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  itemName: string;
  onConfirm: () => Promise<void>;
}

export function ConfirmDeleteModal({
  open,
  onOpenChange,
  title = "Delete Item",
  description,
  itemName,
  onConfirm,
}: ConfirmDeleteModalProps) {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await onConfirm();
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/10 text-destructive shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">{title}</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                {description ?? "This action cannot be undone."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-foreground">
          You are about to permanently delete{" "}
          <span className="font-semibold">&ldquo;{itemName}&rdquo;</span>.
        </div>

        <DialogFooter>
          <BrandButton
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </BrandButton>
          <BrandButton
            variant="navy"
            size="sm"
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="gap-2 bg-destructive hover:bg-destructive/90 border-none"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {isPending ? "Deleting…" : "Yes, Delete"}
          </BrandButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
