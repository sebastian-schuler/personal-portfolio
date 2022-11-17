import { ActionIcon, Divider, Group, Popover, Stack, Text } from "@mantine/core"
import { IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter, IconLink } from "@tabler/icons"
import { useState } from "react"
import DateFormatter from "../date-formatter"
import BlogTitle from "./blog-title"


type Props = {
    title: string
    coverImage: string
    date: string
}

const PostHeader = ({ title, coverImage, date }: Props) => {

    const shareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${title}`, '_blank');
    }

    const shareLinkedin = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank');
    }

    const shareFacebook = () => {
        window.open(`https://www.facebook.com/sharer.php?u=${window.location.href}`, '_blank');
    }

    const [isCopyLinkLabelVisible, setIsCopyLinkLabelVisible] = useState(false);

    const copyLink = () => {
        setIsCopyLinkLabelVisible(true);
        navigator.clipboard.writeText(window.location.href);
        const timeout = setTimeout(() => {
            setIsCopyLinkLabelVisible(false);
            timeout && clearTimeout(timeout);
        }, 1500);
    }

    return (
        <Stack spacing={0} mb={'md'}>
            <BlogTitle>{title}</BlogTitle>
            <Text weight={'bold'} size='lg'>Sebastian Schuler</Text>
            <Text size='lg'>
                <DateFormatter dateString={date} />
            </Text>
            <Divider mt={'md'} mb={'xs'} />
            <Group spacing={'sm'}>
                <ActionIcon variant="subtle" size={'lg'} onClick={shareTwitter} title={'Share this article on Twitter'}>
                    <IconBrandTwitter size={24}/>
                </ActionIcon>
                <ActionIcon variant="subtle" size={'lg'} onClick={shareLinkedin} title={'Share this article on LinkedIn'}>
                    <IconBrandLinkedin size={24} />
                </ActionIcon>
                <ActionIcon variant="subtle" size={'lg'} onClick={shareFacebook} title={'Share this article on Facebook'}>
                    <IconBrandFacebook size={24} />
                </ActionIcon>
                <Popover opened={isCopyLinkLabelVisible} position="top" withArrow shadow="md">
                    <Popover.Target>
                        <ActionIcon variant="subtle" size={'lg'} onClick={copyLink} title={'Copy the link to this article'}>
                            <IconLink size={24} />
                        </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text size="sm">Link copied to clipboard.</Text>
                    </Popover.Dropdown>
                </Popover>

            </Group>
            <Divider mb={'md'} mt={'xs'} />
        </Stack>
    )
}

export default PostHeader;
