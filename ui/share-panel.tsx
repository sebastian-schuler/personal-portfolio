import { ActionIcon, createStyles, Group, Popover, Stack, Text } from "@mantine/core";
import {
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconLink,
} from "@tabler/icons-react";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

const useStyles = createStyles((theme) => {
    return {
        footer: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : 'white',
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

interface Props {
    title: string
}

const SharePanel = ({ title }: Props) => {
    
    const { t } = useTranslation("common");
    const { classes, theme } = useStyles();

    const shareTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${window.location.href}&text=${title}`,
            "_blank"
        );
    };

    const shareLinkedin = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
            "_blank"
        );
    };

    const shareFacebook = () => {
        window.open(
            `https://www.facebook.com/sharer.php?u=${window.location.href}`,
            "_blank"
        );
    };

    const [isCopyLinkLabelVisible, setIsCopyLinkLabelVisible] = useState(false);

    const copyLink = () => {
        setIsCopyLinkLabelVisible(true);
        navigator.clipboard.writeText(window.location.href);
        const timeout = setTimeout(() => {
            setIsCopyLinkLabelVisible(false);
            timeout && clearTimeout(timeout);
        }, 1500);
    };

    return (
        <Group spacing={"sm"}>
            <ActionIcon
                variant="subtle"
                size={"lg"}
                onClick={shareTwitter}
                title={t("post.shareTwitter")}
                className={classes.icon}
            >
                <IconBrandTwitter size={24} />
            </ActionIcon>
            <ActionIcon
                variant="subtle"
                size={"lg"}
                onClick={shareLinkedin}
                title={t("post.shareLinkedIn")}
                className={classes.icon}
            >
                <IconBrandLinkedin size={24} />
            </ActionIcon>
            <ActionIcon
                variant="subtle"
                size={"lg"}
                onClick={shareFacebook}
                title={t("post.shareFacebook")}
                className={classes.icon}
            >
                <IconBrandFacebook size={24} />
            </ActionIcon>
            <Popover
                opened={isCopyLinkLabelVisible}
                position="top"
                withArrow
                shadow="md"
            >
                <Popover.Target>
                    <ActionIcon
                        variant="subtle"
                        size={"lg"}
                        onClick={copyLink}
                        title={t("post.shareLink")}
                        className={classes.icon}
                    >
                        <IconLink size={24} />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                    <Text size="sm">{t("post.shareLinkConfirm")}</Text>
                </Popover.Dropdown>
            </Popover>
        </Group>
    );
};

export default SharePanel;
