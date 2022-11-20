import { ActionIcon, Divider, Group, Popover, Stack, Text } from "@mantine/core"
import { IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter, IconLink } from "@tabler/icons"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import { useState } from "react"
import { toLink } from "../../lib/util"
import DateFormatter from "../date-formatter"
import ILink from "../link"
import BlogTitle from "./blog-title"
import PostSharePanel from "./post-share-panel"


type Props = {
    title: string
    coverImage: string
    date: string
    tags: string[]
}

const PostHeader = ({ title, coverImage, date, tags }: Props) => {

    return (
        <Stack spacing={0} mb={'md'}>
            <BlogTitle marginBottom>{title}</BlogTitle>
            <Group>
                {
                    tags.map((tag, i) => (
                        <ILink key={i} url={toLink('blog', 'tag', tag)} type="internal" sx={{ textTransform: 'uppercase', fontSize: 18 }}>#{tag}</ILink>
                    ))
                }
            </Group>
            <Text size='lg'>Sebastian Schuler</Text>
            <Text size='lg'>
                <DateFormatter dateString={date} />
            </Text>
            <Divider mt={'md'} mb={'xs'} />
            <PostSharePanel title={title} />
            <Divider mb={'md'} mt={'xs'} />
        </Stack>
    )
}

export default PostHeader;
