import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react'

interface Props {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const ColorSchemeSwitch = ({ size }: Props) => {

    const { t } = useTranslation('common');
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title={t('colorSchemeTitle')}
            size={size || 'md'}
        >
            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
    )
}

export default ColorSchemeSwitch;