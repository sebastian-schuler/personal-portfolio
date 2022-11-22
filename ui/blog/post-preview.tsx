import { createStyles, Group, Text } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link'
import { toLink } from '../../lib/util'
import DateFormatter from '../date-formatter'
import LocaleFlags from '../locale-flags';

const useStyles = createStyles((theme) => {

  return {

    title: {
      color: theme.colorScheme === 'dark' ? 'white' : theme.black,
      lineHeight: 1.15,
      margin: 0,
      fontSize: '1.6em',

      '&:hover': {
        textDecoration: 'underline',
      }
    },

    tag: {
      textTransform: 'uppercase',
      fontFamily: theme.fontFamilyMonospace,
      color: theme.colors.primary[4],
      fontSize: '1.15em',
      lineHeight: 1,

      '&:hover': {
        textDecoration: 'underline',
      }
    }
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

  const { classes } = useStyles();
  const { t } = useTranslation('blog');

  const tagList = tags.map((tag, i) => (
    <Link
      key={i}
      href={toLink('blog', 'tag', tag)}
    >
      <Text key={i + 'text'} className={classes.tag}>#{tag}</Text>
    </Link>
  ));

  return (
    <div>

      <Link href={toLink('blog', 'post', slug)}>
        <h3 className={classes.title}>{title}</h3>
      </Link>

      <Group position='apart' mt={'sm'}>

        <Group spacing={'sm'}>
          {tagList}
        </Group>

        <LocaleFlags locales={locales} />

      </Group>

      <Group position='apart' mb={'sm'}>
        <DateFormatter dateString={date} />
        <Text>{readTime} {t("postReadTimeLabel")}</Text>
      </Group>

      <Text>
        {excerpt}
      </Text>

    </div>
  )
}

export default PostPreview;