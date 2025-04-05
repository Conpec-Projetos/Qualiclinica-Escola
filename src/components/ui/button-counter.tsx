interface ButtonProps {
  counter: number;
  onClickPlus?: () => void;
  onClickMinus?: () => void;
}

export default function Button({ onClickPlus, onClickMinus, counter }: ButtonProps) {
  return (
    <div className="font-[family-name:var(--font-poppins)] flex items-center justify-center">
      <button
        className={`flex items-center justify-center
             border border-transparent bg-(--ciano-escuro) rounded-l-[0.625rem]
             hover:border-(--ciano-escuro) hover:bg-(--menta)
             transition-all duration-300 uppercase cursor-pointer
             h-[2.6875rem] w-[2.95rem]`}
        onClick={onClickMinus}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 4"
          className="w-5 h-1 text-[#E7F8FD] hover:text-(--ciano-escuro)"
        >
          <path
            d="M2 2L18 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className=" flex items-center justify-center bg-(--ciano-escuro) text-(--menta) h-[2.6875rem] w-[2.35rem] px-4 py-2 border-(--ciano-escuro) font-semibold text-[1.125rem]">
        {counter}
      </div>
      <button
        className={`flex items-center justify-center
             border border-transparent bg-(--ciano-escuro) rounded-r-[0.625rem]
             hover:border-(--ciano-escuro) hover:bg-(--menta)
             transition-all duration-300 uppercase cursor-pointer
             h-[2.6875rem] w-[2.95rem]`}
        onClick={onClickPlus}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"          
          className="w-4.5 h-4.5 text-[#E7F8FD] hover:text-(--ciano-escuro)"
        >
          <path
            d="M9 17V1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M1 9L17 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
