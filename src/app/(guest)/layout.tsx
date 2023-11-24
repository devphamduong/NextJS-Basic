import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";
import NextAuthWrapper from "@/lib/next.auth.wrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
