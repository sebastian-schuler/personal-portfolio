import { useRouter } from 'next/router';
import React from 'react'
import { useTranslation } from 'next-i18next';
import { ActionIcon } from '@mantine/core';
import { IconLanguage } from '@tabler/icons';
import Link from 'next/link';

const LanguageSwitch = () => {

    const router = useRouter();
    const { pathname, asPath, query } = router;

    const { t, i18n } = useTranslation('common');
    
    // TODO replace translation system with self made one, add translation of articles in some way?
    const onToggleLanguageClick = (newLocale: string) => {
        router.push({ pathname, query }, asPath, { locale: newLocale })

    }
    const changeTo = router.locale === 'en' ? 'de' : 'en'

    return (
        <div>
            <Link
                href='/'
                locale={changeTo}
                passHref
            >
                <ActionIcon
                    variant="outline"
                    color={'red'}
                    onClick={() => onToggleLanguageClick(changeTo)}
                    title={t('menu.languageSwitch')}
                >
                    {<IconLanguage size={18} />}
                </ActionIcon>
            </Link>
        </div>
    )
}

export default LanguageSwitch