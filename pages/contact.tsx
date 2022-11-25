import { Button, Container, createStyles, Group, SimpleGrid, Textarea, TextInput } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import MyTitle from '../ui/my-title';

const useStyles = createStyles((theme) => {
    const BREAKPOINT = theme.fn.smallerThan('sm');

    return {
        fields: {
            marginTop: theme.spacing.md,
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
        <Container>

            <MyTitle marginTop marginBottom>
                {t('title')}
            </MyTitle>

            <form onSubmit={(event) => event.preventDefault()}>

                <div className={classes.fields}>
                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                        <TextInput label="Your name" placeholder="Your name" required />
                        <TextInput label="Your email" placeholder="hello@mantine.dev" required />
                    </SimpleGrid>

                    <TextInput mt="md" label="Subject" placeholder="Subject" required />

                    <Textarea
                        mt="md"
                        label="Your message"
                        placeholder="Please include all relevant information"
                        minRows={3}
                        required
                    />

                    <Group position="right" mt="md">
                        <Button type="submit" variant='outline' className={classes.control}>
                            Send message
                        </Button>
                    </Group>
                </div>
            </form>

        </Container>
    )
}

export default ContactPage;