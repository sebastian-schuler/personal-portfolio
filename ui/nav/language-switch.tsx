import { createStyles, Select } from '@mantine/core';
import { DE, GB } from 'country-flag-icons/react/3x2';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import i18nConfig from '../../i18n';
import { getLanguageById, LocaleItem } from '../../lib/localeUtil';

const useStyles = createStyles((theme) => {
    return {
        flag: {
            width: '1.5em',
            opacity: 0.75,
            borderRadius: theme.radius.sm,
        }
    };
});

const LanguageSwitch = () => {

    const router = useRouter();
    const { t, lang } = useTranslation('common');
    const { classes } = useStyles();
    const locales = i18nConfig.locales.map(locale => getLanguageById(locale)).filter(locale => locale !== undefined) as LocaleItem[];

    console.log(locales)

    const changeLocale = async (newLocale: string | null) => {
        if (!newLocale) return;
        setLocale(locales.find(locale => locale.value === newLocale) as LocaleItem);
        await setLanguage(newLocale);
    }

    const getFlag = (locale: string) => {
        switch (locale) {
            case 'de':
                return <DE className={classes.flag} />
            case 'en':
                return <GB className={classes.flag} />
            default:
                return <></>
        }
    }

    const currentLocale = locales.find(locale => locale.value === router.locale) || locales[0];
    const [locale, setLocale] = useState<LocaleItem>(currentLocale);

    return (
        <>

            <Select
                value={locale.value}
                onChange={(val) => changeLocale(val)}
                data={locales}
                transition="pop-top-left"
                transitionDuration={80}
                transitionTimingFunction="ease"
                nothingFound="Nobody here"
                sx={{ width: 100 }}
                // icon={<IconLanguage size={20}/>}
            />

        </>
    )
}

export default LanguageSwitch