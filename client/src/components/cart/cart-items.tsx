import { UpdateProductQuantity } from "../../hooks/useCart";
import { CartItemType } from "../../model/cart";
import CartItem from "./cart-item";

type Props = {
  items: CartItemType[];
  updateQuantity: UpdateProductQuantity;
};

function CartItems(props: Props) {
  const { items, updateQuantity } = props;
  return (
    <div className="grid grid-cols-[1fr_100px_100px] gap-y-5 gap-x-6 items-center">
      {items.map((item) => {
        return <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />;
      })}
    </div>
  );
}

export default CartItems;
