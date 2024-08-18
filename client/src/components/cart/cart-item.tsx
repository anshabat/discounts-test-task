import { ChangeEvent, Fragment } from "react";
import { CartItemType } from "../../model/cart";
import Price from "../shared/price";
import Input from "../shared/input";
import { UpdateProductQuantity } from "../../hooks/useCart";

type Props = {
  item: CartItemType;
  updateQuantity: UpdateProductQuantity;
};

function CartItem(props: Props) {
  const { item, updateQuantity } = props;

  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const qty = isNaN(value) || value < 1 ? 1 : value;
    updateQuantity(item.id, qty);
  };

  return (
    <Fragment key={item.id}>
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
