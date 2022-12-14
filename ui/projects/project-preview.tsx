import { createStyles, Group, Text } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { toLink } from '../../lib/util';
import DateFormatter from '../date-formatter';

const useStyles = createStyles((theme) => {

  return {
    title: {
      color: theme.colorScheme === 'dark' ? 'white' : theme.black,
      margin: 0,
      fontSize: '1.6em',

      '&:hover': {
        textDecoration: 'underline',
      }
    },

    details: {
      fontFamily: theme.fontFamilyMonospace,
      color: theme.colors.primary[4],
      fontSize: '1.15em',
    },

    featured: {
      borderLeft: `2px solid ${theme.colors.primary[4]}`,
      paddingLeft: '1em',
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
  locales: string[]
  isFeatured: boolean
}

const ProjectPreview = ({ title, coverImage, date, excerpt, slug, tags, locales, isFeatured }: Props) => {

  const { classes } = useStyles();
  const { t } = useTranslation('blog');

  const localeStrings = locales.map(locale => t(`common:locale.${locale}`));

  return (
    <div className={isFeatured ? classes.featured : ""}>

      <Link href={toLink('projects', slug)}>
        <h3 className={classes.title}>{title}</h3>
      </Link>

      <Group noWrap spacing="sm" className={classes.details}>
        <Text>{tags.join(', ')}</Text>
        <Text>•</Text>
        <DateFormatter dateString={date} />
        <Text>•</Text>
        {localeStrings.join(', ')}
      </Group>

      <Text>
        {excerpt}
      </Text>

    </div>
  )
}

export default ProjectPreview;