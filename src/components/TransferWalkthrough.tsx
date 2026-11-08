"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const stages = [
  "Ready to send a transfer.",
  "The ledger recorded the transfer, but the response was lost.",
  "The retry found the original transfer. No additional debit or credit was recorded.",
] as const;

export function TransferWalkthrough() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const hasTransfer = step > 0;

  return (
    <Card className="gap-5 border-primary/25 p-5 sm:p-7">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Interactive simulation</p>
        <h2 className="text-2xl font-semibold">Retry a ₹500 transfer</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Send a transfer, then retry it with the same request key after a simulated connection drop.
        </p>
      </div>

      <div className="rounded-lg border bg-background/60 p-4 text-sm">
        <p className="text-muted-foreground">Request key <code className="ml-2 text-foreground">transfer-demo-01</code></p>
        <div aria-live="polite" aria-atomic="true" className="mt-3 space-y-3">
          <p className="font-medium">{stages[step]}</p>
          <dl className="grid grid-cols-2 gap-3 text-muted-foreground">
            <div><dt>Sender balance</dt><dd className="text-lg font-semibold text-foreground">{hasTransfer ? "₹500" : "₹1,000"}</dd></div>
            <div><dt>Receiver balance</dt><dd className="text-lg font-semibold text-foreground">{hasTransfer ? "₹500" : "₹0"}</dd></div>
          </dl>
          <p className="text-muted-foreground">Ledger entries created: {hasTransfer ? "2 (one debit, one credit)" : "0"}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          disabled={step === 2}
          onClick={() => setStep((current) => current === 0 ? 1 : 2)}
        >
          {step === 0 ? "Send transfer" : "Retry same transfer"}
        </Button>
        <Button type="button" variant="outline" onClick={() => setStep(0)} disabled={step === 0}>
          Reset simulation
        </Button>
      </div>
    </Card>
  );
}
