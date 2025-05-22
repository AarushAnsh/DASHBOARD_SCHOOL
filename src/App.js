import React, { useEffect, useState } from "react";
import StatsCard from "./components/StatsCard";
import Slicer from "./components/Slicer";
import Table from "./components/Table";

const SHEET_ID = "1zU0iIuJayCZDB729xos63G6kq8_2znn8txw_VgU2qg4";
const API_KEY = "AIzaSyDWz-U0wXTTEiQ9U08NOGKH1Ee0BVmWDqg";
const SHEET_NAME = "Sheet1";

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    "School Name": "",
    "Month": "",
    "Grade": ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();

        const [headers, ...rows] = json.values;
        const formatted = rows.map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index] || "";
          });
          return obj;
        });

        setData(formatted);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (label, value) => {
    setFilters(prev => ({ ...prev, [label]: value }));
  };

  const filteredData = data.filter(item =>
    Object.entries(filters).every(
      ([key, value]) => value === "" || item[key] === value
    )
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📊 Lecture Dashboard</h2>

      <div style={styles.slicersRow}>
        <Slicer
          label="School Name"
          data={data}
          selected={filters["School Name"]}
          onChange={handleFilterChange}
        />
        <Slicer
          label="Month"
          data={data}
          selected={filters["Month"]}
          onChange={handleFilterChange}
        />
        <Slicer
          label="Grade"
          data={data}
          selected={filters["Grade"]}
          onChange={handleFilterChange}
        />
      </div>

      <StatsCard data={filteredData} />

      <div style={{ marginTop: "20px" }}>
        <Table data={filteredData} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    padding: "24px",
    boxSizing: "border-box",
    backgroundColor: "#f9f9f9", // Optional: Light background
    overflowY: "auto"
  },
  header: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#2c3e50"
  },
  slicersRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "30px",
    flexWrap: "wrap"
  }
};

export default App;
