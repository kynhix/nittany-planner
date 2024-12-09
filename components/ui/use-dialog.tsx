export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = React.useRef();
  
  function trigger() {
    setIsOpen(true);
  }

  function dismiss() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  return {
    triggerProps: {
      ref: triggerRef,
      onClick: trigger,
    },
    dialogProps: {
      open: isOpen,
      onOpenChange: open => {
        if (open) trigger();
        else dismiss();
      },
    },
    trigger,
    dismiss,
  };
}
