import React, { useEffect, useState } from "react";
import StatsCard from "./components/StatsCard";
import Slicer from "./components/Slicer";
import Table from "./components/Table";

// Google Sheets configuration
const SHEET_ID = "1QOcOEvI-LRhjU4szgnLp1SXsu6FoVyZTVPvRkgjNclw";
const API_KEY = "AIzaSyDWz-U0wXTTEiQ9U08NOGKH1Ee0BVmWDqg";
const SHEET_NAME = "CleanData"; // Changed from CleanData to Sheet1

// Sample data for testing
const sampleData = [
  {
    "School Name": "School A",
    "Month": "January",
    "Grade": "10",
    "Completion Status": "true",
    "Test Status": "true"
  },
  {
    "School Name": "School B",
    "Month": "February",
    "Grade": "11",
    "Completion Status": "false",
    "Test Status": "true"
  },
  {
    "School Name": "School C",
    "Month": "March",
    "Grade": "12",
    "Completion Status": "true",
    "Test Status": "false"
  }
];

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    "School Name": [],
    "Month": [],
    "Grade": []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
        console.log("API URL:", url);
        
        const response = await fetch(url);
        const json = await response.json();

        console.log("API Response:", json);

        if (json.error) {
          throw new Error(`API Error: ${json.error.message}`);
        }

        if (!json.values || !Array.isArray(json.values)) {
          throw new Error("Invalid data format");
        }

        const [headers, ...rows] = json.values;
        console.log("Headers:", headers);
        console.log("First row:", rows[0]);

        const formatted = rows.map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = (row[index] || "").trim();
          });
          return obj;
        });

        console.log("Formatted data length:", formatted.length);
        console.log("First formatted row:", formatted[0]);
        
        setData(formatted);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (label, values) => {
    console.log(`Filter change for ${label}:`, values);
    setFilters(prev => {
      const newFilters = { ...prev, [label]: values };
      console.log("New filters:", newFilters);
      return newFilters;
    });
  };

  const filteredData = React.useMemo(() => {
    console.log("Filtering data with filters:", filters);
    console.log("Current data length:", data.length);
    
    if (!data || data.length === 0) {
      console.log("No data available for filtering");
      return [];
    }
    
    return data.filter(item => {
      // Check each filter
      for (const [key, values] of Object.entries(filters)) {
        // If no values selected for this filter, skip it
        if (values.length === 0) continue;
        
        const itemValue = String(item[key] || "").toLowerCase().trim();
        const hasMatch = values.some(val => 
          String(val).toLowerCase().trim() === itemValue
        );
        
        console.log(`Checking ${key}:`, {
          itemValue,
          filterValues: values,
          hasMatch
        });
        
        // If no match found for this filter, exclude the item
        if (!hasMatch) return false;
      }
      
      // If we get here, the item passed all filters
      return true;
    });
  }, [data, filters]);

  console.log("Current state:", {
    totalData: data.length,
    filteredData: filteredData.length,
    filters: filters
  });

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.headerContainer}>
          <h1 style={styles.header}>📊 GURUKULAM STEM LAB SYLLABUS TRACKER</h1>
          <p style={styles.subtitle}>Track and manage lecture completion status</p>
        </div>
        <div style={styles.loading}>Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.headerContainer}>
          <h1 style={styles.header}>📊 GURUKULAM STEM LAB SYLLABUS TRACKER</h1>
          <p style={styles.subtitle}>Track and manage lecture completion status</p>
        </div>
        <div style={styles.error}>
          <p>Error loading data: {error}</p>
          <p>Please check the console for more details.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>📊 GURUKULAM STEM LAB SYLLABUS TRACKER</h1>
        <p style={styles.subtitle}>Track and manage lecture completion status</p>
      </div>

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

      <StatsCard data={filteredData} type="Lecture" statusField="Completion Status" />
      <StatsCard data={filteredData} type="Test" statusField="Test Status" />

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
    backgroundColor: "#f9f9f9",
    overflowY: "auto"
  },
  headerContainer: {
    marginBottom: "32px",
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: "16px"
  },
  header: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#1a73e8",
    margin: 0,
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "16px",
    color: "#5f6368",
    margin: 0
  },
  slicersRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },
  loading: {
    padding: "20px",
    textAlign: "center",
    fontSize: "18px",
    color: "#666"
  },
  error: {
    padding: "20px",
    backgroundColor: "#ffebee",
    borderRadius: "8px",
    color: "#c62828",
    margin: "20px 0"
  }
};

export default App;
