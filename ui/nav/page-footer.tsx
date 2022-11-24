import { ActionIcon, Box, Container, createStyles, Grid, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons';
import React from 'react'
import ILink from '../link';

const useStyles = createStyles((theme) => {
    return {
        footer: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : 'white',
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}`,
        },
        text: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        },
        icon: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[6],
            transition: 'color 200ms ease',

            '&:hover': {
                color: theme.colors.primary[4],
            },
        }
    };
});

const PageFooter = () => {

    const { classes, theme } = useStyles();

    return (
        <footer>
            <Box pt={theme.spacing.lg} pb={theme.spacing.lg} className={classes.footer}>
                <Container>
                    <SimpleGrid cols={3}>

                        <Stack spacing={0}>
                            <ILink url={'/privacy-policy'} type='internal'>Privacy policy</ILink>
                            <ILink url={'/legal-notice'} type='internal'>Legal notice</ILink>
                        </Stack>

                        <Text align='center' className={classes.text}>Designed & built by Sebastian Schuler </Text>

                        <Group spacing={0} align={'start'} sx={{ flexDirection: 'row-reverse' }}>
                            <ActionIcon
                                component='a'
                                href='https://twitter.com/sebschuler'
                                variant="subtle"
                                size={'lg'}
                                title={'Sebastian Schuler on twitter'}
                                className={classes.icon}
                            >
                                <IconBrandTwitter size={24} />
                            </ActionIcon>
                            <ActionIcon
                                component='a'
                                href='https://www.linkedin.com/in/sebastian-schuler-8a1b8022b/'
                                variant="subtle"
                                size={'lg'}
                                title={'Sebastian Schuler on LinkedIn'}
                                className={classes.icon}
                            >
                                <IconBrandLinkedin size={24} />
                            </ActionIcon>
                        </Group>

                    </SimpleGrid>
                </Container>
            </Box>
        </footer>
    )
}

export default PageFooter;