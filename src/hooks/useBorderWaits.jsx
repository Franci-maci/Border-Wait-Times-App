import { useState, useEffect, useCallback } from "react";

const API_URL =
  "https://gis.fema.gov/arcgis/rest/services/Partner/BorderPorts_CBP/FeatureServer/0/query?where=1=1&outFields=*&f=json";

const MEXICO_STATES = ["CA", "AZ", "NM", "TX"];

const MOCK = [
  {
    id: "1",
    portName: "San Ysidro",
    state: "CA",
    lanes: {
      passenger: { standard: 35, ready: 20, sentri: 10 },
      pedestrian: { standard: 25 },
    },
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    portName: "Nogales",
    state: "AZ",
    lanes: {
      passenger: { standard: 15, ready: 10, sentri: null },
      pedestrian: { standard: 8 },
    },
    lastUpdated: new Date().toISOString(),
  },
];

function adaptToModel(json) {
  if (json?.features) {
    return json.features
      .map((f) => ({
        id: f.attributes.OBJECTID,
        portName: f.attributes.PORT_NAME,
        state: f.attributes.STATE,
        lanes: {
          passenger: {
            standard: f.attributes.PASS_LN_WAIT,
            ready: f.attributes.READY_LN_WAIT,
            sentri: f.attributes.SENTRI_LN_WAIT,
          },
          pedestrian: { standard: f.attributes.PED_LN_WAIT },
        },
        lastUpdated: new Date().toISOString(),
      }))
      .filter((p) => MEXICO_STATES.includes(p.state));
  }
  return MOCK;
}

export default function useBorderWaits() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Network error");
      const json = await res.json();
      setData(adaptToModel(json));
      setLastUpdated(new Date().toISOString());
    } catch (e) {
      setError("Live data unavailable, showing demo data.");
      setData(adaptToModel(MOCK));
      setLastUpdated(new Date().toISOString());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, lastUpdated, refresh: fetchData };
}
