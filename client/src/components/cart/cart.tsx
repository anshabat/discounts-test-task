import { Product } from "../../model/product";
import Time from "../shared/time";
import CartItems from "./cart-items";
import CartTotals from "./cart-totals";

type Props = {
  products: Product[];
  dateObj: Date;
};

function Cart(props: Props) {
  const { dateObj, products } = props;

  return (
    <div className="py-6 w-[500px] m-auto">
      <div className="flex justify-between items-center mb-4 gap-2">
        <h1 className="text-3xl font-bold text-center">Sales Cart</h1>
        <Time dateObj={dateObj} />
      </div>
      <CartItems products={products} />
      <CartTotals products={products} />
    </div>
  );
}

export default Cart;
