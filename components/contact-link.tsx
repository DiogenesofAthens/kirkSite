"use client"

import { useState, type ReactNode } from "react"
import { ContactModal } from "@/components/contact-modal"

export function ContactLink({
  className,
  children = "Contact",
}: {
  className?: string
  children?: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <ContactModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
