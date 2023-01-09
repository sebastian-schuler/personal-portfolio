import { Box, Divider, Group, Stack, Text, useMantineTheme } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'
import PostSharePanel from '../blog/post-share-panel'
import DateFormatter from '../date-formatter'
import MyTitle from '../my-title'

type Props = {
    title: string
    coverImage: string
    date: string
    tags: string[]
    locales: string[]
    excerpt: string
}

const ProjectHeader = ({ title, coverImage, date, tags, locales, excerpt }: Props) => {

    const { t } = useTranslation('projects');
    const localeStrings = locales.map(locale => t(`common:locale.${locale}`));
    const theme = useMantineTheme();

    return (
        <Stack spacing={0} mb={'md'}>
            <MyTitle marginTop>{title}</MyTitle>

            <Box sx={{ fontSize: theme.fontSizes.lg }}>

                <Group spacing={'sm'}>
                    {t('headerProperties.technologies')}:
                    <Text component='span' weight={'bold'}>{tags.join(', ')}</Text>
                </Group>

                <Group spacing={'sm'}>
                    {t('headerProperties.people')}:
                    <Text component='span' weight={'bold'}>Sebastian Schuler</Text>
                </Group>

                <Group spacing={'sm'}>
                    {t('headerProperties.published')}:
                    <Text component='span' weight={'bold'}><DateFormatter dateString={date} /></Text>
                </Group>

                <Group spacing={'sm'}>
                    {t('headerProperties.languages')}:
                    <Text component='span' weight={'bold'}>{localeStrings.join(', ')}</Text>
                </Group>
            </Box>

            <Divider mt={'md'} mb={'xs'} />
            <PostSharePanel title={title} />
            <Divider mb={'md'} mt={'xs'} />

            <Text>{excerpt}</Text>
        </Stack>
    )
}

export default ProjectHeader