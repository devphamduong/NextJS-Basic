import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div style={{ marginBottom: "50px" }}>
        <AppHeader />
      </div>
      {children}
      <div style={{ marginTop: "50px" }}>
        <AppFooter />
      </div>
    </>
  );
}
