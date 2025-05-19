import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { SermonProvider } from '@/context/SermonContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sermon Generator',
  description: 'Generate sermon outlines with AI assistance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <SermonProvider>
          <div className="pb-16">
            {children}
          </div>
          <Navbar />
        </SermonProvider>
      </body>
    </html>
  );
}
