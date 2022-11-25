import { ActionIcon, Drawer, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconLanguage } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import LanguageSwitch from './language-switch';

const LanguageDrawer = () => {

    const { t } = useTranslation('common');
    const theme = useMantineTheme();
    const [drawerOpen, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

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
                <LanguageSwitch closeDrawer={closeDrawer} />
            </Drawer>
        </>
    )
}

export default LanguageDrawer