import { useCart } from "../../hooks/useCart";
import { DiscountType } from "../../model/discount";
import { ProductType } from "../../model/product";
import Time from "../shared/time";
import CartItems from "./cart-items";
import CartTotals from "./cart-totals";

type Props = {
  products: ProductType[];
  discounts: DiscountType[];
  dateObj: Date;
};

function Cart(props: Props) {
  const { dateObj, products, discounts } = props;
  const { cartItems, updateItem, deleteItem } = useCart(
    products,
    discounts,
    dateObj
  );

  return (
    <div className="py-6 w-[500px] m-auto">
      <div className="flex justify-between items-center mb-4 gap-2">
        <h1 className="text-3xl font-bold text-center">Sales Cart</h1>
        <Time dateObj={dateObj} />
      </div>
      <CartItems
        items={cartItems}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
      <CartTotals items={cartItems} />
    </div>
  );
}

export default Cart;
