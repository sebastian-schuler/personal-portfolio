import { Button, createStyles, Drawer, Group, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react'
import { useGlobalContext } from '../lib/AppContext';

interface Props {
    contactDrawerVisible: boolean;
    setContactDrawerVisible: (visible: boolean) => void;
}

const ContactDrawer: React.FC<Props> = ({ contactDrawerVisible, setContactDrawerVisible }) => {

    return (
        <Drawer
            opened={contactDrawerVisible}
            onClose={() => setContactDrawerVisible(false)}
            title="Contact"
            padding="xl"
            size="xl"
            lockScroll={false}
        >
            {/* Drawer content */}
        </Drawer>
    );
}

export default ContactDrawer