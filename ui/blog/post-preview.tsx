import { Badge, createStyles, getStylesRef, Group, Stack, Text, Title } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { toLink } from '../../lib/util';
import DateFormatter from '../date-formatter';

const useStyles = createStyles((theme, _params) => {

  return {

    container: {
      cursor: 'pointer',

      [`&:hover .${getStylesRef('title')}`]: {
        textDecoration: 'underline',
      }
    },

    title: {
      ref: getStylesRef('title'),
      lineHeight: 1.15,
      margin: 0,
      fontSize: '1.6em',
      color: theme.colors.blue[4]
    },

    details: {
      fontSize: theme.fontSizes.md,
      fontWeight: 'bold',
      color: theme.colorScheme === 'dark' ? 'white' : theme.fn.rgba(theme.colors.dark[4], 0.8),
    },

  };
});

interface Props {
  title: string
  coverImage: string
  date: string
  excerpt: string
  slug: string
  tags: string[]
  readTime: number
  locales: string[]
}

const PostPreview = ({ title, coverImage, date, excerpt, slug, tags, readTime, locales }: Props) => {

  const { classes, theme } = useStyles();
  const { t } = useTranslation('blog');

  const articleLink = toLink('blog', slug);

  const tagList = tags.map((tag, i) => (
    <Badge
      variant='outline'
      key={i + 'text'}
      color={theme.colorScheme === "dark" ? 'primary.4' : 'primary.4'}
      size={'md'}
      radius={'md'}
    >{tag}</Badge>
  ));

  const localeStrings = locales.map(locale => t(`common:locale.${locale}`));

  return (
    <Link href={articleLink} title={t('postPreviewLinkTitle', { title: title })}>
      <Stack spacing={"sm"} className={classes.container}>

        <Group spacing={'sm'}>{tagList}</Group>

        <Title order={3} className={classes.title} color={'cyan'}>{title}</Title>

        <Group noWrap spacing="sm" className={classes.details}>
          <DateFormatter dateString={date} />
          <Text>•</Text>
          <Text>{readTime} {t("common:post.readTimeLabel")}</Text>
          <Text>•</Text>
          {localeStrings.join(', ')}
        </Group>

        <Text color={theme.colorScheme === "dark" ? theme.colors.gray[5] : theme.colors.gray[7]}>
          {excerpt}
        </Text>

      </Stack>
    </Link>
  )
}

export default PostPreview;