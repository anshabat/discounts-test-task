type Props = {
  value: number;
  isSale?: boolean;
};

function Price(props: Props) {
  const { value, isSale = false } = props;
  const priceClassName = isSale ? "text-red-500" : "text-black";

  return (
    <div
      className={`font-semibold text-lg whitespace-nowrap ${priceClassName}`}
    >
      ${value}
    </div>
  );
}

export default Price;
