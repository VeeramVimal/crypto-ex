export const responseChanges = (data) => {
    const {
        message,
        error,
        status = false
    } = data;
    if(message && message === 'Data retrived successfully') {
        delete data.message;
    }
    if(status) {
        data.toastType = "success";
    }
    else {
        data.toastType = "error";
    }
    if(typeof error === 'undefined') { data.error = {}; }
    return data;
}