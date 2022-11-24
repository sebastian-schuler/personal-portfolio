import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';
import useTranslation from 'next-translate/useTranslation';
import React from 'react'

const ColorSchemeSwitch = () => {

    const { t } = useTranslation('common');
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title={t('colorSchemeTitle')}
        >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
    )
}

export default ColorSchemeSwitch;