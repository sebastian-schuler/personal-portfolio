import { Box, Burger, Button, Container, createStyles, Group, Header } from '@mantine/core';
import { useWindowScroll, useDisclosure } from '@mantine/hooks';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ColorSchemeSwitch from './color-scheme-switch';
import LanguageMenu from './language-menu';
import PageLogo from './page-logo';
import PageNavMobile from './page-nav-mobile';
import ScrollTopButton from './scroll-top-button';

export const HEADER_HEIGHT = 80;
export const HEADER_MOBILE_HEIGHT = 60;

const useStyles = createStyles((theme) => ({

  inner: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuItem: {
    lineHeight: 1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      textDecoration: 'none',
    },

    '&:active': {
      fontWeight: 'bolder',

    },
  },

  linkLabel: {
    marginRight: theme.spacing.sm,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export interface NavHeaderLink {
  link: string
  label: string
  isActive: boolean
}

interface PageNavProps {
  navLinks: NavHeaderLink[]
  drawerOpened: boolean
  toggleDrawer: () => void
  logoFont: string
}

const PageNav: React.FC<PageNavProps> = ({ navLinks, drawerOpened, toggleDrawer, logoFont }: PageNavProps) => {

  const { t } = useTranslation('common');
  const { classes } = useStyles();

  return (
    <Container sx={{ height: '100%' }}>
      <Box className={classes.inner} >
        <PageLogo logoFont={logoFont} />

        <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
          {
            navLinks.map((link, i) => (
              <Link key={i} href={link.link}>
                <Button
                  key={link.label}
                  variant='subtle'
                  className={classes.menuItem}
                  sx={{ fontWeight: link.isActive ? 'bold' : 'normal' }}
                >
                  {link.label}
                </Button>
              </Link>
            ))
          }

          <Group ml={"md"}>
            <ColorSchemeSwitch />
            <LanguageMenu />
          </Group>

        </Group>

        <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
      </Box>
    </Container>
  );

}

type Props = {
  logoFont: string
}

const PageNavContainer = ({ logoFont }: Props) => {

  const { t } = useTranslation('common');
  const router = useRouter();
  const [scroll] = useWindowScroll();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const navLinks: NavHeaderLink[] = [
    {
      link: '/',
      label: t('navItems.home'),
      isActive: router.route === '/'
    },
    {
      link: '/portfolio',
      label: t('navItems.portfolio'),
      isActive: router.route.startsWith('/portfolio')
    },
    {
      link: '/blog',
      label: t('navItems.blog'),
      isActive: router.route.startsWith('/blog')
    },
    {
      link: '/contact',
      label: t('navItems.contact'),
      isActive: router.route === '/contact'
    },
  ];

  return (
    <>
      <Header
        height={HEADER_HEIGHT}
        fixed
        styles={(theme) => ({
          root: {
            borderBottomStyle: scroll.y > 0 ? 'solid' : `none`,
            boxShadow: scroll.y > 0 ? (theme.colorScheme === 'dark' ? theme.shadows.md : theme.shadows.sm) : `none`,
          }
        })}
      >
        <PageNav navLinks={navLinks} drawerOpened={drawerOpened} toggleDrawer={toggleDrawer} logoFont={logoFont} />
      </Header>

      <PageNavMobile
        closeDrawer={closeDrawer}
        drawerOpened={drawerOpened}
        navLinks={navLinks}
      />

      <ScrollTopButton />
    </>
  );

}

export default PageNavContainer;