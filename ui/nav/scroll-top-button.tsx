import { Affix, Button, Transition, useMantineTheme } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons';
import React from 'react'

const ScrollTopButton = () => {
    const [scroll, scrollTo] = useWindowScroll();
    const theme = useMantineTheme();

    return (
        <Affix position={{ bottom: 20, right: 20 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
                {(transitionStyles) => (
                    <Button
                        sx={{
                            color: 'white',
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.dark[1],
                        }}
                        leftIcon={<IconArrowUp size={16} />}
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: 0 })}
                    >
                        Scroll to top
                    </Button>
                )}
            </Transition>
        </Affix>

    );
}

export default ScrollTopButton