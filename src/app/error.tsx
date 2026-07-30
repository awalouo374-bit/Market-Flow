"use client";

import { useRouter } from "next/navigation";
import { ErrorDisplay } from "@/components/shared";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <ErrorDisplay
        error={error}
        onRetry={unstable_retry}
        onGoHome={() => router.push("/")}
      />
    </div>
  );
}
