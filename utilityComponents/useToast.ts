// src/hooks/useToast.ts
import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';
type ToastType = 'success' | 'error' | 'info' | 'warning';

export const useToast = () => {
  const showToast = (
    type: ToastType,
    message: string,
    options?: ToastOptions
  ) => {
    const toastOptions: ToastOptions = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      ...options,
    };

    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'info':
        toast.info(message, toastOptions);
        break;
      case 'warning':
        toast.warn(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  };

  return { showToast };
};