import { ActionIcon, createStyles, Menu, useMantineTheme } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
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
            width: '1.4em',
            opacity: 0.75,
            marginRight: theme.spacing.xs,
        },

        langText: {
            fontSize: theme.fontSizes.md,
        },

        langActive: {
            color: theme.colors.primary[4],
            fontWeight: 'bold',
        }
    };
});

const LanguageMenu = () => {

    const { t } = useTranslation('common');
    const theme = useMantineTheme();
    const { classes, cx } = useStyles();
    const router = useRouter();

    const locales = i18nConfig.locales.map(locale => getLanguageById(locale)).filter(locale => locale !== undefined) as LocaleItem[];
    const currentLocale = locales.find(locale => locale.value === router.locale) || locales[0];
    const [locale, setLocale] = useState<LocaleItem>(currentLocale);

    const changeLocale = async (newLocale: string | null) => {
        if (!newLocale) return;
        setLocale(locales.find(locale => locale.value === newLocale) as LocaleItem);
        await setLanguage(newLocale);
    }

    return (
        <Menu shadow="md" width={200} withArrow>
            <Menu.Target>
                <ActionIcon
                    variant="outline"
                    color={'red'}
                    title={t('languageSwitchTitle')}
                >
                    <IconLanguage size={18} /> {/* 18 */}
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label sx={{ fontSize: theme.fontSizes.sm, color: theme.colorScheme === 'dark' ? theme.white : theme.black }}>Language</Menu.Label>
                <Menu.Item
                    className={cx(classes.langText, { [classes.langActive]: locale.value === "de" })}
                    icon={<DE className={classes.flag} />}
                    onClick={() => changeLocale('de')}
                >Deutsch</Menu.Item>
                <Menu.Item
                    className={cx(classes.langText, { [classes.langActive]: locale.value === "en" })}
                    icon={<GB className={classes.flag} />}
                    onClick={() => changeLocale('en')}
                >English</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default LanguageMenu