import { de, enGB } from 'date-fns/locale'
import useTranslation from 'next-translate/useTranslation'
import { formatDate } from '../lib/util'

type Props = {
    dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
    const { lang } = useTranslation();
    return <time dateTime={dateString}>{formatDate(dateString, lang)}</time>
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