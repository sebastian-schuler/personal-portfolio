import { createStyles, Group } from '@mantine/core'
import React from 'react'
import PageBreadcrumbs from '../breadcrumbs'
import ILink from '../link'

const useStyles = createStyles((theme) => {
    return {
        group: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            marginBottom: theme.spacing.lg,
            paddingTop: theme.spacing.sm,
            paddingLeft: theme.spacing.md,
            paddingRight: theme.spacing.md,
            paddingBottom: theme.spacing.xs,
            borderRadius: theme.radius.sm,
        },
    };
});

const PostNav = () => {
    const { classes } = useStyles();
    return (
        <Group position='apart' className={classes.group}>
            <ILink label='Back to blog' url='/blog' type='internal' />
            <PageBreadcrumbs />
        </Group>
    )
}

export default PostNav