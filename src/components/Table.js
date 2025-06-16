import React from "react";

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={styles.noData}>
        <p>No data available</p>
      </div>
    );
  }

  // Get all headers except the ones we want to hide
  const headers = Object.keys(data[0]).filter(header => 
    !["Reference Video", "Lesson PPT", "Lesson Plan"].includes(header)
  );

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} style={styles.headerCell}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={i % 2 === 0 ? styles.evenRow : styles.oddRow}>
              {headers.map((header, j) => {
                const value = row[header] || '';
                const cellStyle = {
                  ...styles.cell,
                  ...(header === 'Completion Status' && value.toLowerCase() === 'conducted' ? styles.completedCell : {}),
                  ...(header === 'Completion Status' && value.toLowerCase() === 'not conducted' ? styles.notCompletedCell : {}),
                  ...(header === 'Test Status' && value.toLowerCase() === 'conducted' ? styles.completedCell : {}),
                  ...(header === 'Test Status' && value.toLowerCase() === 'not conducted' ? styles.notCompletedCell : {})
                };
                return (
                  <td key={j} style={cellStyle}>{value}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
    marginTop: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e0e0e0'
  },
  headerCell: {
    padding: '12px 16px',
    backgroundColor: '#1a73e8',
    color: 'white',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: '14px',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    border: '1px solid #e0e0e0',
    borderBottom: '2px solid #e0e0e0'
  },
  cell: {
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    color: '#202124',
    fontSize: '14px',
    backgroundColor: 'white',
    minWidth: '120px'
  },
  evenRow: {
    backgroundColor: '#ffffff'
  },
  oddRow: {
    backgroundColor: '#f8f9fa'
  },
  completedCell: {
    color: '#0f9d58',
    fontWeight: '500',
    border: '1px solid #e0e0e0'
  },
  notCompletedCell: {
    color: '#d93025',
    fontWeight: '500',
    border: '1px solid #e0e0e0'
  },
  noData: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
    margin: '20px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }
};

export default Table;
