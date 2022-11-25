import { Button, createStyles, Divider, Drawer, ScrollArea, Stack, Text } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import ColorSchemeSwitch from './color-scheme-switch'
import LanguageSwitch from './language-switch'
import { HEADER_HEIGHT, NavHeaderLink } from './page-nav'

const useStyles = createStyles((theme) => ({
    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
    menuItem: {
        lineHeight: 1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontSize: theme.fontSizes.lg,
        fontWeight: 500,
    },
}));

interface Props {
    drawerOpened: boolean
    closeDrawer: () => void
    navLinks: NavHeaderLink[]
}

const PageNavMobile = ({ drawerOpened, closeDrawer, navLinks }: Props) => {

    const { t } = useTranslation('common');
    const { classes, theme } = useStyles();

    return (
        <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size='100%'
            padding='md'
            title={t('mobileNavTitle')}
            className={classes.hiddenDesktop}
            zIndex={1000000}
            transition={'slide-left'}
            styles={(theme) => ({
                closeButton: {
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[7],
                }
            })}
        >
            <ScrollArea sx={{ height: 'calc(100vh - ' + HEADER_HEIGHT + 'px)' }} mx='-md'>

                <Divider mb='lg' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.4'} />

                <Stack mx={'md'} spacing={'md'}>
                    {
                        navLinks.map((link, i) => (
                            <Link key={i} href={link.link}>
                                <Button
                                    key={link.label}
                                    variant={'default'}
                                    className={classes.menuItem}
                                    fullWidth
                                    sx={{ borderColor: link.isActive ? theme.colors.primary[4] : theme.colors.dark[4] }}
                                    onClick={closeDrawer}
                                >
                                    {link.label}
                                </Button>
                            </Link>
                        ))
                    }
                </Stack>

                <Divider my='lg' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.4'} />

                <Stack mx={'md'}>
                    <Text>{t('languageSwitchTitle')}</Text>
                    <LanguageSwitch />
                </Stack>

                <Divider my='lg' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.4'} />

                <Stack ml={'md'}>
                    <Text>{t('colorSchemeTitle')}</Text>
                    <ColorSchemeSwitch size='xl' />
                </Stack>

            </ScrollArea>
        </Drawer>
    )
}

export default PageNavMobile