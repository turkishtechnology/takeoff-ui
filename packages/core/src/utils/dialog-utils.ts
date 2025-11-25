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

export const addDialogScrollListener = (el: HTMLElement, handler: (e) => void) => {
  const dialog = findDialogHost(el);
  if (!dialog) return;

  const root = dialog.querySelector('.tk-dialog');
  if (!root || (el as any)._dialogScrollHandler) return;

  root.addEventListener('scroll', handler, { capture: true, passive: true });
  (el as any)._dialogScrollHandler = handler;
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
