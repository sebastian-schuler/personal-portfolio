import { Card, createStyles, Divider, SimpleGrid, Space, Text } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Project from '../../interfaces/project';

const useStyles = createStyles((theme) => {

    return {

        title: {
            color: theme.colorScheme === 'dark' ? 'white' : theme.black,
        },

        cardTitle: {
            color: theme.colorScheme === 'dark' ? 'white' : theme.black,
            marginBottom: theme.spacing.sm,
            fontSize: '1.2em',
            fontWeight: 600,
        },

        card: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
        },

    };
});

type Props = {
    recommendedProjects: Project[]
}

const ProjectFooter = ({ recommendedProjects }: Props) => {

    const { classes } = useStyles();
    const { t } = useTranslation('projects');

    return (
        <>
            <Divider mt={'xl'} mb={'lg'} />

            <Text size={"lg"} mb={"lg"} weight={"bold"} className={classes.title}>{t("otherProjectsHeader")}</Text>

            <SimpleGrid cols={2}>
                {
                    recommendedProjects.map((project, index) => (
                        <Link key={index} href={`/projects/${project.slug}`} title={`Project: ${project.title}`}>
                            <Card className={classes.card}>
                                <Text className={classes.cardTitle}>{project.title}</Text>
                                <Text lineClamp={3}>{project.excerpt}</Text>
                            </Card>
                        </Link>
                    ))
                }
            </SimpleGrid>

            <Space h={"xl"} />
        </>
    )
}

export default ProjectFooter;