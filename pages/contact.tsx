import { Button, Container, createStyles, Grid, Group, SimpleGrid, Space, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import useTranslation from 'next-translate/useTranslation';
import PageBreadcrumbs from '../ui/breadcrumbs';
import ContactList from '../ui/contact/contact-list';
import SectionHeader from '../ui/section-header';

const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');

    return {
        textField: {
            '::placeholder': {
                color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.dark[0],
            }
        },
        submit: {
            backgroundColor: theme.colors.primary[5],
            transition: 'background-color 150ms ease',

            '&:hover': {
                backgroundColor: theme.colors.primary[4],
            },
        }
    };
});

const ContactPage = () => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation('contact');

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validate: {
            name: (value) => value.trim().length < 2 ? 'Name is required' : null,
            email: (value) => !/^\S+@\S+$/.test(value) ? 'Invalid email' : null,
            subject: (value) => value.trim().length === 0 ? 'Subject is required' : null,
            message: (value) => value.trim().length === 0 ? 'Message is required' : null,
        },
    });

    return (
        <Container pb={'lg'}>

            <PageBreadcrumbs />

            <Space h={'xl'} />

            <SectionHeader title={t('title')} anchor='form' />

            <Grid gutter={'lg'}>

                <Grid.Col xs={12} sm={5} mb={'lg'}>
                    <Title
                        order={2}
                        size='h4'
                        weight={900}
                        align="left"
                        mb="md"
                    >
                        {t('subtitleSocials')}
                    </Title>
                    <ContactList />
                </Grid.Col>

                <Grid.Col xs={12} sm={7} mb={'lg'}>

                    <Title
                        order={2}
                        size='h4'
                        weight={900}
                        align="left"
                        mb="md"
                    >
                        {t('subtitleContact')}
                    </Title>

                    <form onSubmit={form.onSubmit(() => { })}>
                        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                            <TextInput
                                label={t('form.name')}
                                placeholder={t('form.namePlaceholder')}
                                name="name"
                                variant="filled"
                                size="md"
                                classNames={{ input: classes.textField }}
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                label={t('form.email')}
                                placeholder={t('form.emailPlaceholder')}
                                name="email"
                                variant="filled"
                                size="md"
                                classNames={{ input: classes.textField }}
                                {...form.getInputProps('email')}
                            />
                        </SimpleGrid>

                        <TextInput
                            label={t('form.subject')}
                            placeholder={t('form.subjectPlaceholder')}
                            mt="md"
                            name="subject"
                            variant="filled"
                            size="md"
                            classNames={{ input: classes.textField }}
                            {...form.getInputProps('subject')}
                        />
                        <Textarea
                            mt="md"
                            label={t('form.message')}
                            placeholder={t('form.messagePlaceholder')}
                            maxRows={10}
                            minRows={5}
                            autosize
                            name="message"
                            variant="filled"
                            size="md"
                            classNames={{ input: classes.textField }}
                            {...form.getInputProps('message')}
                        />

                        <Group position="right" mt="lg">
                            <Button type="submit" size="md" className={classes.submit}>
                                {t('form.submit')}
                            </Button>
                        </Group>

                    </form>
                </Grid.Col>

            </Grid>
        </Container>
    )
}

export default ContactPage;