import { ActionIcon, Affix, Transition, useMantineTheme } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons';

const ScrollTopButton = () => {

    const [scroll, scrollTo] = useWindowScroll();
    const theme = useMantineTheme();

    return (
        <Affix position={{ bottom: 20, right: 20 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
                {(transitionStyles) => (

                    <ActionIcon
                        variant="filled"
                        size={'lg'}
                        onClick={() => scrollTo({ y: 0 })}
                        style={transitionStyles}
                        title="Scroll to top"
                        sx={{
                            color: 'white',
                            backgroundColor: theme.colors.primary[5],
                            boxShadow: theme.shadows.md,

                            '&:hover': {
                                backgroundColor: theme.colors.primary[4],
                            }
                        }}
                    >
                        <IconArrowUp size={18} />
                    </ActionIcon>
                )}
            </Transition>
        </Affix>

    );
}

export default ScrollTopButton