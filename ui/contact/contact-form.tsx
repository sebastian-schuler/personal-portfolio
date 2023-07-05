import { Button, Group, SimpleGrid, TextInput, Textarea, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

type ContactValues = {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const useStyles = createStyles((theme) => {
    return {
        textField: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
            '::placeholder': {
                color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
            }
        },
        submit: {
            backgroundColor: theme.colors.primary[5],
            color: theme.white,
            transition: 'background-color 150ms ease',

            '&:hover': {
                backgroundColor: theme.colors.primary[4],
            },
        },
        label: {
            color: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.white, 0.8) : theme.fn.rgba(theme.colors.dark[7], 0.5),
            fontWeight: 400,
        }
    };
});


const ContactForm = () => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation('contact');

    const { executeRecaptcha } = useGoogleReCaptcha();

    // Mantine form handles form state and validation
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validate: {
            name: (value) => value.trim().length === 0 ? t('form.nameError') : null,
            email: (value) => !/^\S+@\S+$/.test(value) ? t('form.emailError') : null,
            subject: (value) => value.trim().length === 0 ? t('form.subjectError') : null,
            message: (value) => value.trim().length === 0 ? t('form.messageError') : null,
        },
    });

    // States to disable form while submitting and to show message sent
    const [submitting, setSubmitting] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [failedCaptcha, setFailedCaptcha] = useState(false);

    // Callback to get token from reCaptcha
    const handleReCaptchaVerify = useCallback(async (values: ContactValues) => {
        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }
        const token = await executeRecaptcha('yourAction');
        sendFormData(token, values);
    }, [executeRecaptcha]);

    // Function to send form data to backend
    const sendFormData = async (token: string, values: ContactValues) => {

        try {
            // Add token to form data
            const formData = { ...values, gRecaptchaToken: token };

            // Send to nextjs api route
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                const json = await response.json();

                if (json.status === 'not-passed') {
                    // Show error message when reCaptcha verification fails
                    setFailedCaptcha(true);
                } else if (json.status === 'success') {
                    // Set message sent to true to show success message
                    setMessageSent(true);
                }
            } else {
                console.log('error');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    if (failedCaptcha) {
        return <div>{t('form.errorRecaptcha')}</div>
    }

    return (
        <>
            {
                messageSent ?
                    (
                        <div>{t('form.submitSuccess')}</div>
                    ) :
                    (
                        <form onSubmit={form.onSubmit((values) => {
                            setSubmitting(true);
                            handleReCaptchaVerify(values);
                        })}>
                            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                <TextInput
                                    label={t('form.name')}
                                    placeholder={t('form.namePlaceholder')}
                                    name="name"
                                    variant="filled"
                                    size="md"
                                    classNames={{
                                        input: classes.textField,
                                        label: classes.label
                                    }}
                                    {...form.getInputProps('name')}
                                />
                                <TextInput
                                    label={t('form.email')}
                                    placeholder={t('form.emailPlaceholder')}
                                    name="email"
                                    variant="filled"
                                    size="md"
                                    classNames={{
                                        input: classes.textField,
                                        label: classes.label
                                    }}
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
                                classNames={{
                                    input: classes.textField,
                                    label: classes.label
                                }}
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
                                classNames={{
                                    input: classes.textField,
                                    label: classes.label
                                }}
                                {...form.getInputProps('message')}
                            />

                            <Group position="right" mt="lg">
                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    size="md"
                                    className={classes.submit}
                                >
                                    {t('form.submit')}
                                </Button>
                            </Group>

                        </form>
                    )
            }

        </>
    )
}

export default ContactForm