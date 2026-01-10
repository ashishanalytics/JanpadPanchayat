"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import jsPDF from "jspdf";

export default function Certificates() {
  const [schemes, setSchemes] = useState([]);
  const [schemeId, setSchemeId] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase.from("schemes").select("*");
    setSchemes(data || []);
  }

  function generate() {
    const scheme = schemes.find(s => s.id == schemeId);
    if (!scheme) return;

    const doc = new jsPDF();

    doc.text("Government of Chhattisgarh", 20, 20);
    doc.text("Janpad Panchayat Takhatpur", 20, 30);
    doc.text("Completion Certificate", 20, 50);

    doc.text(`Scheme: ${scheme.name}`, 20, 70);
    doc.text(`Sanctioned Amount: ₹${scheme.budget}`, 20, 80);
    doc.text(`Status: ${scheme.status}`, 20, 90);

    doc.text("This is to certify that the above scheme has been", 20, 120);
    doc.text("implemented under Janpad Panchayat Takhatpur.", 20, 130);

    doc.save("certificate.pdf");
  }

  return (
    <div>
      <h2>Generate Certificate</h2>
      <select onChange={e=>setSchemeId(e.target.value)}>
        <option>Select Scheme</option>
        {schemes.map(s=>(
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <button onClick={generate}>Generate PDF</button>
    </div>
  );
}
