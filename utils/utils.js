export const choose = arr => arr[Math.floor(Math.random() * arr.length)];
export const checkRTL = txt => /[\u0590-\u05FF\u0600-\u06FF]/.test(txt);