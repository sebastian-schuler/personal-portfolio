import { Box, Container, createStyles } from '@mantine/core';
import React from 'react'

const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');

    return {
        footer: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}`,
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
        },
    };
});

const PageFooter = () => {

    const { classes, theme } = useStyles();

    return (
        <Box component='footer' className={classes.footer}>
            <Container>
                Socials ...
            </Container>
        </Box>
    )
}

export default PageFooter;