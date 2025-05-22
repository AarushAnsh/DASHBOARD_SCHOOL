import React from "react";

const Slicer = ({ label, data, selected, onChange }) => {
  const uniqueValues = Array.from(
    new Set(data.map(item => item[label]).filter(Boolean))
  );

  return (
    <div style={styles.slicerBox}>
      <label style={styles.label}>{label}</label>
      <select
        style={styles.select}
        value={selected}
        onChange={e => onChange(label, e.target.value)}
      >
        <option value="">All</option>
        {uniqueValues.map((val, i) => (
          <option key={i} value={val} style={styles.option}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  slicerBox: {
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "12px 16px",
    minWidth: "180px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    transition: "transform 0.2s ease",
  },
  label: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: "8px",
  },
  select: {
    padding: "10px 14px",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid #dfe6e9",
    borderRadius: "8px",
    backgroundColor: "#f1f2f6",
    color: "#2d3436",
    cursor: "pointer",
    transition: "border 0.2s, box-shadow 0.2s",
    outline: "none",
  },
  option: {
    fontWeight: "600",
    color: "#2c3e50",
  },
};

export default Slicer;
