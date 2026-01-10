"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ display:"flex", height:"100vh", justifyContent:"center", alignItems:"center", background:"#f4f6fb" }}>
      <div style={{ padding:40, background:"#fff", borderRadius:10, width:300 }}>
        <h2>Janpad Panchayat Takhatpur</h2>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:8,marginBottom:10}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",padding:8,marginBottom:10}} />
        <button style={{width:"100%",padding:10,background:"#2563eb",color:"#fff",border:"none"}}>Login</button>
      </div>
    </div>
  );
}
