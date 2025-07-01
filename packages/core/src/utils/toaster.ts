import { IAlertActionButton } from '../components/tk-alert/interfaces';

export interface IToast {
  position?: string;
  header?: string;
  message?: string;
  alignItems?: 'start' | 'center' | 'end';
  actions?: IAlertActionButton[];
  variant: 'success' | 'warning' | 'info' | 'danger' | 'neutral';
  icon?: string;
  iconSize?: 'small' | 'base' | 'large';
  type: 'filled' | 'filledlight' | 'outlined' | 'gradient';
  removable?: boolean;
  timeout?: number;
  persistentId?: string;
  persistent?: boolean;
}

const persistentToasts: Map<
  string,
  {
    element: HTMLTkAlertElement;
    container: HTMLDivElement;
    isRemoving: boolean;
  }
> = new Map();

export const createToast = (options: IToast) => {
  if (!['top-right', 'bottom-right', 'bottom-left', 'top-left'].includes(options.position)) options.position = 'top-right';
  if (options?.timeout == null) options.timeout = 6000;

  let toaster = document.querySelector(`.tk-toaster.${options.position}`);

  if (!toaster) {
    toaster = document.createElement('div');
    toaster.classList.add('tk-toaster');
    toaster.classList.add(options.position);

    document.querySelector('body').append(toaster);
  }

  const tkAlert: HTMLTkAlertElement = document.createElement('tk-alert');
  if (options.header?.length > 0) tkAlert.header = options.header;
  if (options.message?.length > 0) tkAlert.message = options.message;
  tkAlert.setAttribute('type', options.type);
  tkAlert.setAttribute('variant', options.variant);
  if (options.alignItems?.length > 0) tkAlert.alignItems = options.alignItems;
  if (options.icon?.length > 0) tkAlert.icon = options.icon;
  if (options.iconSize?.length > 0) tkAlert.iconSize = options.iconSize;
  if (options.removable) tkAlert.removable = options.removable;
  if (options.actions?.length > 0) {
    const slotFooterAction = document.createElement('div');
    slotFooterAction.setAttribute('slot', 'footer-action');
    slotFooterAction.style.display = 'flex';
    slotFooterAction.style.gap = '8px';

    options.actions.forEach(item => {
      const button = document.createElement('tk-button');
      button.label = item.label;
      button.icon = item.icon;
      button.variant = item.variant || 'primary';
      button.type = item.type || 'filled';
      button.size = item.size || 'base';
      if (typeof item.action == 'function') button.addEventListener('tk-click', () => item.action());

      slotFooterAction.appendChild(button);
    });

    tkAlert.appendChild(slotFooterAction);
  }

  const toast = document.createElement('div');
  toast.classList.add('tk-toast');
  toaster.append(toast);
  toast.append(tkAlert);

  setTimeout(() => {
    toast.classList.add('open');
  }, 1);

  if (!options.persistent) {
    setTimeout(() => {
      toast.classList.remove('open');
      setTimeout(() => {
        tkAlert.remove();
        toast.remove();
      }, 300);
    }, options.timeout);
  }
};

export const showPersistentToast = (options: IToast & { persistentId: string }) => {
  const { persistentId } = options;

  const existingToast = persistentToasts.get(persistentId);
  if (existingToast) {
    if (existingToast.isRemoving) {
      return false;
    }

    existingToast.isRemoving = true;

    const { container } = existingToast;
    container.classList.remove('open');

    setTimeout(() => {
      if (container.parentNode) {
        container.remove();
      }
      persistentToasts.delete(persistentId);
    }, 300);

    return false;
  }

  const toastOptions = {
    ...options,
    persistent: true,
    removable: true,
  };

  if (!['top-right', 'bottom-right', 'bottom-left', 'top-left'].includes(toastOptions.position)) {
    toastOptions.position = 'top-right';
  }

  let toaster = document.querySelector(`.tk-toaster.${toastOptions.position}`);

  if (!toaster) {
    toaster = document.createElement('div');
    toaster.classList.add('tk-toaster');
    toaster.classList.add(toastOptions.position);
    document.querySelector('body').append(toaster);
  }

  const tkAlert: HTMLTkAlertElement = document.createElement('tk-alert');
  if (toastOptions.header?.length > 0) tkAlert.header = toastOptions.header;
  if (toastOptions.message?.length > 0) tkAlert.message = toastOptions.message;
  tkAlert.setAttribute('type', toastOptions.type);
  tkAlert.setAttribute('variant', toastOptions.variant);
  if (toastOptions.alignItems?.length > 0) tkAlert.alignItems = toastOptions.alignItems;
  if (toastOptions.icon?.length > 0) tkAlert.icon = toastOptions.icon;
  if (toastOptions.iconSize?.length > 0) tkAlert.iconSize = toastOptions.iconSize;
  if (toastOptions.removable) tkAlert.removable = toastOptions.removable;

  if (toastOptions.actions?.length > 0) {
    const slotFooterAction = document.createElement('div');
    slotFooterAction.setAttribute('slot', 'footer-action');
    slotFooterAction.style.display = 'flex';
    slotFooterAction.style.gap = '8px';

    toastOptions.actions.forEach(item => {
      const button = document.createElement('tk-button');
      button.label = item.label;
      button.icon = item.icon;
      button.variant = item.variant || 'primary';
      button.type = item.type || 'filled';
      button.size = item.size || 'base';
      if (typeof item.action == 'function') button.addEventListener('tk-click', () => item.action());

      slotFooterAction.appendChild(button);
    });

    tkAlert.appendChild(slotFooterAction);
  }

  const toast = document.createElement('div');
  toast.classList.add('tk-toast');
  toaster.append(toast);
  toast.append(tkAlert);

  persistentToasts.set(persistentId, {
    element: tkAlert,
    container: toast,
    isRemoving: false,
  });

  tkAlert.addEventListener('remove', () => {
    const toastData = persistentToasts.get(persistentId);
    if (toastData && !toastData.isRemoving) {
      persistentToasts.delete(persistentId);
    }
  });

  setTimeout(() => {
    toast.classList.add('open');
  }, 1);

  return true;
};

export const isPersistentToastVisible = (persistentId: string): boolean => {
  const toast = persistentToasts.get(persistentId);
  return toast ? !toast.isRemoving : false;
};

export const dismissAllPersistentToasts = (): void => {
  persistentToasts.forEach(({ container, isRemoving }, persistentId) => {
    if (!isRemoving) {
      const toastData = persistentToasts.get(persistentId);
      if (toastData) {
        toastData.isRemoving = true;
      }

      container.classList.remove('open');
      setTimeout(() => {
        if (container.parentNode) {
          container.remove();
        }
        persistentToasts.delete(persistentId);
      }, 300);
    }
  });
};
