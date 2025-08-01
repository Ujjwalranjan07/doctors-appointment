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
      <head>
        {/* ✅ FullCalendar CDN CSS for compatibility with StackBlitz */}
        <link
          href="https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.9/main.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.9/main.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
