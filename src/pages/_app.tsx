import '@/app/globals.css';
import type { AppProps } from 'next/app';
import { RouterProvider } from '@/lib/router';
import { Toaster } from '@/components/ui/toaster';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RouterProvider>
      <Component {...pageProps} />
      <Toaster />
    </RouterProvider>
  );
}
