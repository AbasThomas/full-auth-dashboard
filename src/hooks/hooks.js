import React, { useState } from "react";

export const ControlledInput = () => {
  // Initialize the state to an empty string, ensuring the input is controlled.
  const [value, setValue] = useState("");

  return (
    <div>
      <label htmlFor="controlledInput">Controlled Input:</label>
      <input
        id="controlledInput"
        type="text"
        value={value} // Always defined (empty string initially)
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <p>Current value: {value}</p>
    </div>
  );
};
