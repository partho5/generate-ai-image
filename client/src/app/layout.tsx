// client/src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import ThemeWrapper from "@/components/ThemeWrapper";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <UserProvider>
            <ClientProvider>
                <ThemeWrapper>
                    <Navbar />
                    <div className="flex min-h-screen flex-col items-center">
                        {children}
                    </div>
                </ThemeWrapper>
            </ClientProvider>
        </UserProvider>
        </body>
        </html>
    );
}
