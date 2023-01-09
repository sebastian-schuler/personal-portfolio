import { parseISO, format } from 'date-fns'
import { getLocaleByLang } from '../ui/date-formatter';

// Generate a static link from given parameters
export const toLink = (...args: string[]) => {
    let res = "";
    args.forEach((val) => {
        if (val !== undefined) {
            if (val.startsWith("/")) res += val;
            else res = res + "/" + val;
        }
    });
    return res;
}

export const formatDate = (dateString: string, localeString: string) => {
    const locale = getLocaleByLang(localeString);
    const date = parseISO(dateString);
    return format(date, 'LLLL	d, yyyy', { locale })
}

export const arrSampleSize = <T>(arr: Array<T>, n = 1): Array<T> => {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr.slice(0, n);
};

/**
 * Clamp a number between a min and max value
 * @param num 
 * @param min 
 * @param max 
 * @returns 
 */
export const clamp = (num: number, min: number, max: number,) => Math.min(Math.max(num, min), max);