import React from "react";

const StatsCard = ({ data }) => {
  if (!data.length) {
    return (
      <div style={styles.card}>
        <h3 style={styles.heading}>📚 Lecture Summary</h3>
        <p style={styles.empty}>No data available for selected filters.</p>
      </div>
    );
  }

  const statusValues = data.map(d =>
    d["Completion Status"]?.toString().trim().toLowerCase()
  );

  const total = statusValues.filter(v => v === "true" || v === "false").length;
  const completed = statusValues.filter(v => v === "true").length;
  const remaining = statusValues.filter(v => v === "false").length;
  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>📚 Lecture Summary</h3>
      <div style={styles.statsRow}>
        <div style={{ ...styles.statBox, backgroundColor: "#e0f7fa" }}>
          <p style={styles.label}>Total</p>
          <h2 style={styles.value}>{total}</h2>
        </div>
        <div style={{ ...styles.statBox, backgroundColor: "#c8e6c9" }}>
          <p style={styles.label}>Completed</p>
          <h2 style={styles.value}>✅ {completed}</h2>
        </div>
        <div style={{ ...styles.statBox, backgroundColor: "#ffcdd2" }}>
          <p style={styles.label}>Remaining</p>
          <h2 style={styles.value}>❌ {remaining}</h2>
        </div>
        <div style={{ ...styles.statBox, backgroundColor: "#fff9c4" }}>
          <p style={styles.label}>Completion %</p>
          <h2 style={styles.value}>📊 {completionRate}%</h2>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    padding: "20px",
    maxWidth: "100%",
    marginBottom: "30px"
  },
  heading: {
    fontSize: "20px",
    marginBottom: "15px",
    fontWeight: "600",
    color: "#333"
  },
  statsRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap"
  },
  statBox: {
    flex: "1",
    minWidth: "140px",
    borderRadius: "12px",
    padding: "12px 16px",
    textAlign: "center"
  },
  label: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "6px"
  },
  value: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111"
  },
  empty: {
    color: "#999",
    fontStyle: "italic"
  }
};

export default StatsCard;
