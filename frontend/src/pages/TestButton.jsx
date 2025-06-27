// TestButton.jsx
import React from "react";
export default function TestButton() {
  return (
    <button
      type="button"
      onClick={() => alert("No reload!")}
      style={{ padding: 20, fontSize: 20 }}
    >
      Test Button
    </button>
  );
}