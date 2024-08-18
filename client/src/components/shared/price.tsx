import clsx from "clsx";

type Props = {
  value: number;
  isSale?: boolean;
  isOld?: boolean;
};

function Price(props: Props) {
  const { value, isSale = false, isOld = false } = props;

  const className = clsx("font-semibold text-lg whitespace-nowrap", {
    "text-gray-500 line-through text-sm": isOld,
    "text-red-500": isSale,
  });

  return (
    <div className={`font-semibold text-lg whitespace-nowrap ${className}`}>
      ${value}
    </div>
  );
}

export default Price;
