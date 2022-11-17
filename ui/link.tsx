import { Anchor, createStyles, DefaultMantineColor, Sx, Text } from '@mantine/core';
import Link from 'next/link';
import { ReactNode } from 'react';


const useStyles = createStyles((theme) => ({
    link: {
        '&:hover': {
            textDecoration: 'underline',
        }
    }
}));

interface Props {
    url: string
    children: ReactNode
    type: "internal" | "external" | "scroll"
    color?: DefaultMantineColor
    sx?: Sx
}

const ILink = ({ url, children, color, type, sx }: Props) => {

    const { classes, theme } = useStyles();

    return (
        <>
            {
                type === "internal" && (
                    <Link href={url}>
                        <Text
                            color={color ? color : theme.colors.primary[4]}
                            className={classes.link}
                            sx={{ ...sx }}
                        >
                            {children}
                        </Text >
                    </Link >
                )
            }
            {
                type === "external" && (
                    <Anchor
                        component="a"
                        href={url}
                        color={color ? color : theme.colors.primary[4]}
                        target={"_blank"}
                        className={classes.link}
                        sx={{ ...sx }}
                    >
                        {children}
                    </Anchor>
                )
            }
            {
                type === "scroll" && (
                    <Anchor
                        component="a"
                        href={url}
                        color={color ? color : theme.colors.primary[4]}
                        className={classes.link}
                        sx={{ ...sx }}
                    >
                        {children}
                    </Anchor >
                )
            }
        </>
    )
}

export default ILink