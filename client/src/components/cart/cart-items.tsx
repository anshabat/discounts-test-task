import { DeleteCartItem, UpdateCartItem } from "../../hooks/useCart";
import { CartItemType } from "../../model/cart";
import CartItem from "./cart-item";

type Props = {
  items: CartItemType[];
  onUpdate: UpdateCartItem;
  onDelete: DeleteCartItem;
};

function CartItems(props: Props) {
  const { items, onDelete, onUpdate } = props;
  return (
    <div className="grid grid-cols-[40px_1fr_100px_100px] gap-y-5 gap-x-6 items-center">
      {items.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export default CartItems;
