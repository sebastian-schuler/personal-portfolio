import { createStyles, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react'

const useStyles = createStyles((theme) => ({

    text: {
        fontSize: '2.4em',
        fontFamily: 'Norican Regular, sans-serif',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        cursor: 'pointer',
        transition: 'color 0.5s',
        textDecoration: 'none',
        paddingBottom: 2,
        lineHeight: '1',
        position: 'absolute',
        top: '30%',

        '&:hover': {
            color: theme.colors.primary[4],

            '&:before': {
                width: '100%',
                background: theme.colorScheme === 'dark' ? theme.white : theme.black,
                WebkitTransition: 'width .5s ease',
                transition: 'width .5s ease',
            },

            '&:after': {
                width: '100%',
                background: '0 0',
                WebkitTransition: 'all 0s ease',
                transition: 'all 0s ease',
            },
        },

        '&:before': {
            left: 0,
            width: 0,
            WebkitTransition: 'width 0s ease, background .5s ease',
            transition: 'width 0s ease, background .5s ease',
            content: '""',
            position: 'absolute',
            display: 'block',
            height: '1px',
            bottom: '-1px',
        },

        '&:after': {
            right: 0,
            width: 0,
            background: theme.colorScheme === 'dark' ? theme.white : theme.black,
            WebkitTransition: 'width .5s ease',
            transition: 'width .5s ease',
            content: '""',
            position: 'absolute',
            display: 'block',
            height: '1px',
            bottom: '-1px',
        },
    }
}));

const PageLogo = () => {

    const { classes, theme } = useStyles();

    return (
        <Link href="/">
            <Text className={classes.text}>Sebastian Schuler</Text>
        </Link>
    )
}

export default PageLogo;