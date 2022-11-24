import { ActionIcon, createStyles, Drawer, Group, SegmentedControl, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLanguage } from '@tabler/icons';
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

// TODO save lang in cookie
const LanguageSwitch = () => {

    const router = useRouter();
    const { t, lang } = useTranslation('common');
    const { classes, theme } = useStyles();
    const locales = i18nConfig.locales.map(locale => getLanguageById(locale)).filter(locale => locale !== undefined) as LocaleItem[];
    const [drawerOpen, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

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

    const data = locales.map((locale, i) => {
        return {
            value: locale.value,
            label: (
                <Group>
                    {getFlag(locale.value)}
                    <Text>{locale.label}</Text>
                </Group>
            ),
        };
    })

    const currentLocale = locales.find(locale => locale.value === router.locale) || locales[0];
    const [locale, setLocale] = useState<LocaleItem>(currentLocale);

    return (
        <>

            <ActionIcon
                variant="outline"
                color={'red'}
                onClick={() => toggleDrawer()}
                title={t('languageSwitchTitle')}
            >
                <IconLanguage size={18} />
            </ActionIcon>

            <Drawer
                opened={drawerOpen}
                onClose={() => closeDrawer()}
                title={t('languageSwitchTitle')}
                padding="xl"
                size="xl"
                lockScroll={false}
                position="right"
                styles={{
                    title: {
                        fontSize: 32,
                        fontWeight: 700,
                        color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[6],
                    }
                }}
            >
                <SegmentedControl
                    value={locale.value}
                    onChange={changeLocale}
                    data={data}
                    size="lg"
                    fullWidth
                    orientation="vertical"
                />
            </Drawer>


        </>
    )
}

export default LanguageSwitch