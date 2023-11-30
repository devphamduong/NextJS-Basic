import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import { ToastProvider } from "@/utils/toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            <ToastProvider>{children}</ToastProvider>
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
