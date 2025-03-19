interface ButtonProps {
  text: string;
  fontSize?: string;
}

export default function Button({ text, fontSize = "15px" }: ButtonProps) {
  return (
    <button
      className={`border border-transparent bg-[#88C8D4] text-white rounded-[5px]
                hover:border-[#88C8D4] hover:bg-transparent hover:text-[#88C8D4]
                py-1 px-5 transition-all duration-300 text-[${fontSize}]`}
    >
      {text}
    </button>
  );
}
