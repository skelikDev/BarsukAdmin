import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const notify = <T>(type: ToastType, message: string, options?: ToastOptions<T>): void => {
    const optionsDefault: ToastOptions = {autoClose: 3000, ...options}
    switch (type) {
        case 'success':
            toast.success(message, optionsDefault);
            break;
        case 'error':
            toast.error(message, optionsDefault);
            break;
        case 'info':
            toast.info(message, optionsDefault);
            break;
        case 'warning':
            toast.warning(message, optionsDefault);
            break;
        default:
            toast(message, optionsDefault);
            break;
    }
};