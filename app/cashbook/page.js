"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Cashbook() {
  const [schemes, setSchemes] = useState([]);
  const [schemeId, setSchemeId] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [cash, setCash] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data: s } = await supabase.from("schemes").select("*");
    const { data: c } = await supabase.from("cashbook").select("*");
    setSchemes(s || []);
    setCash(c || []);
  }

  async function add() {
    await supabase.from("cashbook").insert([
      { scheme_id: schemeId, amount, description: desc, date: new Date() }
    ]);
    setAmount(""); setDesc("");
    load();
  }

  return (
    <div style={{ padding:20 }}>
      <h2>Cash Book Entry</h2>

      <select onChange={e=>setSchemeId(e.target.value)}>
        <option>Select Scheme</option>
        {schemes.map(s=>(
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <input placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
      <button onClick={add}>Add Entry</button>

      <h3>Register</h3>
      <ul>
        {cash.map(c=>(
          <li key={c.id}>Scheme #{c.scheme_id} — ₹{c.amount} — {c.description}</li>
        ))}
      </ul>
    </div>
  );
}
