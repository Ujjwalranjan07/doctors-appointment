// 📁 app/layout.tsx
import './globals.css';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doctor Appointment App',
  description: 'Book appointments with doctors seamlessly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
