interface ButtonProps {
  text: string;
  fontSize?: string;
  onClick?: () => void;
}

export default function Button({
  text,
  fontSize = "15px",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`border border-transparent bg-[#88C8D4] text-white rounded-[5px]
                hover:border-[#88C8D4] hover:bg-transparent hover:text-[#88C8D4]
                py-1 px-5 transition-all duration-300 text-[${fontSize}] uppercase cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
