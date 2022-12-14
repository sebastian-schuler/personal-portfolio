import { Button, Center, Container, createStyles, Group, Paper, SimpleGrid, Stack, Textarea, TextInput, Title } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import ContactList from '../ui/contact/contact-list';

const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');

    return {
        wrapper: {
            display: 'flex',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            borderRadius: theme.radius.lg,
            padding: theme.spacing.sm,
            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
                }`,

            [BREAKPOINT]: {
                flexDirection: 'column',
                padding: 0,
            },
        },

        center: {
            height: '100%',
            width: '100%',

            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                padding: `${theme.spacing.lg}px 0`,
            },
        },

        form: {
            boxSizing: 'border-box',
            flex: 1,
            padding: theme.spacing.lg,
            paddingLeft: theme.spacing.lg,
            borderLeft: 0,

            [BREAKPOINT]: {
                padding: theme.spacing.md,
                paddingLeft: theme.spacing.md,
            },
        },

        fields: {
            marginTop: -12,
        },

        fieldInput: {
            flex: 1,

            '& + &': {
                marginLeft: theme.spacing.md,

                [BREAKPOINT]: {
                    marginLeft: 0,
                    marginTop: theme.spacing.md,
                },
            },
        },

        contacts: {
            boxSizing: 'border-box',
            position: 'relative',
            borderRadius: theme.radius.lg - 2,
            border: `3px solid ${theme.colors.primary[4]}`,
            padding: theme.spacing.lg,
            flex: '0 0 280px',

            [BREAKPOINT]: {
                paddingLeft: theme.spacing.md,

                marginBottom: theme.spacing.sm,
                marginRight: theme.spacing.md,
                marginLeft: theme.spacing.md,
                marginTop: theme.spacing.md,
            },
        },

        title: {
            marginBottom: theme.spacing.xl,

            [BREAKPOINT]: {
                marginBottom: theme.spacing.xl,
            },
        },

        control: {
            [BREAKPOINT]: {
                flex: 1,
            },
        },
    };
});

const ContactPage = () => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation('contact');



    return (
        <Container h={'100%'}>
            <Center className={classes.center}>

                <Paper
                    sx={{ width: 'inherit' }}
                    shadow="md"
                    radius="lg"
                >
                    <div className={classes.wrapper}>
                        <div className={classes.contacts}>
                            <Title
                                order={2}
                                size={'h4'}
                                className={classes.title}
                            >Socials</Title>
                            <ContactList />
                        </div>

                        <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
                            <Title order={1} size={'h4'} className={classes.title}>
                                Get in touch
                            </Title>

                            <Stack>
                                <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                    <TextInput label="Your name" placeholder="Your name" />
                                    <TextInput label="Your email" placeholder="hello@mantine.dev" required />
                                </SimpleGrid>

                                <TextInput mt="md" label="Subject" placeholder="Subject" required />

                                <Textarea
                                    mt="md"
                                    label="Your message"
                                    placeholder="Please include all relevant information"
                                    minRows={3}
                                />

                                <Group position="right" mt="md">
                                    <Button variant='filled' type="submit" className={classes.control}>
                                        Send message
                                    </Button>
                                </Group>
                            </Stack>
                        </form>
                    </div>
                </Paper>

            </Center>
        </Container>
    )
}

export default ContactPage;