import { Button } from '@mantine/core';
import React from 'react'
import { useGlobalContext } from '../../lib/AppContext';
import ContactDrawer from '../ContactDrawer'
import SectionHeader from '../SectionHeader'

const ContactSection = () => {

    const { setContactDrawerVisible } = useGlobalContext();

    return (
        <>
            <SectionHeader anchor='contact' title='Contact Me' order={3} />

            <Button onClick={() => setContactDrawerVisible(true)}>Contact</Button>
        </>
    )
}

export default ContactSection