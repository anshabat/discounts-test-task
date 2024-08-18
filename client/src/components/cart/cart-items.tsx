import { Product } from "../../model/product";
import CartItem from "./cart-item";

type Props = {
  products: Product[];
};

function CartItems(props: Props) {
  const { products } = props;
  return (
    <div className="grid grid-cols-[1fr_100px_100px] gap-y-5 gap-x-6 items-center">
      {products.map((product) => {
        return <CartItem product={product} />;
      })}
    </div>
  );
}

export default CartItems;
