import { Global } from '@mantine/core';

export function CustomFonts() {

  return (
    <>
      <Global styles={[
        {
          '@font-face': {
            fontFamily: 'Norican Regular',
            src: `url('/assets/fonts/Norican-Regular.ttf')`, //format("woff2")
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: "Audiowide",
            src: 'url("/assets/fonts/Audiowide-Regular.ttf")',
            fontStyle: "normal",
            fontWeight: "normal",
          }
        }
      ]} />
    </>
  );
}