
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import { TrackContextProvider } from '@/lib/track.wrapper';
import { ToastProvider } from '@/utils/toast';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthWrapper>
          <ThemeRegistry>
            <ToastProvider>
              <TrackContextProvider>
                {children}
              </TrackContextProvider>
            </ToastProvider>
          </ThemeRegistry>
        </NextAuthWrapper>
      </body>
    </html>
  );
}
