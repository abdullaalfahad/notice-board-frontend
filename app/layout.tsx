import { MainScrollArea } from '@/components/layouts/main-scroll-area';
import { Sidebar } from '@/components/layouts/sidebar';
import { Topbar } from '@/components/layouts/topbar';
import QueryProvider from '@/providers/query-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Notice Board',
  description: 'A simple notice board application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <QueryProvider>
              <QueryProvider>
                <MainScrollArea>{children}</MainScrollArea>
              </QueryProvider>
            </QueryProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
