export const metadata = {
  title: "Janpad Panchayat Takhatpur",
  description: "Government Financial Management System"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ margin: 0, fontFamily: "Arial" }}>
        {children}
      </body>
    </html>
  );
}
