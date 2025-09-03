import React from "react";

export default function PortCard({ port }) {
  const format = (v) => (v == null ? "—" : v);

  return (
    <div className="card port">
      <header>
        <h3>{port.portName}</h3>
        <span className="chip">{port.state}</span>
      </header>

      <div className="row">
        <span>Passenger Standard:</span>
        <strong>{format(port.lanes.passenger.standard)}</strong>
      </div>

      <div className="row">
        <span>Passenger Ready:</span>
        <strong>{format(port.lanes.passenger.ready)}</strong>
      </div>

      <div className="row">
        <span>Passenger SENTRI:</span>
        <strong className={port.lanes.passenger.sentri ? "sentri" : ""}>
          {format(port.lanes.passenger.sentri)}
        </strong>
      </div>

      <div className="row">
        <span>Pedestrian:</span>
        <strong>{format(port.lanes.pedestrian.standard)}</strong>
      </div>
    </div>
  );
}
