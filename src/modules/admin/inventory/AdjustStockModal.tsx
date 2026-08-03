"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Boxes } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { BrandButton } from "@/components/shared/BrandButton";
import { adjustStockAction } from "@/actions/inventoryActions";
import { toast } from "sonner";
import type { LogType } from "@/lib/admin-inventory";

const LOG_TYPES: { value: LogType; label: string }[] = [
  { value: "restock",    label: "Restock (+)" },
  { value: "return",     label: "Return (+)" },
  { value: "adjustment", label: "Manual Adjustment (+)" },
  { value: "sale",       label: "Sale (−)" },
  { value: "damaged",    label: "Damaged / Loss (−)" },
];

const inputCls = "w-full h-9 px-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all";
const labelCls = "block text-xs font-semibold text-foreground mb-1";

interface AdjustStockModalProps {
  variantId: string;
  variantName: string;
  productName: string;
  currentStock: number;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function AdjustStockModal({
  variantId, variantName, productName, currentStock, open, onOpenChange,
}: AdjustStockModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await adjustStockAction({
        variantId,
        type: fd.get("type") as LogType,
        quantity: Number(fd.get("quantity")),
        notes: fd.get("notes") as string,
      });

      if (result.error) { setError(result.error); return; }

      toast.success(`Stock updated — now ${result.newStock} units`);
      onOpenChange(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/10 text-accent">
              <Boxes className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">Adjust Stock</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                {productName} — <span className="font-semibold">{variantName}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-1 py-2 rounded-xl bg-muted/50 border border-border text-xs text-center text-muted-foreground">
          Current stock: <span className="font-bold text-foreground text-sm">{currentStock} units</span>
        </div>

        <form onSubmit={handleSubmit} id="adjust-stock-form" className="space-y-3">
          <div>
            <label htmlFor="inv-type" className={labelCls}>Movement Type</label>
            <select id="inv-type" name="type" className={inputCls}>
              {LOG_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="inv-qty" className={labelCls}>
              Quantity <span className="text-destructive">*</span>
            </label>
            <input
              id="inv-qty" name="quantity" type="number" min="1" step="1"
              required placeholder="e.g. 50"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="inv-notes" className={labelCls}>Notes</label>
            <textarea
              id="inv-notes" name="notes" rows={2}
              placeholder="Reason or reference number…"
              className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none transition-all"
            />
          </div>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 rounded-xl px-3 py-2">{error}</p>
          )}
        </form>

        <DialogFooter>
          <BrandButton variant="ghost" size="sm" type="button" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </BrandButton>
          <BrandButton variant="flow" size="sm" type="submit" form="adjust-stock-form" disabled={isPending} className="gap-2">
            {isPending ? "Saving…" : "Apply Adjustment"}
          </BrandButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
