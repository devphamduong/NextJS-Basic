import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppHeader />
          {children}
          <AppFooter />
        </ThemeRegistry>
      </body>
    </html>
  );
}
