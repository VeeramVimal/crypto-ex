import { toast as toaster } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export function toastAlert(errorType, message, id = '', 
    position = 'TOP_RIGHT' //TOP_RIGHT, TOP_CENTER
) {
    id = id+' '+new Date();
    if (errorType) {
        toaster[errorType](message, {
            autoClose: 2000,
            toastId: id,
            position: toaster.POSITION[position],
        });
    } else {
        toaster(message, {
            autoClose: 2000,
            toastId: id,
            position: toaster.POSITION[position],
        });
    }
}

export function toast(toastData) {
    const { errorType = "", message = "", id = "" } = toastData;
    toastAlert(errorType, message, id);
}