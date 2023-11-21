import '~/styles/globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import Providers from '~/components/providers/Providers';

export const metadata: Metadata = {
  title: 'DuttoMedia',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
      </body>
    </html>
  );
};

export default RootLayout;
