import { Button, createStyles, Drawer, Group, SimpleGrid, Textarea, TextInput } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

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

interface Props {
    closeDrawer: () => void;
    drawerOpened: boolean;
}

const ContactDrawer: React.FC<Props> = ({ closeDrawer, drawerOpened }: Props) => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation('common');

    return (
        <Drawer
            opened={drawerOpened}
            onClose={() => closeDrawer()}
            title="Get in touch"
            padding="xl"
            size="xl"
            lockScroll={false}
            styles={{
                title: {
                    fontSize: 32,
                    fontWeight: 700,
                    color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[6],
                }
            }}

        >

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

        </Drawer>
    );
}

export default ContactDrawer;