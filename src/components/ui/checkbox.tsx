"use client";

interface CheckboxProps {
  checked: boolean;
  onChange: (selected: boolean) => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <button onClick={handleToggle} className="cursor-pointer">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
    </button>
  );
}
