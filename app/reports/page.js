"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Reports() {
  const [schemes, setSchemes] = useState([]);
  const [cash, setCash] = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data: s } = await supabase.from("schemes").select("*");
    const { data: c } = await supabase.from("cashbook").select("*");
    setSchemes(s||[]);
    setCash(c||[]);
  }

  const totalBudget = schemes.reduce((a,b)=>a + Number(b.budget||0),0);
  const totalSpent = cash.reduce((a,b)=>a + Number(b.amount||0),0);

  return (
    <div>
      <h2>MIS Report</h2>
      <p>Total Budget: ₹{totalBudget}</p>
      <p>Total Spent: ₹{totalSpent}</p>
      <p>Utilization: {totalBudget ? Math.round((totalSpent/totalBudget)*100) : 0}%</p>

      <h3>Scheme Wise</h3>
      <ul>
        {schemes.map(s=>{
          const spent = cash.filter(c=>c.scheme_id==s.id).reduce((a,b)=>a+Number(b.amount||0),0);
          return (
            <li key={s.id}>
              {s.name} — Budget ₹{s.budget} — Spent ₹{spent}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
