import { CartItemType } from "../../model/cart";
import Price from "../shared/price";

type Props = {
  items: CartItemType[];
};

function CartTotals(props: Props) {
  const { items } = props;
  const subtotal = items.reduce(
    (acc, item) => acc + item.originalTotalPrice,
    0
  );
  const total = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const hasDiscount = items.some((item) => item.hasDiscount);

  return (
    <dl className="grid grid-cols-[1fr_min-content] gap-2 items-center ali text-right border-t border-gray-300 mt-4 pt-4">
      {hasDiscount ? (
        <>
          <dt>Subtotal:</dt>
          <dd>
            <Price value={subtotal} isOld />
          </dd>
          <dt>Sale:</dt>
          <dd>
            <Price value={subtotal - total} isSale />
          </dd>
        </>
      ) : null}
      <dt>Total:</dt>
      <dd className="text-xl font-bold">
        <Price value={total} />
      </dd>
    </dl>
  );
}

export default CartTotals;
