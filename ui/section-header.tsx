import { Box, createStyles, Divider, Group, Text, Title } from '@mantine/core'
import React from 'react'

const useStyles = createStyles((theme) => ({

    outer: {
        paddingBottom: '48px',
        scrollMarginTop: 160,

        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            scrollMarginTop: 100,
        },
    },

    title: {
        fontWeight: 600,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    subtext: {
        fontSize: theme.fontSizes.md,
        textAlign: 'center',
        marginTop: theme.spacing.md
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
    subtext?: string;
}

const SectionHeader: React.FC<Props> = ({ title, anchor, subtext }: Props) => {

    const { classes } = useStyles();

    return (
        <Box id={anchor} className={classes.outer}>
            <Group>
                <Divider orientation='horizontal' sx={{ flexGrow: 1 }} />
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