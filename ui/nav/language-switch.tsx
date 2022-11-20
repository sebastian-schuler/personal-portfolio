import { ActionIcon } from '@mantine/core';
import { IconLanguage } from '@tabler/icons';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

const LanguageSwitch = () => {

    const router = useRouter();
    const { t } = useTranslation('common');

    // TODO replace translation system with self made one, add translation of articles in some way?
    const onToggleLanguageClick = async (newLocale: string) => {
        await setLanguage(newLocale);
    }
    const changeTo = router.locale === 'en' ? 'de' : 'en'

    return (
        <ActionIcon
            variant="outline"
            color={'red'}
            onClick={() => onToggleLanguageClick(changeTo)}
            title={t('languageSwitchTitle')}
        >
            {<IconLanguage size={18} />}
        </ActionIcon>
    )
}

export default LanguageSwitch