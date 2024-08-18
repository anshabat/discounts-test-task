import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  return (
    <input
      className="border border-gray-200 h-6 w-full p-5 text-gray-500"
      {...props}
    />
  );
}

export default Input;
