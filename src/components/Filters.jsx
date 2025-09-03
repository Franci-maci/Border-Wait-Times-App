import React from "react";

export default function Filters({
  query,
  setQuery,
  stateFilter,
  setStateFilter,
  states,
  onRefresh,
  loading,
  lastUpdated,
  autoRefresh,
  setAutoRefresh,
  sentriOnly,
  setSentriOnly,
}) {
  return (
    <div className="filters card">
      <div className="filters__row">
        <input
          type="search"
          placeholder="Search port..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
        >
          <option value="ALL">All States</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={sentriOnly}
            onChange={(e) => setSentriOnly(e.target.checked)}
          />
          SENTRI only
        </label>

        <button onClick={onRefresh} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh"}
        </button>

        <label>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
          Auto-refresh 5 min
        </label>
      </div>

      <div className="muted">
        {lastUpdated
          ? `Last updated: ${new Date(lastUpdated).toLocaleString()}`
          : "—"}
      </div>
    </div>
  );
}
