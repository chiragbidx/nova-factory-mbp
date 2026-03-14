"use client";

import * as React from "react";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <HeadlessDialog open={open} onClose={onOpenChange} className="dialog">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        {children}
      </div>
    </HeadlessDialog>
  );
}

export interface DialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        ...props,
      });
    }
    return (
      <button type="button" ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";

export interface DialogContentProps {
  children: React.ReactNode;
}

export function DialogContent({ children }: DialogContentProps) {
  return (
    <HeadlessDialog.Panel
      className={cn(
        "relative w-full max-w-lg rounded-lg bg-white p-6 text-left shadow-xl transition-all",
        "focus:outline-none focus:ring-2 focus:ring-primary"
      )}
    >
      {children}
    </HeadlessDialog.Panel>
  );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 border-b pb-2">
      {children}
    </div>
  );
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <HeadlessDialog.Title as="h2" className="text-lg font-semibold">
      {children}
    </HeadlessDialog.Title>
  );
}