import React from "react";

const Table = ({ data }) => {
  if (!data.length) return <p>No data found</p>;

  const headers = Object.keys(data[0]);

  return (
    <table border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {headers.map((h, j) => (
              <td key={j}>{row[h]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
