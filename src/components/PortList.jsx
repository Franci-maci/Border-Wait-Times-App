import React from "react";
import PortCard from "./ PortCard.jsx";

export default function PortList({ ports }) {
  if (!ports.length) return <p>No ports found.</p>;
  return (
    <div className="grid">
      {ports.map((p) => (
        <PortCard key={p.id} port={p} />
      ))}
    </div>
  );
}
