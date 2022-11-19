import { parseISO, format } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { enGB, de } from 'date-fns/locale'

type Props = {
    dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
    const date = parseISO(dateString)
    const { lang } = useTranslation();
    const locale = getLocaleByLang(lang);
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy', { locale })}</time>
}

export const getLocaleByLang = (lang: string) => {
    switch (lang) {
        case 'de':
            return de;
        case 'en':
        default:
            return enGB;
    }
}

export default DateFormatter