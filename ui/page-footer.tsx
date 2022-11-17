import { ActionIcon, Box, Container, createStyles, Grid, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons';
import React from 'react'
import ILink from './link';

const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');

    return {
        footer: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}`,
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
        }
    };
});

const PageFooter = () => {

    const { classes, theme } = useStyles();

    return (
        <footer>
            <Box className={classes.footer}>
                <Container>
                    <SimpleGrid cols={3}>

                        <Stack spacing={0}>
                            <ILink url={'#'} type='internal'>Privacy policy</ILink>
                            <ILink url={'#'} type='internal'>Legal notice</ILink>
                        </Stack>

                        <Text align='center'>Designed & built by Sebastian Schuler </Text>

                        <Group spacing={0} align={'start'} sx={{ flexDirection: 'row-reverse' }}>
                            <ActionIcon
                                component='a'
                                href='https://twitter.com/sebschuler'
                                variant="subtle"
                                size={'lg'}
                                title={'Sebastian Schuler on twitter'}
                            >
                                <IconBrandTwitter size={24} />
                            </ActionIcon>
                            <ActionIcon
                                component='a'
                                href='https://www.linkedin.com/in/sebastian-schuler-8a1b8022b/'
                                variant="subtle"
                                size={'lg'}
                                title={'Sebastian Schuler on LinkedIn'}
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