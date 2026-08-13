"use client";

import { useState } from "react";
import { X, Copy, Check, Share2, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { BrandButton } from "@/components/shared/BrandButton";

interface WishlistShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

export function WishlistShareModal({ isOpen, onClose, itemCount }: WishlistShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/wishlist/share?id=mf-saved-${Date.now().toString(36)}`
    : "https://marketflow.com/wishlist/share";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Wishlist link copied!", {
      description: "Anyone with this link can view your saved items.",
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-wishlist-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="relative w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-flow-cyan/10 text-flow-cyan">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="share-wishlist-title" className="text-lg font-bold text-foreground">
                Share Your Wishlist
              </h2>
              <p className="text-xs text-muted-foreground">
                {itemCount} saved item{itemCount === 1 ? "" : "s"} ready to share
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close share dialog"
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Link Copy Box */}
        <div className="space-y-2">
          <label htmlFor="share-link-input" className="text-xs font-bold text-foreground">
            Shareable Public Link
          </label>
          <div className="flex items-center gap-2">
            <input
              id="share-link-input"
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 h-11 px-3.5 rounded-xl border border-border bg-muted/40 font-mono text-xs text-foreground focus:outline-hidden"
            />
            <BrandButton
              type="button"
              onClick={handleCopy}
              variant="flow"
              size="sm"
              className="shrink-0 gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </BrandButton>
          </div>
        </div>

        {/* Social Share Shortcuts */}
        <div className="space-y-2.5 pt-1 border-t border-border/60">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Quick Share Options
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`mailto:?subject=Check%20out%20my%20MarketFlow%20Wishlist&body=Here%20are%20the%20items%20I%20saved%20on%20MarketFlow:%20${encodeURIComponent(shareUrl)}`}
              className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 text-xs font-semibold text-foreground transition-colors"
            >
              <Mail className="w-4 h-4 text-flow-cyan" />
              <span>Email Wishlist</span>
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out my MarketFlow wishlist: ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 text-xs font-semibold text-foreground transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-muted-foreground">
            Anyone with the link can view your list. No private account details are shared.
          </p>
        </div>
      </div>
    </div>
  );
}
