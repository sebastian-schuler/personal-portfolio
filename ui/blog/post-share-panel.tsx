import { ActionIcon, Group, Popover, Text } from "@mantine/core";
import {
    IconBrandFacebook,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconLink,
} from "@tabler/icons";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

interface Props {
    title: string
}

const PostSharePanel = ({ title }: Props) => {
    const { t } = useTranslation("blog");

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
                title={t("shareTwitter")}
            >
                <IconBrandTwitter size={24} />
            </ActionIcon>
            <ActionIcon
                variant="subtle"
                size={"lg"}
                onClick={shareLinkedin}
                title={t("shareLinkedIn")}
            >
                <IconBrandLinkedin size={24} />
            </ActionIcon>
            <ActionIcon
                variant="subtle"
                size={"lg"}
                onClick={shareFacebook}
                title={t("shareFacebook")}
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
                        title={t("shareLink")}
                    >
                        <IconLink size={24} />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                    <Text size="sm">{t("shareLinkConfirm")}</Text>
                </Popover.Dropdown>
            </Popover>
        </Group>
    );
};

export default PostSharePanel;
