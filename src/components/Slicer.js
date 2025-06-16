import React, { useState, useEffect, useRef } from "react";

const Slicer = ({ label, data, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get unique values for this slicer
  const uniqueValues = React.useMemo(() => {
    console.log(`Getting unique values for ${label}:`, data);
    const values = data
      .map(item => {
        const value = item[label];
        return value ? String(value).trim() : "";
      })
      .filter(value => value !== ""); // Remove empty values
    
    const unique = [...new Set(values)].sort();
    console.log(`Unique values for ${label}:`, unique);
    return unique;
  }, [data, label]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (value) => {
    const trimmedValue = String(value).trim();
    console.log(`Slicer ${label} - Current selected:`, selected);
    console.log(`Slicer ${label} - New value to toggle:`, trimmedValue);
    
    const newSelected = selected.includes(trimmedValue)
      ? selected.filter(v => v !== trimmedValue)
      : [...selected, trimmedValue];
    
    console.log(`Slicer ${label} - New selected values:`, newSelected);
    onChange(label, newSelected);
  };

  const selectedCount = selected.length;
  const displayText = selectedCount === 0 
    ? "All" 
    : selectedCount === 1 
      ? selected[0] 
      : `${selectedCount} selected`;

  return (
    <div style={styles.slicerBox} ref={dropdownRef}>
      <label style={styles.label}>{label}</label>
      <div style={styles.dropdownContainer}>
        <div 
          style={styles.dropdownHeader} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span style={styles.dropdownText}>{displayText}</span>
          <span style={styles.dropdownArrow}>▼</span>
        </div>
        
        {isOpen && (
          <div style={styles.dropdownList}>
            {uniqueValues.length > 0 ? (
              uniqueValues.map((val, i) => (
                <div 
                  key={i} 
                  style={styles.dropdownItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChange(val);
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f2f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <input
                    type="checkbox"
                    id={`${label}-${val}`}
                    checked={selected.includes(val)}
                    onChange={() => {}}
                    style={styles.checkbox}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <label 
                    htmlFor={`${label}-${val}`} 
                    style={styles.optionLabel}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {val}
                  </label>
                </div>
              ))
            ) : (
              <div style={styles.noOptions}>No options available</div>
            )}
          </div>
        )}
      </div>
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
  dropdownContainer: {
    position: "relative",
  },
  dropdownHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 14px",
    backgroundColor: "#f1f2f6",
    border: "1px solid #dfe6e9",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  dropdownText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#2c3e50",
  },
  dropdownArrow: {
    fontSize: "12px",
    color: "#666",
    transition: "transform 0.2s ease",
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "4px",
    backgroundColor: "white",
    border: "1px solid #dfe6e9",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 1000,
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    width: "100%",
    boxSizing: "border-box",
    userSelect: "none",
  },
  checkbox: {
    marginRight: "8px",
    cursor: "pointer",
    pointerEvents: "none",
  },
  optionLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#2c3e50",
    cursor: "pointer",
    flex: 1,
    pointerEvents: "none",
  },
  noOptions: {
    padding: "12px",
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
    fontStyle: "italic"
  }
};

export default Slicer;
