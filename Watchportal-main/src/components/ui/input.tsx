// src/components/ui/input.tsx

import * as React from "react"
import { cn } from "~/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          // --- PERUBAHAN DI SINI ---
          "border-neutral-800", // Warna border default
          "text-neutral-50",      // Warna teks saat diketik (putih pudar)
          "focus-visible:ring-gold", // Warna ring saat di-fokus menjadi emas
          // --- AKHIR PERUBAHAN ---
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
