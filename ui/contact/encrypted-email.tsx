import { Anchor, Text, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react'

interface Props {
  email: string
}

const EncryptedEmail = ({ email }: Props) => {

  const [isVisible, setIsVisible] = useState(false);

  const atIndex = email.indexOf('@');
  let encryptedMail = '';
  let i = 0;
  for (const char of email) {
    if (i === 0 || i >= atIndex || char === '.' || email.charAt(i - 1) === '.') {
      encryptedMail += char;
    } else {
      encryptedMail += '*';
    }
    i++;
  }

  if (isVisible) {
    return (
      <Anchor href={`mailto:${email}`}>
        {email}
      </Anchor>
    )
  } else {
    return (
      <UnstyledButton onClick={() => setIsVisible(true)}>
        <Text color={'primary'}>
          {isVisible ? email : encryptedMail}
        </Text>
      </UnstyledButton>
    )
  }

}

export default EncryptedEmail