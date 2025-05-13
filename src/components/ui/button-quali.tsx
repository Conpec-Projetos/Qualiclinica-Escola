import clsx from "clsx";

interface ButtonProps {
  text: string;
  fontSize?: keyof typeof fontSizes;
  onClick?: () => void;
  disabled?: boolean;
  buttonSize?: keyof typeof buttonSizes;
  className?: string;
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
  fontSize,
  onClick,
  disabled = false,
  buttonSize = "normal",
  className
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "border rounded-[5px] transition-all duration-300 uppercase cursor-pointer",
        buttonSizes[buttonSize],
        {
          [`text-${fontSizes[fontSize!]}`]: fontSize !== undefined,
        },
        {
          "bg-menta text-[#88C8D4] border-transparent": disabled,
          "bg-[#88C8D4] text-white hover:bg-transparent hover:text-[#88C8D4] hover:border-[#88C8D4]": !disabled,
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {text}
    </button>
  );
}
