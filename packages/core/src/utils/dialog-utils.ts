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
  const content = dialog.querySelector('.tk-dialog-content');
  if (content) {
    const handler = handleDialogScroll(el);
    (el as any)._dialogScrollHandler = handler;
    content.addEventListener('scroll', handler);
  }
};

export const removeDialogScrollListener = (el: HTMLElement) => {
  const dialog = findDialogHost(el);
  if (!dialog) return;
  const content = dialog.querySelector('.tk-dialog-content');
  const handler = (el as any)._dialogScrollHandler;
  if (content && handler) {
    content.removeEventListener('scroll', handler);
    delete (el as any)._dialogScrollHandler;
  }
};
