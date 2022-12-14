import { Anchor, Box, createStyles, Group, Stack, Text } from '@mantine/core';
import { IconAt, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconMapPin, TablerIcon, IconExternalLink } from '@tabler/icons';
import useTranslation from 'next-translate/useTranslation';
import { SOCIAL_LINKS } from '../../lib/constants';

type ContactData = (
    {
        type: 'text'
        title: string
        icon: TablerIcon
        description: string
    } |
    {
        type: 'link'
        title: string
        icon: TablerIcon
        description: string
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
    const { title, description, type } = data;
    const Icon: TablerIcon = data.icon;
    const isLink = type === "link";

    return (
        <div className={cx(classes.wrapper, className)} {...others}>
            {
                <Box mr="md">
                    <Icon size={24} className={classes.icon} />
                </Box>
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
                                <IconExternalLink size={15} />
                                {description}
                            </Group>
                        </Anchor>
                    ) : (
                        <Text className={classes.description}>{description}</Text>

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
            type: "text",
            title: 'Email',
            description: 'hello@mantine.dev',
            icon: IconAt
        },
        {
            type: "text",
            title: 'Country',
            description: 'Germany',
            icon: IconMapPin
        },
        {
            type: "link",
            title: 'Github',
            description: SOCIAL_LINKS.github.name,
            url: SOCIAL_LINKS.github.url,
            icon: IconBrandGithub,
            linkTitle: t('footer.githubLinkTitle')
        },
        {
            type: "link",
            title: 'LinkedIn',
            description: SOCIAL_LINKS.linkedin.name,
            url: SOCIAL_LINKS.linkedin.url,
            icon: IconBrandLinkedin,
            linkTitle: t('footer.linkedinLinkTitle')
        },
        {
            type: "link",
            title: 'Twitter',
            description: SOCIAL_LINKS.twitter.name,
            url: SOCIAL_LINKS.twitter.url,
            icon: IconBrandTwitter,
            linkTitle: t('footer.twitterLinkTitle')
        },
    ];

    const items = DATA.map((item, index) => <ContactIcon key={index} data={item} />);

    return <Stack>{items}</Stack>;
}

export default ContactList;