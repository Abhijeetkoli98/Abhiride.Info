import type { Metadata } from 'next';
import './globals.css';

import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'AbhiRide | Verified Zero-Profit Ride Cost-Sharing Platform',
  description: 'AbhiRide connects drivers with empty seats to passengers traveling on the same route to fairly split fuel & toll expenses with zero commercial markup.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 font-sans">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
