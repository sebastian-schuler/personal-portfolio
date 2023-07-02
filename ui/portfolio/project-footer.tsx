import { createStyles, Divider, SimpleGrid, Space, Text } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';
import { Post } from '../../types/blog';
import { Project } from '../../types/portfolio';
import PortfolioPreview from './portfolio-preview';

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
    const { t } = useTranslation('portfolio');

    return (
        <>
            <Divider my={'xl'} />

            <Text size={48} mb={"lg"} className={classes.title}>{t("otherProjectsHeader")}</Text>

            <SimpleGrid
                spacing={'lg'}
                breakpoints={[
                    { minWidth: 'sm', cols: 3, spacing: 'md' },
                    { minWidth: 'xs', cols: 2, spacing: 'md' },
                    { cols: 3, spacing: 'sm' },
                ]}>
                {
                    recommendedProjects.map((project, index) => (
                        <PortfolioPreview
                            key={project.slug}
                            slug={project.slug}
                            title={project.title}
                            description={project.excerpt}
                            image={project.coverImage}
                            appUrl={project.appUrl}
                            githubUrl={project.githubUrl}
                        />
                    ))
                }
            </SimpleGrid >

            <Space h={"xl"} />
        </>
    )
}

export default ProjectFooter;