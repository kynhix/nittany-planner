import React, { useState } from "react"

export interface TriggerProps {
  ref: React.RefObject<HTMLDivElement>
  onSelect: () => void
}

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = React.useRef<HTMLDivElement>(null)

  function trigger() {
    setIsOpen(true)
  }

  function dismiss() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return {
    triggerProps: {
      ref: triggerRef,
      onClick: trigger,
    },
    dialogProps: {
      open: isOpen,
      onOpenChange: (open: boolean) => {
        if (open) trigger()
        else dismiss()
      },
    },
    trigger,
    dismiss,
  }
}

export function useDialogDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = React.useRef<HTMLDivElement>(null)

  function trigger() {
    setIsOpen(true)
  }

  function dismiss() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return {
    triggerProps: {
      ref: triggerRef,
      onSelect: trigger,
    },
    dialogProps: {
      open: isOpen,
      onOpenChange: (open: boolean) => {
        if (open) trigger()
        else dismiss()
      },
    },
    trigger,
    dismiss,
  }
}
