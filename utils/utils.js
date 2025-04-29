export const choose = arr => arr[Math.floor(Math.random() * arr.length)];
export const checkRTL = txt => /[\u0590-\u05FF\u0600-\u06FF]/.test(txt);

export function createDateString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}