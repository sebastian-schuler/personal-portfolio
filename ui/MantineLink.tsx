import { Anchor, createStyles, DefaultMantineColor, Sx } from '@mantine/core'
import Link from 'next/link'


const useStyles = createStyles((theme) => ({

    link: {
        '&:hover': {
        }
    }
}));

interface Props {
    url: string
    label: string
    type: "internal" | "external" | "scroll"
    color?: DefaultMantineColor
    sx?: Sx
    className?: string
}

const MantineLink = ({ url, label, color, type, sx, className }: Props) => {

    const { classes } = useStyles();

    return (
        <>
            {
                type === "internal" && (
                    <Link href={url} passHref>
                        <Anchor component="a" color={color ? color : "primary.5"} classNames={[classes.link, className]} sx={{ ...sx }}>
                            {label}
                        </Anchor >
                    </Link >
                )
            }
            {
                type === "external" && (
                    <Anchor component="a" href={url} color={color ? color : "primary.4"} target={"_blank"} classNames={[classes.link, className]} sx={{ ...sx }}>
                        {label}
                    </Anchor>
                )
            }
            {
                type === "scroll" && (
                    <Anchor component="a" href={url} color={color ? color : "primary.5"} classNames={[classes.link, className]} sx={{ ...sx }}>
                        {label}
                    </Anchor >
                )
            }
        </>
    )
}

export default MantineLink