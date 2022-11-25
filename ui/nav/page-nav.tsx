import { Box, Burger, Button, Container, createStyles, Group, Header } from '@mantine/core';
import { useDisclosure, useMediaQuery, useWindowScroll } from '@mantine/hooks';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ColorSchemeSwitch from './color-scheme-switch';
import LanguageDrawer from './language-drawer';
import PageLogo from './page-logo';
import PageNavMobile from './page-nav-mobile';

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
    borderRadius: 0,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      textDecoration: 'none',
    },
  },

  menuItemActive: {
    lineHeight: 1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
    fontWeight: 600,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      textDecoration: 'none',
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

const PageNav = () => {

  const { t } = useTranslation('common');
  const { classes, theme } = useStyles();
  const router = useRouter();
  const [scroll] = useWindowScroll();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const largeScreen = useMediaQuery('(min-width: ' + theme.breakpoints.sm + 'px)');

  const navLinks: NavHeaderLink[] = [
    {
      link: '/',
      label: t('navItems.home'),
      isActive: router.route === '/'
    },
    {
      link: '/projects',
      label: t('navItems.projects'),
      isActive: router.route.startsWith('/projects')
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
        height={largeScreen ? HEADER_HEIGHT : HEADER_MOBILE_HEIGHT}
        fixed
        styles={(theme) => ({
          root: {
            borderBottomStyle: scroll.y > 0 ? 'solid' : `none`,
            boxShadow: scroll.y > 0 ? (theme.colorScheme === 'dark' ? theme.shadows.md : theme.shadows.sm) : `none`,
          }
        })}
      >
        <Container sx={{ height: '100%' }}>
          <Box className={classes.inner} >
            <PageLogo />

            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              {
                navLinks.map((link, i) => (
                  <Link key={i} href={link.link}>
                    <Button
                      key={link.label}
                      variant='subtle'
                      className={link.isActive ? classes.menuItemActive : classes.menuItem}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))
              }

              <Group ml={"md"}>
                <ColorSchemeSwitch />
                <LanguageDrawer />
              </Group>

            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Box>
        </Container>
      </Header>

      <PageNavMobile
        closeDrawer={closeDrawer}
        drawerOpened={drawerOpened}
        navLinks={navLinks}
      />

    </>
  );

}

export default PageNav;