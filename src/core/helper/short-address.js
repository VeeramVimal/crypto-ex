export const shortAdrress = (str) => {
    try {
        return str.length > 29 ? str.substring(0, 29) + "..." : str;    
    } catch (e) {}
}