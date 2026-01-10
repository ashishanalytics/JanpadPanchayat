"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [schemes, setSchemes] = useState([]);
  const [cash, setCash] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: s } = await supabase.from("schemes").select("*");
    const { data: c } = await supabase.from("cashbook").select("*");
    setSchemes(s || []);
    setCash(c || []);
  }

  const totalBudget = schemes.reduce((a,b)=>a + Number(b.budget||0),0);
  const spent = cash.reduce((a,b)=> a + parseFloat(b.amount || 0), 0);


  return (
    <div style={{ padding:20 }}>
      <h1>Janpad Panchayat Dashboard</h1>
      <p>Total Budget: ₹{totalBudget}</p>
      <p>Amount Spent: ₹{spent}</p>
      <p>Remaining: ₹{totalBudget - spent}</p>

      <h3>Schemes</h3>
      <ul>
        {schemes.map(s=>(
          <li key={s.id}>{s.name} — ₹{s.budget} — {s.status}</li>
        ))}
      </ul>
    </div>
  );
}
