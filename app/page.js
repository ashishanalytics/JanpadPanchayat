"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error) setMsg("Invalid login");
    else window.location.href = "/dashboard";
  };

  return (
    <div style={{ display:"flex", height:"100vh", justifyContent:"center", alignItems:"center", background:"#f4f6fb" }}>
      <div style={{ padding:40, background:"#fff", borderRadius:10, width:300 }}>
        <h2>Janpad Panchayat Takhatpur</h2>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:8,marginBottom:10}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",padding:8,marginBottom:10}} />
        <button onClick={login} style={{width:"100%",padding:10,background:"#2563eb",color:"#fff",border:"none"}}>Login</button>
        <p>{msg}</p>
      </div>
    </div>
  );
}
