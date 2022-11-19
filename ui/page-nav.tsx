import { ActionIcon, Box, Burger, Button, Container, createStyles, Divider, Drawer, Group, Header, ScrollArea, Stack, Text, UnstyledButton, useMantineColorScheme } from '@mantine/core';
import { useDisclosure, useMediaQuery, useWindowScroll } from '@mantine/hooks';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import Contact from './contact';
import LanguageSwitch from './language-switch';

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

  // TODO save lang and theme in cookie
  const [contactDrawerVisible, setContactDrawerVisible] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, theme } = useStyles();
  const [scroll] = useWindowScroll();
  const { t } = useTranslation('common');
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const largeScreen = useMediaQuery('(min-width: ' + theme.breakpoints.sm + 'px)');
  const dark = colorScheme === 'dark';

  const links: HeaderLink[] = [
    { link: '/', label: "Home" },
    { link: '/projects', label: "Projects" },
    { link: '/blog', label: "Blog" },
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
            <Text>Home</Text>

            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              {items}

              <UnstyledButton
                className={classes.link}
                onClick={() => setContactDrawerVisible(true)}
              >
                Contact
              </UnstyledButton>

              <Group ml={"md"}>
                <ActionIcon
                  variant="outline"
                  color={dark ? 'yellow' : 'blue'}
                  onClick={() => toggleColorScheme()}
                  title={t('menu.colorScheme')}
                >
                  {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                </ActionIcon>
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
        title="Navigation"
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
          </Stack>

          <Divider mt="lg" mb="md" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.4'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="outline">Contact</Button>
          </Group>
        </ScrollArea>
      </Drawer>

      <Contact
        contactDrawerVisible={contactDrawerVisible}
        setContactDrawerVisible={setContactDrawerVisible}
      />
    </>
  );

}

export default PageNav;