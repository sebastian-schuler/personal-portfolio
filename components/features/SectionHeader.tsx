import { Box, createStyles, Divider, Group, Title } from '@mantine/core'
import React from 'react'

const useStyles = createStyles((theme) => ({

    outer: {
        paddingTop: 100,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.lg,
    },

    title: {
        fontWeight: 600,
        fontSize: 32,
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
}

const SectionHeader: React.FC<Props> = ({ title, anchor, order }: Props) => {

    const { classes } = useStyles();

    return (
        <Box id={anchor} className={classes.outer}>
            <Group>
                <Title order={2} className={classes.title}>
                    <span className={classes.linkNumber}>{order < 9 && "0"}{order + 1}.{' '}</span>
                    {title}
                </Title>
                <Divider orientation='horizontal' sx={{flexGrow: 1}}/>
            </Group>
        </Box>
    )
}

export default SectionHeader