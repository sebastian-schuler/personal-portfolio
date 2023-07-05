import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import ContactForm from '../ui/contact/contact-form';
import { Container, Grid, Space, Title } from '@mantine/core';
import ContactList from '../ui/contact/contact-list';
import MyTitle from '../ui/title';
import PageBreadcrumbs from '../ui/breadcrumbs';
import useTranslation from 'next-translate/useTranslation';

const ContactPage = () => {

    const { t } = useTranslation('contact');

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
            }}
        >
            <Container pb={'lg'}>

                <PageBreadcrumbs />

                <MyTitle>{t("title")}</MyTitle>
                <Space h={'lg'} />

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

                        <ContactForm />

                    </Grid.Col>
                </Grid>
            </Container >
        </GoogleReCaptchaProvider>
    )
}

export default ContactPage;