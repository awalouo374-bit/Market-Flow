import { formatDistanceToNow } from "date-fns";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { InventoryLog } from "@/lib/admin-inventory";
import { LogTypeBadge } from "./StockBadge";

export function InventoryLogsTable({ logs }: { logs: InventoryLog[] }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Product / Variant</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Delta</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Notes</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">By</th>
              <th className="px-4 py-3 text-right">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-card">
            {logs.map((log) => {
              const isPositive = log.changeQuantity > 0;
              return (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground line-clamp-1 text-xs">{log.productName}</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5">{log.variantSku}</p>
                  </td>
                  <td className="px-4 py-3">
                    <LogTypeBadge type={log.type} />
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 font-bold text-sm ${isPositive ? "text-emerald-600" : "text-destructive"}`}>
                      {isPositive
                        ? <ArrowUp className="w-3.5 h-3.5" />
                        : <ArrowDown className="w-3.5 h-3.5" />
                      }
                      {Math.abs(log.changeQuantity)}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {log.notes ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">{log.performedBy ?? "System"}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(log.createdAt, { addSuffix: true })}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
