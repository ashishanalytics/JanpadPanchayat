"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Schemes() {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("Active");
  const [schemes, setSchemes] = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase.from("schemes").select("*");
    setSchemes(data || []);
  }

  async function addScheme() {
    await supabase.from("schemes").insert([{ name, budget, status }]);
    setName(""); setBudget("");
    load();
  }

  return (
    <div style={{ padding:20 }}>
      <h2>Add Scheme</h2>
      <input placeholder="Scheme Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Budget" value={budget} onChange={e=>setBudget(e.target.value)} />
      <select value={status} onChange={e=>setStatus(e.target.value)}>
        <option>Active</option>
        <option>Completed</option>
      </select>
      <button onClick={addScheme}>Add</button>

      <h3>All Schemes</h3>
      <ul>
        {schemes.map(s=>(
          <li key={s.id}>{s.name} — ₹{s.budget} — {s.status}</li>
        ))}
      </ul>
    </div>
  );
}
