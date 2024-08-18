import { ChangeEvent, Fragment } from "react";
import { CartItemType } from "../../model/cart";
import Price from "../shared/price";
import Input from "../shared/input";
import { DeleteCartItem, UpdateCartItem } from "../../hooks/useCart";

type Props = {
  item: CartItemType;
  onUpdate: UpdateCartItem;
  onDelete: DeleteCartItem;
};

function CartItem(props: Props) {
  const { item, onUpdate, onDelete } = props;

  const deleteHandler = () => {
    onDelete(item.id);
  };

  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const qty = isNaN(value) || value < 1 ? 1 : value;
    onUpdate(item.id, qty);
  };

  return (
    <Fragment key={item.id}>
      <div>
        <div
          className="p-1 border border-gray-200 w-7 h-7 text-sm flex items-center justify-center bg-white text-gray-500"
          onClick={deleteHandler}
          aria-label="Remove from cart"
        >
          x
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <img src={item.imageURL} alt={item.name} width={48} height={48} />
        <span className="text-sm font-bold">{item.name}</span>
      </div>
      <div>
        <Input
          type="number"
          value={item.quantity}
          onChange={changeQuantityHandler}
        />
      </div>
      <div className="text-right">
        {item.hasDiscount ? (
          <Price value={item.originalTotalPrice} isOld />
        ) : null}
        <Price value={item.totalPrice} isSale={item.hasDiscount} />
      </div>
    </Fragment>
  );
}

export default CartItem;
