import Footer from "../components/footer/Footer"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Footer />
    </html>
  );
}
