"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Dialog context to manage open/close from any child (Header, Title, Content, etc).
 */
type DialogContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
};

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialogContext() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("Dialog component tree error");
  return ctx;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  // Ref keeps track of the trigger for focus restoration
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Focus trap and escape key behavior
  React.useEffect(() => {
    // Only trap focus when open
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  // Restore focus to trigger when closing
  React.useEffect(() => {
    if (!open && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, setOpen: onOpenChange, triggerRef }}>
      {children}
      {open && <DialogOverlay />}
    </DialogContext.Provider>
  );
}

function DialogOverlay() {
  const { setOpen } = useDialogContext();
  // Trap focus within modal
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    if (modalRef.current) {
      // Focus first focusable element in modal
      const focusables = modalRef.current.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (focusables.length) focusables[0].focus();
      else modalRef.current.focus();
    }
    return () => {
      if (previouslyFocused) previouslyFocused.focus();
    };
  }, []);

  // Clicking backdrop closes dialog
  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onMouseDown={onBackdropClick}
    >
      <div ref={modalRef} className="outline-none focus:ring-0">
        <DialogContentContainer />
      </div>
    </div>
  );
}

function DialogContentContainer() {
  const { open } = useDialogContext();
  // Only render content when open (already guaranteed by overlay)
  return open ? <>{DialogContent._activeContent}</> : null;
}

/** 
 * DialogTrigger finds the context and sets open to true. 
 * asChild allows customizing the element but generally use with a button.
 */
export interface DialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const ctx = useDialogContext();

    function handleClick(e: React.MouseEvent) {
      ctx.setOpen(true);
      if (props.onClick) props.onClick(e);
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        ref: (node: HTMLButtonElement) => {
          ctx.triggerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        },
        onClick: handleClick,
      });
    }
    // Default to normal button
    return (
      <button
        ref={node => {
          ctx.triggerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        type="button"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DialogTrigger.displayName = "DialogTrigger";

/**
 * Content is rendered inside the overlay via a static property/hack needed for React portals without extra dep.
 */
type DialogContentProps = {
  children: React.ReactNode;
};

function InternalDialogContent({ children }: DialogContentProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-lg rounded-lg bg-white p-6 text-left shadow-xl transition-all",
        "focus:outline-none focus:ring-2 focus:ring-primary"
      )}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export function DialogContent({ children }: DialogContentProps) {
  DialogContent._activeContent = <InternalDialogContent>{children}</InternalDialogContent>;
  return null;
}
// This property is used by DialogContentContainer to render content inside the modal
DialogContent._activeContent = null;

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 border-b pb-2">{children}</div>
  );
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold">{children}</h2>
  );
}