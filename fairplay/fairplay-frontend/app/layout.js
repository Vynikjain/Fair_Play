import { Providers } from './providers';
import './globals.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: 'FairPlay - Universal Event Access',
  description: 'Organize. Attend. Earn. The trustless infrastructure for any real-world event.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased bg-slate-950 text-white selection:bg-cyan-500/30">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}