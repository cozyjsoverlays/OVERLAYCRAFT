"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import type { CartItem } from "@/store/cart";

interface PayPalCheckoutProps {
  items: CartItem[];
  email: string;
  emailValid: boolean;
  onError: (message: string) => void;
  onSuccess: (orderId: string) => void;
}

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export function PayPalCheckout({
  items,
  email,
  emailValid,
  onError,
  onSuccess,
}: PayPalCheckoutProps) {
  const router = useRouter();

  // Refs keep create/approve callbacks from closing over stale values — the
  // PayPal SDK caches the first render's callbacks.
  const itemsRef = useRef(items);
  const emailRef = useRef(email);
  itemsRef.current = items;
  emailRef.current = email;

  if (!CLIENT_ID) {
    return (
      <div className="rounded-xl border border-pink/30 bg-pink/10 p-4 text-sm text-body">
        PayPal isn&apos;t configured yet. Add{" "}
        <code className="text-pink">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> and{" "}
        <code className="text-pink">PAYPAL_CLIENT_SECRET</code> to your
        environment to enable checkout.
      </div>
    );
  }

  const currency = items[0]?.currency ?? "USD";

  return (
    <div className="relative">
      {!emailValid && (
        <p className="mb-3 text-sm text-muted">
          Enter a valid email above to enable payment.
        </p>
      )}
      <div
        className={!emailValid ? "pointer-events-none opacity-50" : undefined}
        aria-disabled={!emailValid}
      >
        <PayPalScriptProvider
          options={{
            clientId: CLIENT_ID,
            currency,
            intent: "capture",
            components: "buttons",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical", shape: "pill", color: "gold" }}
            // Re-render the buttons when the cart or email changes.
            forceReRender={[items.map((i) => i.slug).join(","), email, emailValid]}
            disabled={!emailValid || items.length === 0}
            createOrder={async () => {
              const res = await fetch("/api/checkout/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  items: itemsRef.current.map((i) => ({ slug: i.slug })),
                }),
              });
              const data = await res.json();
              if (!res.ok) {
                throw new Error(data?.error ?? "Could not start checkout.");
              }
              return data.id as string;
            }}
            onApprove={async (data) => {
              const res = await fetch("/api/checkout/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  paypalOrderId: data.orderID,
                  email: emailRef.current,
                  items: itemsRef.current.map((i) => ({ slug: i.slug })),
                }),
              });
              const result = await res.json();
              if (!res.ok) {
                onError(
                  result?.error ??
                    "Your payment went through but we hit a snag delivering it. Please contact support with your PayPal receipt.",
                );
                return;
              }
              // Stash links for the success page (server doesn't expose them by id).
              try {
                sessionStorage.setItem(
                  `cozy-order-${result.orderId}`,
                  JSON.stringify({
                    email: result.email,
                    downloads: result.downloads,
                  }),
                );
              } catch {
                /* ignore storage failures */
              }
              onSuccess(result.orderId);
              router.push(`/checkout/success?order=${result.orderId}`);
            }}
            onCancel={() => {
              router.push("/checkout/cancel");
            }}
            onError={(err) => {
              console.error("PayPal error:", err);
              onError(
                "Something went wrong with PayPal. No charge was made — please try again.",
              );
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
