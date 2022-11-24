import { Box, Burger, Button, Container, createStyles, Divider, Drawer, Group, Header, ScrollArea, Stack, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure, useMediaQuery, useWindowScroll } from '@mantine/hooks';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useState } from 'react';
import ColorSchemeSwitch from './color-scheme-switch';
import ContactDrawer from './contact-drawer';
import Contact from './contact-drawer';
import LanguageSwitch from './language-switch';
import PageLogo from './page-logo';

export const HEADER_HEIGHT = 80;
export const HEADER_MOBILE_HEIGHT = 60;

const useStyles = createStyles((theme) => ({

  inner: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,
    fontFamily: 'monospace, monospace',

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

interface HeaderLink {
  link: string; label: string; links?: { link: string; label: string }[];
}

const PageNav = () => {

  const { t } = useTranslation('common');

  const { classes, theme } = useStyles();
  const [scroll] = useWindowScroll();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [contactDrawerOpen, { toggle: toggleContactDrawer, close: closeContactDrawer }] = useDisclosure(false);

  const largeScreen = useMediaQuery('(min-width: ' + theme.breakpoints.sm + 'px)');

  const links: HeaderLink[] = [
    { link: '/', label: t('navItems.home') },
    { link: '/projects', label: t('navItems.projects') },
    { link: '/blog', label: t('navItems.blog') },
  ]

  const items = links.map((link, i) => {
    return (
      <Link key={i} href={link.link}>
        <Text
          key={link.label}
          className={classes.link}
        >
          {link.label}
        </Text>
      </Link>
    );
  });

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
              {items}

              <UnstyledButton
                className={classes.link}
                onClick={() => toggleContactDrawer()}
              >
                {t('navItems.contact')}
              </UnstyledButton>

              <Group ml={"md"}>

                <ColorSchemeSwitch />

                <LanguageSwitch />

              </Group>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Box>
        </Container>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={t('mobileNavTitle')}
        className={classes.hiddenDesktop}
        zIndex={1000000}
        transition={"slide-left"}
        styles={(theme) => ({
          closeButton: {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[7],
          }
        })}
      >
        <ScrollArea sx={{ height: 'calc(100vh - ' + HEADER_HEIGHT + 'px)' }} mx="-md">

          <Divider mb="lg" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.4'} />

          <Stack spacing={"sm"}>
            {items}

            <UnstyledButton
              className={classes.link}
              onClick={() => {
                closeDrawer();
                toggleContactDrawer();
              }}
            >
              {t('navItems.contact')}
            </UnstyledButton>

          </Stack>

          <Divider mt="lg" mb="md" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.4'} />

        </ScrollArea>
      </Drawer>

      <Contact
        drawerOpened={contactDrawerOpen}
        closeDrawer={closeContactDrawer}
      />
    </>
  );

}

export default PageNav;