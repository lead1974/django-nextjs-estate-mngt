import localFont from 'next/font/local';

export const openSans = localFont({
  src: [
    {
      path: '../../public/assets/fonts/OpenSans-Light.ttf', // Updated path
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-openSans',
});

export const robotoSlab = localFont({
  src: [
    {
      path: '../../public/assets/fonts/RobotoSlab-Light.ttf', // Updated path
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-robotoSlab',
});