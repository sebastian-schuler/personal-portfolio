import { ActionIcon, Anchor, Box, Burger, Button, createStyles, Divider, Drawer, Group, Header, ScrollArea, Stack, Text, useMantineColorScheme } from '@mantine/core';
import { useDisclosure, useMediaQuery, useWindowScroll } from '@mantine/hooks';
import { IconLanguage, IconMoonStars, IconSun } from '@tabler/icons';
import { useTranslation } from 'next-i18next';
import LanguageSwitch from '../../features/LanguageSwitch';
import PaddedContainer from '../PaddedContainer';

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

  linkNumber: {
    color: theme.colors.primary[4],
    marginRight: theme.spacing.xs,
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

const PageHeader = () => {

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, theme } = useStyles();
  const [scroll] = useWindowScroll();
  const { t } = useTranslation('common');
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const largeScreen = useMediaQuery('(min-width: ' + theme.breakpoints.sm + 'px)');
  const dark = colorScheme === 'dark';

  const links: HeaderLink[] = [
    { link: '#about', label: t('mniAbout') },
    { link: '#experience', label: t('mniExperience') },
    { link: '#work', label: t('mniWork') },
    { link: '#contact', label: t('mniContact') },
  ]

  const items = links.map((link, i) => {
    return (
      <Anchor
        key={link.label}
        href={link.link}
        className={classes.link}
      >
        <span className={classes.linkNumber}>0{i + 1}.</span>
        {link.label}
      </Anchor>
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
        <PaddedContainer sx={{ height: '100%' }}>
          <Box className={classes.inner} >
            <Text>Home</Text>

            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              {items}

              <Group ml={"md"}>
                <ActionIcon
                  variant="outline"
                  color={dark ? 'yellow' : 'blue'}
                  onClick={() => toggleColorScheme()}
                  title={t('mniColorScheme')}
                >
                  {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                </ActionIcon>
                <LanguageSwitch />
              </Group>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Box>
        </PaddedContainer>
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
    </>
  );

}

export default PageHeader