"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function Switch({ checked, onCheckedChange, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full border transition-colors",
        checked
          ? "border-slate-900 bg-slate-900 dark:border-slate-100 dark:bg-slate-100"
          : "border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform dark:bg-slate-950",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}
