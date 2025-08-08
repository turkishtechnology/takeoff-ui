export { g as getAssetPath, r as render, s as setAssetPath, a as setNonce, b as setPlatformOptions } from './p-B4rZamdt.js';

const persistentToasts = new Map();
const createToast = options => {
  var _a, _b, _c, _d, _e, _f;
  if (!['top-right', 'bottom-right', 'bottom-left', 'top-left'].includes(options.position)) options.position = 'top-right';
  if ((options === null || options === void 0 ? void 0 : options.timeout) == null) options.timeout = 6000;
  let toaster = document.querySelector(`.tk-toaster.${options.position}`);
  if (!toaster) {
    toaster = document.createElement('div');
    toaster.classList.add('tk-toaster');
    toaster.classList.add(options.position);
    document.querySelector('body').append(toaster);
  }
  const tkAlert = document.createElement('tk-alert');
  if (((_a = options.header) === null || _a === void 0 ? void 0 : _a.length) > 0) tkAlert.header = options.header;
  if (((_b = options.message) === null || _b === void 0 ? void 0 : _b.length) > 0) tkAlert.message = options.message;
  tkAlert.setAttribute('type', options.type);
  tkAlert.setAttribute('variant', options.variant);
  if (((_c = options.alignItems) === null || _c === void 0 ? void 0 : _c.length) > 0) tkAlert.alignItems = options.alignItems;
  if (((_d = options.icon) === null || _d === void 0 ? void 0 : _d.length) > 0) tkAlert.icon = options.icon;
  if (((_e = options.iconSize) === null || _e === void 0 ? void 0 : _e.length) > 0) tkAlert.iconSize = options.iconSize;
  if (options.removable) tkAlert.removable = options.removable;
  if (((_f = options.actions) === null || _f === void 0 ? void 0 : _f.length) > 0) {
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
const showPersistentToast = options => {
  var _a, _b, _c, _d, _e, _f;
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
  const toastOptions = Object.assign(Object.assign({}, options), { persistent: true, removable: true });
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
  const tkAlert = document.createElement('tk-alert');
  if (((_a = toastOptions.header) === null || _a === void 0 ? void 0 : _a.length) > 0) tkAlert.header = toastOptions.header;
  if (((_b = toastOptions.message) === null || _b === void 0 ? void 0 : _b.length) > 0) tkAlert.message = toastOptions.message;
  tkAlert.setAttribute('type', toastOptions.type);
  tkAlert.setAttribute('variant', toastOptions.variant);
  if (((_c = toastOptions.alignItems) === null || _c === void 0 ? void 0 : _c.length) > 0) tkAlert.alignItems = toastOptions.alignItems;
  if (((_d = toastOptions.icon) === null || _d === void 0 ? void 0 : _d.length) > 0) tkAlert.icon = toastOptions.icon;
  if (((_e = toastOptions.iconSize) === null || _e === void 0 ? void 0 : _e.length) > 0) tkAlert.iconSize = toastOptions.iconSize;
  if (toastOptions.removable) tkAlert.removable = toastOptions.removable;
  if (((_f = toastOptions.actions) === null || _f === void 0 ? void 0 : _f.length) > 0) {
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
const isPersistentToastVisible = persistentId => {
  const toast = persistentToasts.get(persistentId);
  return toast ? !toast.isRemoving : false;
};
const dismissAllPersistentToasts = () => {
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

export { createToast, dismissAllPersistentToasts, isPersistentToastVisible, showPersistentToast };
//# sourceMappingURL=index.js.map

//# sourceMappingURL=index.js.map
