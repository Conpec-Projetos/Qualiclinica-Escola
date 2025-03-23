"use client";

import { useState } from "react";

export default function Checkbox() {
  const [checked, setChecked] = useState(false);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setChecked(!checked)}
      className="cursor-pointer"
    >
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="4"
        stroke="#991871"
        strokeWidth="2"
      />
      {checked && (
        <path
          d="M9.5501 18L3.8501 12.3L5.2751 10.875L9.5501 15.15L18.7251 5.97501L20.1501 7.40001L9.5501 18Z"
          fill="#991871"
        />
      )}
    </svg>
  );
}
