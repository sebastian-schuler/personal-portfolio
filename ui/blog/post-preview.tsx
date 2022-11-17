import { createStyles, Group, Text } from '@mantine/core'
import Link from 'next/link'
import { toLink } from '../../lib/util'
import DateFormatter from '../date-formatter'

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

      '&:hover': {
        textDecoration: 'underline',
      }
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
}

const PostPreview = ({ title, coverImage, date, excerpt, slug, tags, readTime }: Props) => {

  const { classes } = useStyles();

  const tagList = tags.map((tag, i) => (
    <Link key={i} href={toLink('blog', 'tags', tag)}>
      <Text key={i + 'text'} className={classes.tag}>#{tag}</Text>
    </Link>
  ));

  return (
    <div>
      <Link href={toLink('blog', 'posts', slug)}>
        <h3 className={classes.title}>{title}</h3>
      </Link>
      <Group spacing={'sm'}>
        {tagList}
      </Group>
      <Group position='apart' mb={'sm'}>
        <DateFormatter dateString={date} />
        <Text>{readTime} min read</Text>
      </Group>
      <Text>
        {excerpt}
      </Text>
    </div>
  )
}

export default PostPreview;