import { createStyles, Group } from '@mantine/core';
import React from 'react'
import { GB, DE } from 'country-flag-icons/react/3x2'

const useStyles = createStyles((theme) => {

    return {
        flag: {
            width: '1.5em',
            opacity: 0.75,
            borderRadius: theme.radius.sm,
        }
    };
});

interface Props {
    locales: string[]
}

const LocaleFlags = ({ locales }: Props) => {

    const { classes } = useStyles();

    const getFlag = (locale: string) => {
        switch (locale) {
            case 'de':
                return <DE key={locale} className={classes.flag} title={'Artikel verfügbar in Deutsch'} />
            case 'en':
                return <GB key={locale} className={classes.flag} title={'Article available in English'} />
            default:
                return <></>
        }
    }

    return (
        <Group spacing={'sm'}>
            {
                locales.map((locale, i) => (getFlag(locale)))
            }
        </Group>
    )
}

export default LocaleFlags;