"use client";
export const metadata = {
  title: "Janpad Panchayat Takhatpur",
  description: "Government Financial Management System"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ margin:0, fontFamily:"Segoe UI, Arial" }}>
        <div style={{ display:"flex", minHeight:"100vh" }}>
          <div style={{ width:220, background:"#0f172a", color:"#fff", padding:20 }}>
            <h3>Janpad Takhatpur</h3>
            <a href="/dashboard" style={{color:"#fff", display:"block", margin:"10px 0"}}>Dashboard</a>
            <a href="/schemes" style={{color:"#fff", display:"block", margin:"10px 0"}}>Schemes</a>
            <a href="/cashbook" style={{color:"#fff", display:"block", margin:"10px 0"}}>Cash Book</a>
          </div>
          <div style={{ flex:1, padding:20, background:"#f4f6fb" }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
