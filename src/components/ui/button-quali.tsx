interface ButtonProps {
  text: string;
  fontSize?: keyof typeof fontSizes;
  onClick?: () => void;
  disabled?: boolean;
  buttonSize?: keyof typeof buttonSizes;
}

const buttonSizes = {
  normal: "py-1 px-5",
  small: "py-1 px-3",
  large: "py-2 px-7",
};

const fontSizes = {
  small: "12px",
  normal: "15px",
  large: "18px",
};

export default function Button({
  text,
  fontSize = "normal",
  onClick,
  disabled = false,
  buttonSize = "normal",
}: ButtonProps) {
  return (
    <button
      className={`border border-transparent ${disabled ? 'bg-menta text-[#88C8D4]' : 'bg-[#88C8D4] text-white'} rounded-[5px]
                hover:border-[#88C8D4] hover:bg-transparent hover:text-[#88C8D4]
                transition-all duration-300 text-[${fontSizes[fontSize]} uppercase cursor-pointer
                ${buttonSizes[buttonSize]}`}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {text}
    </button>
  );
}
