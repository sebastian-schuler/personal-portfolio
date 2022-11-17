import { Box, createStyles, List, Stack, Tabs, Text, Title } from '@mantine/core';
import { IconAward, IconBook, IconBuilding, IconPoint, IconSchool } from '@tabler/icons';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';
import ILink from '../link';
import SectionHeader from '../section-header';

interface ExperienceItem {
    value: string
    tabTitle: string
    tabIcon: JSX.Element
    institution: string
    institutionUrl: string
    title: string
    years: string
    paragraph?: string
    list?: string[]
    footer?: ReactNode
}

const useStyles = createStyles((theme) => ({

    tabsContentTitle: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 600,
        lineHeight: 1,
    }

}));

const ExperienceSection = () => {

    const { classes, theme } = useStyles();
    const { t } = useTranslation(['index', 'common']);

    const tabContent: ExperienceItem[] = [
        {
            value: 'hskl',
            tabTitle: t("experience.hskl.tabTitle"),
            tabIcon: <IconSchool size={24} />,
            institution: t("experience.hskl.institution"),
            institutionUrl: 'https://www.hs-kl.de/en/informatik-und-mikrosystemtechnik/studiengaenge/digital-media-marketing',
            title: t("experience.hskl.title"),
            years: t("experience.hskl.years"),
            list: t("experience.hskl.list", { returnObjects: true }) as string[],
        },
        {
            value: 'ux',
            tabTitle: t("experience.ux.tabTitle"),
            tabIcon: <IconAward size={24} />,
            institution: t("experience.ux.institution"),
            institutionUrl: 'https://uxqb.org/en/certification/foundation-level-cpux-f/',
            title: t("experience.ux.title"),
            years: t("experience.ux.years"),
            paragraph: t("experience.ux.paragraph"),
            list: t("experience.ux.list", { returnObjects: true }),
            footer: (
                <Text>
                    {t("experience.ux.footer.text")}
                    <ILink url='https://uxqb.org/en/certification/foundation-level-cpux-f/' type='external'>{t("experience.ux.footer.linkLabel")}</ILink>
                </Text>),
        },
        {
            value: 'edv',
            tabTitle: t("experience.edv.tabTitle"),
            tabIcon: <IconBuilding size={24} />,
            institution: t("experience.edv.institution"),
            institutionUrl: 'https://www.edv-hoehne.de/',
            title: t("experience.edv.title"),
            years: t("experience.edv.years"),
            paragraph: t("experience.edv.paragraph"),
            list: t("experience.edv.list", { returnObjects: true }),
        },
        {
            value: 'bbs',
            tabTitle: t("experience.bbs.tabTitle"),
            tabIcon: <IconBook size={24} />,
            institution: t("experience.bbs.institution"),
            institutionUrl: 'http://www.bbs-suew.de/',
            title: t("experience.bbs.title"),
            years: t("experience.bbs.years"),
            list: t("experience.bbs.list", { returnObjects: true }),
        },
    ]

    const getContent = ({ value, institution, institutionUrl, title, years, paragraph, list, footer }: ExperienceItem) => {
        return (
            <Tabs.Panel key={value} value={value} pl="lg">
                <Stack spacing={4} mb={theme.spacing.md}>
                    <ILink url={institutionUrl} type='external'>{institution}</ILink>
                    <Title order={3} className={classes.tabsContentTitle}>{title}</Title>
                    <Text>{years}</Text>
                </Stack>
                <Stack spacing={theme.spacing.sm} mb={theme.spacing.md}>
                    {
                        paragraph && <Text>{paragraph}</Text>
                    }
                    {
                        list && (
                            <List size="md" icon={<IconPoint size={22} />}>
                                {
                                    list.map((item, index) => (
                                        <List.Item key={index}>
                                            {item}
                                        </List.Item>
                                    ))
                                }
                            </List>
                        )
                    }
                    {
                        footer && footer
                    }
                </Stack>
            </Tabs.Panel>
        )
    }

    return (
        <Box mb={"xl"}>
            <SectionHeader anchor='experience' title={t("menu.experience", { ns: "common" })} order={1} />

            <Tabs orientation="vertical" defaultValue="hskl">
                <Tabs.List>
                    {
                        tabContent.map(({ value, tabTitle, tabIcon }) => (
                            <Tabs.Tab key={value} value={value} icon={tabIcon}>{tabTitle}</Tabs.Tab>
                        ))
                    }
                </Tabs.List>

                {tabContent.map((item) => getContent(item))}

            </Tabs>
        </Box>
    )
}

export default ExperienceSection