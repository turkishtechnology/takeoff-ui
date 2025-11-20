const findDialogHost = (el: HTMLElement): HTMLTkDialogElement | null => {
  let current: HTMLElement | null = el;
  while (current) {
    const dialog = current.closest?.('tk-dialog');
    if (dialog) return dialog as HTMLTkDialogElement;

    const rootNode: Node | null | undefined = current.getRootNode?.();
    if (rootNode instanceof ShadowRoot) {
      current = (rootNode as ShadowRoot).host as HTMLElement;
    } else {
      current = current.parentElement;
    }
  }
  return null;
};
const handleDialogScroll = (el: HTMLElement) => () => {
  // Only close if the element has isOpen property
  if ('isOpen' in el && (el as any).isOpen) {
    (el as any).isOpen = false;
  }
};

export const addDialogScrollListener = (el: HTMLElement) => {
  const dialog = findDialogHost(el);
  if (!dialog) return;
  const handler = handleDialogScroll(el);
  (el as any)._dialogScrollHandler = handler;

  const root = dialog.querySelector('.tk-dialog');
  if (root) root.addEventListener('scroll', handler, { capture: true, passive: true });
};

export const removeDialogScrollListener = (el: HTMLElement) => {
  const dialog = findDialogHost(el);
  if (!dialog) return;
  const handler = (el as any)._dialogScrollHandler;
  const root = dialog.querySelector('.tk-dialog');
  if (handler && root) {
    root.removeEventListener('scroll', handler, { capture: true } as any);
    delete (el as any)._dialogScrollHandler;
  }
};
