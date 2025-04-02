import { IAlertActionButton } from '../components/tk-alert/interfaces';

export interface IToast {
  position?: string;
  header?: string;
  message?: string;
  actions?: IAlertActionButton[];
  variant: 'success' | 'warning' | 'info' | 'danger' | 'neutral';
  icon?: string;
  iconSize?: string;
  type: 'filled' | 'filledlight' | 'outlined' | 'gradient';
  removable?: boolean;
  timeout?: number;
}

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

  const tkAlert = document.createElement('tk-alert');
  if (options.header?.length > 0) tkAlert.setAttribute('header', options.header);
  if (options.message?.length > 0) tkAlert.setAttribute('message', options.message);
  tkAlert.setAttribute('type', options.type);
  tkAlert.setAttribute('variant', options.variant);
  if (options.icon?.length > 0) tkAlert.setAttribute('icon', options.icon);
  if (options.iconSize?.length > 0) tkAlert.setAttribute('icon-size', options.iconSize);
  if (options.removable) tkAlert.setAttribute('removable', options.removable.toString());
  // TODO: toaster dan action kullanımı için daha sonra tekrar geliştirilecek
  // tkAlert.actions = options.actions;
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

  setTimeout(() => {
    toast.classList.remove('open');
    setTimeout(() => {
      tkAlert.remove();
      toast.remove();
    }, 300);
  }, options.timeout);
};
