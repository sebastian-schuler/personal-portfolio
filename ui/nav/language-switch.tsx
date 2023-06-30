import { createStyles, Group, SegmentedControl, Text } from '@mantine/core';
import { DE, GB } from 'country-flag-icons/react/3x2';
import setLanguage from 'next-translate/setLanguage';
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
        },

        control: {
            borderRadius: theme.radius.md,
        },

        active: {
            border: theme.colorScheme === 'dark' ? 'none' : `1px solid ${theme.colors.primary[4]}`,
        }
    };
});

interface Props {
    closeDrawer?: () => void
}

// TODO save lang in cookie
const LanguageSwitch = ({ closeDrawer }: Props) => {

    const router = useRouter();
    const { classes } = useStyles();
    const locales = i18nConfig.locales.map(locale => getLanguageById(locale)).filter(locale => locale !== undefined) as LocaleItem[];

    const changeLocale = async (newLocale: string | null) => {
        if (!newLocale) return;
        setLocale(locales.find(locale => locale.value === newLocale) as LocaleItem);
        await setLanguage(newLocale);
        if (closeDrawer) closeDrawer();
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

    const data = locales.map((locale, i) => {
        return {
            value: locale.value,
            label: (
                <Group position='center'>
                    {getFlag(locale.value)}
                    <Text>{locale.label}</Text>
                </Group>
            ),
        };
    })

    const currentLocale = locales.find(locale => locale.value === router.locale) || locales[0];
    const [locale, setLocale] = useState<LocaleItem>(currentLocale);

    return (
        <SegmentedControl
            value={locale.value}
            onChange={changeLocale}
            data={data}
            size="lg"
            fullWidth
            orientation="vertical"
            classNames={{
                control: classes.control,
                indicator: classes.active,
            }}
        />
    )
}

export default LanguageSwitch