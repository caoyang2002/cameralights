import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PhotoMentor - Learn Photography from Experts',
  description: 'Master photography with expert-led courses, join a vibrant community, and enhance your skills with practical projects.',
  keywords: 'photography, courses, learning, community, photo tutorials, camera skills',
  openGraph: {
    title: 'PhotoMentor - Learn Photography from Experts',
    description: 'Master photography with expert-led courses and join our vibrant community',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}