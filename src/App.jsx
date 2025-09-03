import React, { useState, useMemo, useEffect } from "react";
import Filters from "./components/Filters";
import PortList from "./components/PortList";
import useBorderWaits from "./hooks/useBorderWaits";

export default function App() {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("ALL");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [sentriOnly, setSentriOnly] = useState(false);

  const { data, loading, error, lastUpdated, refresh } = useBorderWaits();

  const states = useMemo(() => {
    const unique = [...new Set(data.map((p) => p.state))];
    return unique.sort();
  }, [data]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(refresh, 300000);
    return () => clearInterval(interval);
  }, [autoRefresh, refresh]);

  const filteredPorts = useMemo(() => {
    return data
      .filter((p) => (stateFilter === "ALL" ? true : p.state === stateFilter))
      .filter((p) => p.portName.toLowerCase().includes(query.toLowerCase()))
      .filter((p) => (!sentriOnly ? true : p.lanes.passenger.sentri));
  }, [data, query, stateFilter, sentriOnly]);

  return (
    <div className="app">
      <header className="header">
        <h1>U.S.–Mexico Border Wait Times</h1>
      </header>

      <main className="container">
        <Filters
          query={query}
          setQuery={setQuery}
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
          states={states}
          onRefresh={refresh}
          loading={loading}
          lastUpdated={lastUpdated}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          sentriOnly={sentriOnly}
          setSentriOnly={setSentriOnly}
        />

        {error && <div className="alert">{error}</div>}

        {loading && !data.length ? (
          <p>Loading wait times...</p>
        ) : (
          <PortList ports={filteredPorts} />
        )}
      </main>

      <footer className="footer">
        Data from CBP ArcGIS | Only Mexico border ports (CA, AZ, NM, TX)
      </footer>
    </div>
  );
}
