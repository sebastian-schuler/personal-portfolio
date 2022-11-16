import { Box, createStyles, Divider, Group, Text, Title } from '@mantine/core'
import React from 'react'

const useStyles = createStyles((theme) => ({

    outer: {
        paddingTop: 100,
        paddingBottom: theme.spacing.lg,
    },

    title: {
        fontWeight: 600,
        fontSize: 32,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    subtext: {
        fontSize: theme.fontSizes.lg,
    },

    linkNumber: {
        color: theme.colors.primary[4],
        fontFamily: 'monospace, monospace',
        fontWeight: 500,
    },

}));

interface Props {
    title: string;
    anchor: string;
    order: number;
    subtext?: string;
}

const SectionHeader: React.FC<Props> = ({ title, anchor, order, subtext }: Props) => {

    const { classes } = useStyles();

    return (
        <Box id={anchor} className={classes.outer}>
            <Group>
                <Divider orientation='horizontal' sx={{ width: 30 }} />
                <Title order={2} className={classes.title}>{title}</Title>
                <Divider orientation='horizontal' sx={{ flexGrow: 1 }} />
            </Group>
            {
                subtext && <Text className={classes.subtext}>{subtext}</Text>
            }
        </Box>
    )
}

export default SectionHeader