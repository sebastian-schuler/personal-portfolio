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