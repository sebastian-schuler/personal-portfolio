import { Anchor, Box, createStyles, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconAt, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconMapPin, IconExternalLink } from '@tabler/icons-react';
import useTranslation from 'next-translate/useTranslation';
import { SOCIAL_LINKS } from '../../lib/constants';
import EncryptedEmail from './encryptedEmail';

type ContactData = (
    {
        type: 'text'
        title: string
        icon: JSX.Element
        text: string
    } |
    {
        type: 'email'
        title: string
        icon: JSX.Element
        text: JSX.Element
    } |
    {
        type: 'link'
        title: string
        icon: JSX.Element
        text: string
        url: string
        linkTitle: string
    }
);

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    data: ContactData
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.md,
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[7],
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.white, 0.5) : theme.fn.rgba(theme.colors.dark[7], 0.5),
        fontWeight: 600,
    },

    description: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[7],
    },

    link: {
        color: theme.colors.primary[4],
    }
}));

function ContactIcon({
    data,
    className,
    ...others
}: ContactIconProps) {
    const { classes, cx } = useStyles();
    const { title, text, type } = data;
    const icon: JSX.Element = data.icon;
    const isLink = type === "link";

    return (
        <div className={cx(classes.wrapper, className)} {...others}>
            {
                <ThemeIcon size={'lg'} variant={'outline'}>
                    {icon}
                </ThemeIcon>
            }
            <div>
                <Text size="xs" className={classes.title}>
                    {title}
                </Text>
                {
                    isLink ? (
                        <Anchor
                            href={data.url}
                            className={classes.link}
                            target={'_blank'}
                            title={data.linkTitle}
                        >
                            <Group spacing={2} align={'center'}>
                                <IconExternalLink />
                                {text}
                            </Group>
                        </Anchor>
                    ) : (
                        <Text className={classes.description}>{text}</Text>

                    )
                }
            </div>
        </div>
    );
}



const ContactList = () => {

    const { t } = useTranslation('contact');

    const DATA: ContactData[] = [
        {
            type: "email",
            title: t('socials.email'),
            text: <EncryptedEmail email='sebastian.schuler@live.com' />,
            icon: <IconAt size={20} />
        },
        {
            type: "text",
            title: t('socials.country'),
            text: 'Germany',
            icon: <IconMapPin size={20} />
        },
        {
            type: "link",
            title: t('socials.github'),
            text: SOCIAL_LINKS.github.name,
            url: SOCIAL_LINKS.github.url,
            icon: <IconBrandGithub size={20} />,
            linkTitle: t('common:footer.githubLinkTitle')
        },
        {
            type: "link",
            title: t('socials.linkedin'),
            text: SOCIAL_LINKS.linkedin.name,
            url: SOCIAL_LINKS.linkedin.url,
            icon: <IconBrandLinkedin size={20} />,
            linkTitle: t('common:footer.linkedinLinkTitle')
        },
        {
            type: "link",
            title: t('socials.twitter'),
            text: SOCIAL_LINKS.twitter.name,
            url: SOCIAL_LINKS.twitter.url,
            icon: <IconBrandTwitter size={20} />,
            linkTitle: t('common:footer.twitterLinkTitle')
        },
    ];

    const items = DATA.map((item, index) => <ContactIcon key={index} data={item} />);

    return <Stack>

        {items}
    </Stack>;
}

export default ContactList;